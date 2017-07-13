using System;
using UnityEngine;
using Assets.Scripts.Gameplay;

namespace Assets.Scripts.Actions
{
    public class MoveAction : IGameAction
    {
        private readonly Transform transform;
        private Vector3 destination;

        private Vector3 speed;

        private readonly float targetTime;
        private float elapsedTime;

        public MoveAction (IActable actable, Vector3 destination, TimeSpan time)
        {
            this.transform = actable.Transform;
            this.destination = destination;
            this.targetTime = (float)time.TotalSeconds;
            this.elapsedTime = 0;
            this.speed = GetSpeed();
        }

        private Vector3 GetSpeed()
        {
            return (destination - transform.position) / targetTime ;
        }

        public ActionResult Step(float deltaTime)
        {
            if(elapsedTime > targetTime)
            {
                transform.position = destination;
                return ActionResult.Finished;
            }

            elapsedTime += deltaTime;
            transform.position += speed * deltaTime;
            return ActionResult.Continue;
        }
    }
}

