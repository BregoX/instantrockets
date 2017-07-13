using System;
namespace Assets.Scripts.Exceptions
{
    public class SlotNotFoundException : Exception
    {
        public SlotNotFoundException (int row, int column) :
            base(string.Format("Couldn't find an empty slot for pipe [{0},{1}].", row, column))
        {
        }
    }
}

