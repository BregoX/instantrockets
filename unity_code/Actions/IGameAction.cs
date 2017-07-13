
namespace Assets.Scripts.Actions
{
    public interface IGameAction
    {
        ActionResult Step(float deltaTime);
    }
}

