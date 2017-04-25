using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using SaluteOnline.Controllers;
using SaluteOnline.DAL;
using SaluteOnline.Domain.MongoModels;
using SaluteOnline.Services.Declarations;

namespace SaluteOnline.Services
{
    public class ProtocolsService : IProtocolsService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<ProtocolsController> _logger;

        public ProtocolsService(IUnitOfWork unitOfWork, ILogger<ProtocolsController> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
        }

        public async Task<int> AddProtocol(MongoProtocol protocol, Guid userGuid, int clubId)
        {
            try
            {
                if (protocol == null || userGuid == Guid.Empty)
                {
                    throw new ArgumentException();
                }
                protocol.UserGuid = userGuid;
                protocol.ClubId = clubId;
                protocol.Added = DateTimeOffset.UtcNow;
                var result = await _unitOfWork.Protocols.InsertAsync(protocol);
                await _unitOfWork.SaveAsync();
                return result.Id;
            }
            catch (ArgumentException)
            {
                throw new Exception("Arguments omitted");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw new Exception("Error while adding protocol to DB. Please try a bit later");
            }
        }
    }
}
