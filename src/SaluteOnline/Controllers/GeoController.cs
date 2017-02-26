using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using MongoDB.Driver;
using SaluteOnline.Domain.MongoModels;

namespace SaluteOnline.Controllers
{
    [Route("api/[controller]")]
    public class GeoController : Controller
    {
        private readonly ILogger<ProtocolsController> _logger;
        private readonly IMongoDatabase _mongoDb;

        public GeoController(ILogger<ProtocolsController> logger, IConfiguration configuration)
        {
            _logger = logger;
            _mongoDb =
                    new MongoClient(configuration.GetValue<string>("MongoSettings:Path")).GetDatabase(
                        configuration.GetValue<string>("MongoSettings:DB"));
        }

        [AllowAnonymous]
        [HttpGet("GetCity")]
        public async Task<IActionResult> GetCity(string country, string filter)
        {
            try
            {
                var collection = _mongoDb.GetCollection<MongoGeoCities>("Geo");
                var search = Builders<MongoGeoCities>.Filter.Eq(t => t.Country, country);
                var cities = await collection.Find(search).ToListAsync();
                var result =
                    cities.SingleOrDefault().Cities.Where(t => t.ToLowerInvariant().Contains(filter.ToLowerInvariant()));
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return Ok("");
            }
        }
    }
}
