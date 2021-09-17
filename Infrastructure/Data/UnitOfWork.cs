using System;
using System.Collections;
using System.Threading.Tasks;
using Core.Entities;
using Core.Intefaces;

namespace Infrastructure.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly StoreContext _context;
        private Hashtable _repositories;

        public UnitOfWork(StoreContext context)
        {
            _context = context;
        }

        public async Task<int> Complete()
        {
            return await _context.SaveChangesAsync();
        }

        public void Dispose()
        {
            _context.Dispose();
        }

        public IGenericRepository<TEntity> Repository<TEntity>() where TEntity : BaseEntity
        {
            if(_repositories == null) 
            {
               _repositories = new Hashtable(); 
            }
            // tip na klasa koja nasleduva od base entity(perzistira vo DB)
            // se koristi kako key ho hashtable
            var type = typeof(TEntity).Name;

            if(!_repositories.ContainsKey(type))
            {
                //Generic Repository Type
                var repositoryType = typeof(GenericRepository<>);
                //kreiranje na soodvetna instance
                var repositoryInstance = Activator
                .CreateInstance(repositoryType.MakeGenericType(typeof(TEntity)),_context);

                _repositories.Add(type,repositoryInstance);
            }

            return (IGenericRepository<TEntity>) _repositories[type];
        }
    }
}