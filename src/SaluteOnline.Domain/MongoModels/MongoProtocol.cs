using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using SaluteOnline.Domain.Common;
using SaluteOnline.Domain.Enums;

namespace SaluteOnline.Domain.MongoModels
{
    public class MongoProtocol : IMongoEntity
    {
        [BsonId]
        [BsonRepresentation(BsonType.String)]
        public Guid Guid { get; set; }

        [BsonElement("Id")]
        public int Id { get; set; }

        public Teams Winner { get; set; }
        public int? Game { get; set; }
        public int? Table { get; set; }
        public IEnumerable<int> KilledAtDay { get; set; }
        public IEnumerable<int> KilledAtNight { get; set; }
        public IEnumerable<int> BestWay { get; set; }
        public int? DonCheck { get; set; }
        public int? SheriffCheck { get; set; }
        public bool ThreeCheck { get; set; }
        public bool TechRed { get; set; }
        public bool TechBlack { get; set; }
        public IEnumerable<int> Ugadayka { get; set; }
        public int? FalseSheriff { get; set; }
        public bool SheriffFirstKilled { get; set; }
        public IEnumerable<PlayerEntry> Players { get; set; }
    }
}
