using System;
namespace Assets.Scripts.Actions
{
    public class DelayAction : IGameAction
    {
        private readonly float targetTime;
        private float elapsedTime;

        public DelayAction (TimeSpan time)
        {
            this.targetTime = (float)time.TotalSeconds;
            this.elapsedTime = 0;
        }

        public ActionResult Step (float deltaTime)
        {
            if(elapsedTime > targetTime)
                return ActionResult.Finished;

            elapsedTime += deltaTime;
            return ActionResult.Continue;
        }
    }
}

