using UnityEngine;
using System.Collections.Generic;
using System;

namespace Assets.Scripts.Actions
{
    public class GameActionExecutor : MonoBehaviour
    {
        private readonly List<IGameAction> actions = new List<IGameAction>();

        private bool isRunning = false;
        public event Action AllActionsEnd = () => {};

        public bool IsRunning
        {
            get { return isRunning; }
        }

        public void Run(IGameAction action)
        {
            actions.Add(action);
            isRunning = true;
        }

        public void Stop()
        {
            actions.Clear();
            isRunning = false;
        }

        private void Update()
        {
            if(!isRunning)
                return;

            RunActions();
        }

        private void RunActions()
        {
            var actionsToEnd = new List<IGameAction>();

            foreach(var action in actions)
            {
                var result = action.Step(Time.deltaTime);
                if(result == ActionResult.Finished)
                    actionsToEnd.Add(action);
            }

            foreach(var action in actionsToEnd)
                actions.Remove(action);

            if(actions.Count == 0)
            {
                isRunning = false;
                AllActionsEnd();
            }
        }
    }
}

