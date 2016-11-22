using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace SaluteOnline.DAL
{
    public static class Extensions
    {
        public static TEntity Find<TEntity>(this DbSet<TEntity> set, params object[] keyValues) where TEntity : class
        {
            var context = set.GetService<SaluteOnlineDbContext>();
            var entityType = context.Model.FindEntityType(typeof(TEntity));
            var key = entityType.FindPrimaryKey();
            var entries = context.ChangeTracker.Entries<TEntity>();
            var i = 0;
            foreach (var property in key.Properties)
            {
                var i1 = i;
                entries = entries.Where(e => e.Property(property.Name).CurrentValue == keyValues[i1]);
                i++;
            }
            var entry = entries.FirstOrDefault();
            if (entry != null)
            {
                return entry.Entity;
            }
            var parameter = Expression.Parameter(typeof(TEntity), "x");
            var query = set.Where((Expression<Func<TEntity, bool>>)
                Expression.Lambda(
                    Expression.Equal(Expression.Property(parameter, "Id"), Expression.Constant(keyValues[0])), parameter));
            return query.SingleOrDefault();
        }

        public static async Task<TEntity> FindAsync<TEntity>(this DbSet<TEntity> set, params object[] keyValues)
            where TEntity : class
        {
            var context = set.GetService<SaluteOnlineDbContext>();
            var entityType = context.Model.FindEntityType(typeof(TEntity));
            var key = entityType.FindPrimaryKey();
            var entries = context.ChangeTracker.Entries<TEntity>();
            var i = 0;
            foreach (var property in key.Properties)
            {
                var i1 = i;
                entries = entries.Where(e => e.Property(property.Name).CurrentValue == keyValues[i1]);
                i++;
            }
            var entry = entries.FirstOrDefault();
            if (entry != null)
            {
                return entry.Entity;
            }
            var parameter = Expression.Parameter(typeof(TEntity), "x");
            var query = set.Where((Expression<Func<TEntity, bool>>)
                Expression.Lambda(
                    Expression.Equal(Expression.Property(parameter, "Id"), Expression.Constant(keyValues[0])), parameter));
            return await query.SingleOrDefaultAsync();
        }
    }
}
