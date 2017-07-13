using System;
using UnityEngine;

namespace Assets.Scripts.Gameplay
{
    [RequireComponent(typeof(Transform))]
    public class Rocket : MonoBehaviour
    {
        private const int level = 1;
        private const int scoreMultiplier = 10;
        private bool readyToLaunch;

        public bool ReadyToLaunch 
        {
            get { return readyToLaunch; }
        }

        public int ScoreReward
        {
            get { return level * scoreMultiplier; }
        }

        private void Awake()
        {
            //do nothing
        }

        public void Kill()
        {
            Destroy(gameObject);
        }

        public void PrepareForLaunch()
        {
            readyToLaunch = true;
        }

        public void Launch()
        {
            readyToLaunch = false;
        }
    }
}

