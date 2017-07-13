using Random = UnityEngine.Random;
using UnityEngine;

namespace Assets.Scripts.Actions
{
    public interface IActable
    {
        Transform Transform { get; }
    }
}
