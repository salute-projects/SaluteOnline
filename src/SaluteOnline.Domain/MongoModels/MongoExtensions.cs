using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SaluteOnline.Domain.MongoModels
{
    public static class MongoExtensions
    {
        public static string ToMongoCollectionName(this Type entityType)
        {
            return entityType.Name.Replace("Mongo", string.Empty) + "s";
        }
    }
}
