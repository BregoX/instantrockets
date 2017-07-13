using System;

namespace Assets.Scripts.Exceptions
{
    public class InconsistentScaleException : Exception
    {
        public InconsistentScaleException(string componentName)
            : base(string.Format("The following component must have consistent scale across coordinates: {0}.", componentName))
        {
        }
    }
}

