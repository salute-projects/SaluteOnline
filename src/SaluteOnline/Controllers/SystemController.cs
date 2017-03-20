using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SaluteOnline.DAL;
using SaluteOnline.Domain.System;

namespace SaluteOnline.Controllers
{
    [Route("api/[controller]")]
    public class SystemController : Controller
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<ProtocolsController> _logger;

        public SystemController(IUnitOfWork unitOfWork, ILogger<ProtocolsController> logger)
        {
            if (unitOfWork == null)
                throw new ArgumentNullException(nameof(unitOfWork));
            if (logger == null)
                throw new ArgumentNullException(nameof(logger));
            _unitOfWork = unitOfWork;
            _logger = logger;
        }

        [AllowAnonymous]
        [HttpPost("SendFeedback")]
        [EnableCors("AllowAll")]
        public async Task<IActionResult> SendFeedback([FromBody]SoFeedback feedback)
        {
            try
            {
                feedback.Sent = DateTime.UtcNow;
                feedback.Guid = Guid.NewGuid();
                var inserted = await _unitOfWork.Feedbacks.InsertAsync(feedback);
                var saved = inserted != null && await _unitOfWork.SaveAsync();
                return Ok(saved);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest();
            }
        }
    }
}
