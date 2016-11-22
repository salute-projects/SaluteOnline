using System;

namespace SaluteOnline.Domain.Common
{
    public interface IEntity
    {
        Guid Guid { get; set; }
        int Id { get; set; }
    }
}