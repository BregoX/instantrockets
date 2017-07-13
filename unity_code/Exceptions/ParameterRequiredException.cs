using System;

namespace Assets.Scripts.Exceptions
{
    public class ParameterRequiredException : Exception
    {
        public ParameterRequiredException(string parameterName)
            : base(string.Format("You must provide an object for the {0} parameter in Unity interface for this script.", parameterName))
        {}
    }
}
