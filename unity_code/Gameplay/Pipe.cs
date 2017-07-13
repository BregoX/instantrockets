using System;
using System.Collections.Generic;
using Assets.Scripts.Actions;
using System.Linq;
using UnityEngine;
using Random = UnityEngine.Random;

namespace Assets.Scripts.Gameplay
{
    [RequireComponent(typeof(SpriteRenderer), typeof(Transform), typeof(Animator))]
    public class Pipe : MonoBehaviour, IActable
    {
        private const int maxRotation = 4;
        private int rotationState { get; set; }
        private PipeType type { get; set; }
        private Animator animator;

        private bool isSteamConnected;
        private bool isRocketConnected;

        public bool IsReadyToLaunch
        {
            get { return isSteamConnected && isRocketConnected; }
        }

        public Transform Transform
        {
            get
            {
                return transform;
            }
        }

        public void Kill()
        {
            Destroy(gameObject);
        }

        public Pipe UpPipe { get; set; }
        public Pipe RightPipe { get; set; }
        public Pipe DownPipe { get; set; }
        public Pipe LeftPipe { get; set; }

        public event Action Pressed = () => { };

        public bool IsSideConnected(PipeSide side)
        {
            return PipeConnectionSides.Contains(side);
        }

        public void ConnectSteam()
        {
            if(isSteamConnected)
                return;

            isSteamConnected = true;
            SetTint(Color.yellow);

            if (UpPipe != null )
                UpPipe.ConnectSteam();

            if(RightPipe != null)
                RightPipe.ConnectSteam();

            if(DownPipe != null)
                DownPipe.ConnectSteam();

            if (LeftPipe != null)
                LeftPipe.ConnectSteam();
        }

        public void ConnectRocket()
        {
            if (isRocketConnected)
                return;

            isRocketConnected = true;
            SetTint(!IsReadyToLaunch ? Color.red : Color.green);

            if (UpPipe != null)
                UpPipe.ConnectRocket();

            if (RightPipe != null)
                RightPipe.ConnectRocket();

            if (DownPipe != null)
                DownPipe.ConnectRocket();

            if (LeftPipe != null)
                LeftPipe.ConnectRocket();
        }

        private void SetTint(Color color)
        {
            var spriteRenderer = GetComponent<SpriteRenderer>();
            spriteRenderer.color = color;
        }

        public void Reset()
        {
            UpPipe = null;
            DownPipe = null;
            RightPipe = null;
            LeftPipe = null;

            isSteamConnected = false;
            isRocketConnected = false;

            SetTint(Color.white);
        }

        public PipeSide[] PipeConnectionSides
        {
            get
            {
                var sides = GetInitialConnectionSides();
                RotateConnectionSides(sides);
                return sides;
            }
        }

        private PipeSide[] GetInitialConnectionSides()
        {
            switch (type)
            {
                case PipeType.Sides2Bent:
                    return new[] { PipeSide.Left, PipeSide.Up };
                case PipeType.Sides2Straight:
                    return new[] {PipeSide.Left, PipeSide.Right};
                case PipeType.Sides3:
                    return new[] {PipeSide.Left, PipeSide.Right, PipeSide.Up};
                case PipeType.Sides4:
                    return new[] {PipeSide.Up, PipeSide.Right, PipeSide.Down, PipeSide.Left};
            }

            throw new NotSupportedException("The following pipe type is not supported: " + type);
        }

        private void RotateConnectionSides(PipeSide[] pipeSides)
        {
            for (var i = 0; i < pipeSides.Length; i++)
            {
                var rotatedSide = RotateConnectionSide(pipeSides[i]);
                pipeSides[i] = rotatedSide;
            }
        }

        private PipeSide RotateConnectionSide(PipeSide pipeSide)
        {
            return (PipeSide) (((int)pipeSide + rotationState) % GetEnumSize<PipeSide>());
        }

        private void Awake()
        {
            animator = GetComponent<Animator>();
            SetRandomTile();
            SetInitialRotationState();
        }

        private void SetRandomTile()
        {
            type = GenerateType();
            animator.SetTrigger(type.ToString());
        }

        private void SetInitialRotationState()
        {
            rotationState = GenerateRotationState();
            Rotate (rotationState);
        }

        private void Rotate()
        {
            rotationState = ++rotationState % maxRotation;
            transform.Rotate(Vector3.forward, -90);
        }

        private void Rotate(int times)
        {
            transform.Rotate(Vector3.forward, -90 * times);
        }

        private PipeType GenerateType()
        {
            return (PipeType)Random.Range(0, GetEnumSize<PipeType>());
        }

        private int GenerateRotationState()
        {
            return Random.Range(0, maxRotation);
        }

        private int GetEnumSize<T>()
        {
            return Enum.GetValues(typeof(T)).Length;
        }

        private enum PipeType
        {
            Sides3,
            Sides4,
            Sides2Straight,
            Sides2Bent
        }

        void OnMouseDown()
        {
            Rotate();
            Pressed();
        }
    }
}
