using System;

namespace Assets.Scripts.Gameplay
{
    public class TimeOutCall
    {
        private readonly Action action;
        private readonly double interval;
        private bool oneTime;

        private double timeLeft;
        private bool isStopped;

        public int SecondsLeft
        {
            get { return (int)timeLeft; }
        }

        public TimeOutCall(TimeSpan interval, Action action)
        {
            this.action = action;
            this.oneTime = true;
            this.isStopped = true;
            this.interval = interval.TotalSeconds;
            this.timeLeft = this.interval;
        }

        public TimeOutCall WithRepeat()
        {
            oneTime = false;
            return this;
        }

        public TimeOutCall Start()
        {
            isStopped = false;
            return this;
        }

        public void Tick(float elapsedTime)
        {
            if (isStopped)
                return;

            timeLeft -= elapsedTime;

            if (timeLeft >= 0)
                return;

            action();
            timeLeft = interval;

            isStopped |= oneTime;
        }
    }
}
