using System;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Intefaces
{
    public interface IUnitOfWork : IDisposable
    {
        IGenericRepository<TEntity> Repository<TEntity>() where TEntity: BaseEntity;
        
        // track number of changes in DB       
        Task<int> Complete();
    }

}