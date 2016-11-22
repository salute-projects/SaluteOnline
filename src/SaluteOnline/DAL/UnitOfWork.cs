using System;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using SaluteOnline.Domain.MongoModels;
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

        private GenericRepository<User> _users;
        public GenericRepository<User> Users => _users ?? (_users = new GenericRepository<User>(_context, _configuration));

        private GenericRepository<MongoProtocol> _protocols;
        public GenericRepository<MongoProtocol> Protocols => _protocols ?? (_protocols = new GenericRepository<MongoProtocol>(_context, _configuration));

        public void Save()
        {
            _context.SaveChanges();
        }

        public async void SaveAsync()
        {
            await _context.SaveChangesAsync();
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

