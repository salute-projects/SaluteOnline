using System.Threading.Tasks;
using SaluteOnline.Domain.MongoModels;
using SaluteOnline.Domain.System;
using SaluteOnline.Domain.User;

namespace SaluteOnline.DAL
{
    public interface IUnitOfWork
    {
        void Save();
        Task<bool> SaveAsync();
        GenericRepository<SoFeedback> Feedbacks { get; }
        GenericRepository<MongoUser> MongoUsers { get; }
        GenericRepository<MongoProtocol> Protocols { get; }
    }
}
