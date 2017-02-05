using SaluteOnline.Domain.MongoModels;
using SaluteOnline.Domain.User;

namespace SaluteOnline.DAL
{
    public interface IUnitOfWork
    {
        void Save();
        void SaveAsync();
        GenericRepository<User> Users { get; }
        GenericRepository<MongoUser> MongoUsers { get; }
        GenericRepository<MongoProtocol> Protocols { get; }
    }
}
