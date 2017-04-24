using SaluteOnline.Domain.Enums;

namespace SaluteOnline.Domain.Common
{
    public class PlayerEntry
    {
        public int Index { get; set; }
        public string Nick { get; set; }
        public Roles Role { get; set; }
        public int? Foul { get; set; }
        public BestPlayers BestPlayer { get; set; }
        public int? Result { get; set; }
        public int? PositionInKillQueue { get; set; }
        public bool KilledAtDay { get; set; }
        public bool KillerAtNight { get; set; }
        public int? CheckedAtNight { get; set; }
        public bool HalfBestWay { get; set; }
        public bool FullBestWay { get; set; }
    }
}