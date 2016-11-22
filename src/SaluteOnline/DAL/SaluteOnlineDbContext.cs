using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SaluteOnline.Domain.User;

namespace SaluteOnline.DAL
{
    public class SaluteOnlineDbContext : DbContext
    {
        public SaluteOnlineDbContext(DbContextOptions options) : base(options)
        {
        }

        public SaluteOnlineDbContext()
        {
        }

        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().ToTable("User");
        }
    }
}
