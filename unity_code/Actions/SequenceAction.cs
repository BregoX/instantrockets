using System.Collections.Generic;

namespace Assets.Scripts.Actions
{
    public class SequenceAction : IGameAction
    {
        private Queue<IGameAction> actionQueue;
        private IGameAction currentAction;

        public SequenceAction (params IGameAction[] sequencedActions)
        {
            actionQueue = new Queue<IGameAction>();

            foreach(var action in sequencedActions)
                actionQueue.Enqueue(action);

            currentAction = actionQueue.Dequeue();
        }

        public ActionResult Step (float deltaTime)
        {
            var result = currentAction.Step(deltaTime);

            if(result == ActionResult.Continue)
                return ActionResult.Continue;

            if(actionQueue.Count == 0)
                return ActionResult.Finished;

            currentAction = actionQueue.Dequeue();
            return ActionResult.Continue;
        }
    }
}

