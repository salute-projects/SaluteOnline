using System;
using System.Threading.Tasks;
using SaluteOnline.Domain.MongoModels;

namespace SaluteOnline.Services.Declarations
{
    public interface IProtocolsService
    {
        Task<int> AddProtocol(MongoProtocol protocol, Guid userGuid, int clubId);
    }
}
