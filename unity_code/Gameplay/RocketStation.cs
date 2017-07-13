using Assets.Scripts.Exceptions;
using UnityEngine;
using Assets.Scripts.Actions;
using System;
using Random = UnityEngine.Random;
using System.Linq;

namespace Assets.Scripts.Gameplay
{
    [RequireComponent(typeof(Transform))]
    public class RocketStation : MonoBehaviour
    {
        private const int MaxDelayMilliseconds = 300;

        public GameObject PipePrototype;
        public GameObject RocketPrototype;
        public GameActionExecutor ActionExecutor;
        public Game GameStats;

        public int RocketStationHeight = 10;
        public int RocketStationWidth = 10;
        public int PipesSpawnOffset = 15;
        public int PipesFallingTime = 10;

        private Pipe[,] rocketStationField;
        private Rocket[] rockets;

        private void Start ()
        {
            rocketStationField = new Pipe[RocketStationHeight, RocketStationWidth];
            rockets = new Rocket[RocketStationHeight];
            CheckParameters();
            GenerateRockets ();
            GameStats.GameEnd += Stop;
            ActionExecutor.AllActionsEnd += TryExplodePipes;
            GeneratePipes();
        }

        private void CheckParameters()
        {
            if (PipePrototype == null)
                throw new ParameterRequiredException("PipePrototype");

            if (ActionExecutor == null)
                throw new ParameterRequiredException("ActionDirector");

            if (RocketPrototype == null)
                throw new ParameterRequiredException("RocketPrototype");

            if (GameStats == null)
                throw new ParameterRequiredException("GameStats");
        }

        private void GenerateRockets()
        {
            var column = RocketStationWidth;
            for (var i = 0; i < RocketStationHeight; i++)
            {
                if(rockets[i] != null)
                    continue;

                rockets[i] = Instantiate(RocketPrototype, GetTilePosition(i, column), Quaternion.identity).GetComponent<Rocket>();
            }
        }

        private void Stop()
        {
            ActionExecutor.AllActionsEnd -= TryExplodePipes;
            ActionExecutor.Stop();

            for (var i = 0; i < RocketStationHeight; i++)
                for (var j = 0; j < RocketStationWidth; j++)
                {
                    if(rocketStationField[i, j] == null)
                        continue;

                    rocketStationField[i, j].Pressed -= OnPipeTilePressed;
                    rocketStationField[i, j].Kill();
                }

            foreach(var rocket in rockets)
                rocket.Kill();
        }

        private void TryExplodePipes()
        {
            if(ActionExecutor.IsRunning)
                return;

            LaunchRockets();
            ShufflePipes();
            GeneratePipes();
        }

        private void LaunchRockets()
        {
            GameStats.AddScores(rockets.Where(r => r.ReadyToLaunch).ToArray());

            for (var i = 0; i < RocketStationHeight; i++)
                rockets[i].Launch();
        }

        private void GeneratePipes()
        {
            FillRocketStationWithPipes();
            CalculatePipeConnections();
        }

        private void CalculatePipeConnections()
        {
            ConnectPipes();
            StartSteam();
            StartRockets();
        }

        private void FillRocketStationWithPipes()
        {
            for (var i = 0; i < RocketStationHeight; i++)
                for (var j = 0; j < RocketStationWidth; j++)
                {
                    if(rocketStationField[i, j] != null)
                        continue;

                    rocketStationField[i, j] = Instantiate(PipePrototype, GetInitialTilePosition(i, j), Quaternion.identity).GetComponent<Pipe>();
                    rocketStationField[i, j].Pressed += OnPipeTilePressed;

                    MovePipe(i, j);
                }
        }

        private void OnPipeTilePressed()
        {
            CalculatePipeConnections();
            TryExplodePipes();
        }

        private void MovePipe(int row, int column, int? destination = null)
        {
            var destinationRow = destination ?? row;
            ActionExecutor.Run(new SequenceAction(
                new DelayAction(TimeSpan.FromMilliseconds(Random.Range(0, MaxDelayMilliseconds))),
                new MoveAction(rocketStationField[row, column], GetTilePosition(destinationRow, column), TimeSpan.FromSeconds(PipesFallingTime))));
        }

        private Vector3 GetInitialTilePosition(int row, int column)
        {
            var position = GetTilePosition(row, column);
            position.y += PipesSpawnOffset;
            return position;
        }

        private Vector3 GetTilePosition(int row, int column)
        {
            var tileSize = PipePrototype.GetComponent<BoxCollider2D>().size;
            return new Vector3(column * tileSize.x + transform.position.x + tileSize.x / 2, - row * tileSize.y + transform.position.y - tileSize.y / 2);
        }

        private void StartSteam()
        {
            for (var i = 0; i < RocketStationHeight; i++)
            {
                var pipe = rocketStationField[i, 0];
                if (pipe.IsSideConnected(PipeSide.Left))
                    pipe.ConnectSteam();
            }
        }

        private void StartRockets()
        {
            for (var i = 0; i < RocketStationHeight; i++)
            {
                var pipe = rocketStationField[i, RocketStationWidth - 1];
                if(pipe.IsSideConnected(PipeSide.Right))
                {
                    pipe.ConnectRocket();

                    if(pipe.IsReadyToLaunch)
                        rockets[i].PrepareForLaunch();
                }
            }
        }

        private void ShufflePipes()
        {
            for (var j = 0; j < RocketStationWidth; j++)
                ShuffleColumn(j);
        }

        private void ShuffleColumn(int column)
        {
            var emptySlot = -1;
            for (var i = RocketStationHeight - 1; i >= 0; i--)
            {
                if (rocketStationField[i, column].IsReadyToLaunch)
                {
                    DestroyPipe(i, column);
                    emptySlot = FindEmptySlot(i, column, emptySlot);
                }
                else if(emptySlot != -1)
                {
                    MovePipe(i, column, emptySlot);
                    AdjustField(i, column, emptySlot);
                    emptySlot = FindEmptySlot(i, column, emptySlot);
                }
            }
        }

        private void DestroyPipe(int row, int column)
        {
            rocketStationField[row, column].Pressed -= TryExplodePipes;
            var pipe = rocketStationField[row, column];
            rocketStationField[row, column] = null;
            pipe.Kill();
        }

        private int FindEmptySlot(int row, int column, int emptySlot)
        {
            if(emptySlot == -1)
                return row;

            for (var i = emptySlot; i >= 0; i--)
                if(rocketStationField[i, column] == null)
                    return i;

            throw new SlotNotFoundException(row, column);
        }

        private void AdjustField(int row, int column, int emptySlot)
        {
            rocketStationField[emptySlot, column] = rocketStationField[row, column];
            rocketStationField[row, column] = null;
        }

        private void ConnectPipes()
        {
            for (var j = 0; j < RocketStationWidth; j++)
                for (int i = 0; i < RocketStationHeight; i++)
                    ConnectPipe(i, j);
        }

        private void ConnectPipe(int row, int column)
        {
            var pipe = rocketStationField[row, column];
            pipe.Reset();
            foreach (var side in pipe.PipeConnectionSides)
                HandleSide(side, pipe, row, column);
        }

        private void HandleSide(PipeSide side, Pipe pipe, int row, int column)
        {
            switch (side)
            {
                case PipeSide.Up:
                    pipe.UpPipe = GetUpPipe(row, column);
                    break;
                case PipeSide.Right:
                    pipe.RightPipe = GetRightPipe(row, column);
                    break;
                case PipeSide.Down:
                    pipe.DownPipe = GetDownPipe(row, column);
                    break;
                case PipeSide.Left:
                    pipe.LeftPipe = GetLeftPipe(row, column);
                    break;
            }
        }

        private Pipe GetUpPipe(int row, int column)
        {
            return row == 0 || !rocketStationField[row - 1, column].IsSideConnected(PipeSide.Down) ? null : rocketStationField[row - 1, column];
        }

        private Pipe GetRightPipe(int row, int column)
        {
            return column == RocketStationWidth - 1 || !rocketStationField[row, column + 1].IsSideConnected(PipeSide.Left) ? null : rocketStationField[row, column + 1];
        }

        private Pipe GetDownPipe(int row, int column)
        {
            return row == RocketStationHeight - 1 || !rocketStationField[row + 1, column].IsSideConnected(PipeSide.Up) ? null : rocketStationField[row + 1, column];
        }

        private Pipe GetLeftPipe(int row, int column)
        {
            return column == 0 || !rocketStationField[row, column - 1].IsSideConnected(PipeSide.Right) ? null : rocketStationField[row, column - 1];
        }
    }
}
