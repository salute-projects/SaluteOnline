using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SaluteOnline.DAL;
using SaluteOnline.Domain.Enums;
using SaluteOnline.Domain.MongoModels;
using SaluteOnline.Services.Declarations;

namespace SaluteOnline.Controllers
{
    [Route("api/[controller]")]
    public class ProtocolsController : Controller
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<ProtocolsController> _logger;
        private readonly IProtocolsService _protocolsService;

        public ProtocolsController(IUnitOfWork unitOfWork, ILogger<ProtocolsController> logger, IProtocolsService protocolsService)
        {
            _protocolsService = protocolsService;
            _unitOfWork = unitOfWork;
            _logger = logger;
        }

        [HttpGet]
        [Authorize(nameof(Role.User))]
        public async Task<IActionResult> Get()
        {
            try
            {
                return Ok(await _unitOfWork.Protocols.GetAsync());
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest();
            }
        }

        [HttpGet("{guid}")]
        public async Task<IActionResult> Get(Guid guid)
        {
            try
            {
                return Ok(await _unitOfWork.Protocols.GetByIdAsync(guid));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest();
            }
        }

        [HttpGet("GetPage")]
        public async Task<IActionResult> GetPage([FromQuery] int page, int items)
        {
            try
            {
                return Ok(await _unitOfWork.Protocols.GetPageAsync(page, items));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest();
            }
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody]MongoProtocol protocol)
        {
            try
            {
                if (protocol == null)
                    return BadRequest("Arguments omitted");
                return Ok(await _protocolsService.AddProtocol(protocol));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public async Task<IActionResult> Update(MongoProtocol protocol)
        {
            try
            {
                if (protocol == null)
                {
                    return BadRequest("Protocol is empty");
                }
                var result = await _unitOfWork.Protocols.UpdateAsync(protocol);
                if (result == null)
                {
                    return NotFound("Error while updating protocol");
                }
                await Task.Run(() => _unitOfWork.SaveAsync());
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest();
            }
        }

        [HttpDelete("{guid}")]
        public async Task<IActionResult> Delete(Guid guid)
        {
            try
            {
                await Task.Factory.StartNew(() => _unitOfWork.Protocols.DeleteAsync(guid))
                    .ContinueWith(prevTask => _unitOfWork.SaveAsync());
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest();
            }
        }

        [HttpPost("DeleteProtocol")]
        public async Task<IActionResult> Delete(MongoProtocol protocol)
        {
            try
            {
                await Task.Factory.StartNew(() => _unitOfWork.Protocols.DeleteAsync(protocol))
                    .ContinueWith(prevTask => _unitOfWork.SaveAsync());
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest();
            }
        }
    }
}
