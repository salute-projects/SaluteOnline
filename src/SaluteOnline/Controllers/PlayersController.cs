using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace SaluteOnline.Controllers
{
    [Route("api/[controller]")]
    public class PlayersController : Controller
    {
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new [] { "Тихий Дон", "Ксю", "КАМАЗ" };
        }
    }
}
