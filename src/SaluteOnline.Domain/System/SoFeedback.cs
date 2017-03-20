using System;
using SaluteOnline.Domain.Common;

namespace SaluteOnline.Domain.System
{
    public class SoFeedback : IEntity
    {
        public Guid Guid { get; set; }
        public int Id { get; set; }
        public string SenderName { get; set; }
        public string SenderEmail { get; set; }
        public string Message { get; set; }
        public DateTime Sent { get; set; }
        public bool Processed { get; set; }
    }
}
