using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using SaluteOnline.Domain.MongoModels;
using SaluteOnline.Domain.System;
using SaluteOnline.Domain.User;

namespace SaluteOnline.DAL
{
    public class UnitOfWork : IUnitOfWork, IDisposable
    {
        private readonly SaluteOnlineDbContext _context;
        private readonly IConfiguration _configuration;
        public UnitOfWork(SaluteOnlineDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        private GenericRepository<SoFeedback> _feedbacks;
        public GenericRepository<SoFeedback> Feedbacks => _feedbacks ?? (_feedbacks = new GenericRepository<SoFeedback>(_context, _configuration));

        private GenericRepository<MongoProtocol> _protocols;
        public GenericRepository<MongoProtocol> Protocols => _protocols ?? (_protocols = new GenericRepository<MongoProtocol>(_context, _configuration));

        private GenericRepository<MongoUser> _mongoUsers;
        public GenericRepository<MongoUser> MongoUsers => _mongoUsers ?? (_mongoUsers = new GenericRepository<MongoUser>(_context, _configuration));

        public void Save()
        {
            _context.SaveChanges();
        }

        public async Task<bool> SaveAsync()
        {
            await _context.SaveChangesAsync();
            return true;
        }

        #region Dispose

        private bool _disposed;
        protected virtual void Dispose(bool disposing)
        {
            if (!_disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
            }
            _disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        #endregion
    }
}

