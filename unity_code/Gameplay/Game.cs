using System;
using UnityEngine;
using UnityEngine.UI;
using Assets.Scripts.Exceptions;

namespace Assets.Scripts.Gameplay
{
    public class Game : MonoBehaviour
    {
        public GameObject RocketScorePrototype;
        public GameObject Canvas;
        public Text TotalScore;
        public int GameLengthSeconds;
        public int RocketsToLaunch;
        public GameObject EndGamePopup;

        private int score;
        private float canvasScale;
        private TimeOutCall gameEndTimer;
        private int rocketsLaunched;

        public event Action GameEnd = () => {};

        private void Start()
        {
            CheckParameters();
        }

        public void StartGame()
        {
            TotalScore.text = "Score: " + score;

            var scale = Canvas.GetComponent<RectTransform>().localScale;
            canvasScale = GetScale(scale);

            EndGamePopup.SetActive(false);
            gameEndTimer = new TimeOutCall(TimeSpan.FromSeconds(GameLengthSeconds), EndGame).Start();
        }

        private void EndGame()
        {
            GameEnd();
            EndGamePopup.SetActive(true);
        }

        private void CheckParameters()
        {
            if (RocketScorePrototype == null)
                throw new ParameterRequiredException("RocketScorePrototype");

            if (TotalScore == null)
                throw new ParameterRequiredException("TotalScore");

            if (Canvas == null)
                throw new ParameterRequiredException("Canvas");
        }

        private float GetScale(Vector3 scale)
        {
            if(scale.x != scale.y || scale.y != scale.z)
                throw new InconsistentScaleException("Canvas");

            return scale.x;
        }

        public void AddScores(params Rocket[] rockets)
        {
            foreach(var rocket in rockets)
                AddScore(rocket);

            TotalScore.text = "Score: " + score;
            CountLaunchedRockets(rockets.Length);
        }

        private void AddScore(Rocket rocket)
        {
            score += rocket.ScoreReward;
            var rocketScoreText = CreateRocketScoreText(rocket.gameObject.transform.position / canvasScale);
            rocketScoreText.text = rocket.ScoreReward.ToString();
        }

        private void CountLaunchedRockets(int launchedRocketsCount)
        {
            rocketsLaunched += launchedRocketsCount;

            if(launchedRocketsCount >= RocketsToLaunch)
                EndGame();
        }

        private Text CreateRocketScoreText(Vector3 position)
        {
            var tempObject = Instantiate(RocketScorePrototype, position, Quaternion.identity);
            tempObject.transform.SetParent(Canvas.transform, false);
            return tempObject.GetComponentInChildren<Text>();
        }

        private void Update()
        {
            if(gameEndTimer != null)
                gameEndTimer.Tick(Time.deltaTime);
        }
    }
}

