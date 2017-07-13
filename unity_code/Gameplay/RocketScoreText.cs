using System;
using UnityEngine;
using UnityEngine.UI;

namespace Assets.Scripts.Gameplay
{
    [RequireComponent(typeof(Animator))]
    public class RocketScoreText : MonoBehaviour
    {
        public void Kill()
        {
            Destroy(transform.parent.gameObject);
        }
    }
}

