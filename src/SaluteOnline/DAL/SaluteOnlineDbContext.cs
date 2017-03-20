using Microsoft.EntityFrameworkCore;
using SaluteOnline.Domain.System;
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

        public DbSet<SoFeedback> Feedbacks { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<SoFeedback>().ToTable("Feedbacks");
        }
    }
}
