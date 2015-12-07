using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using PollyApp.EFModel;
using System.Reflection;

namespace PollyApp.GenericRepository
{
    public class Repository
    {
        public Entities Context { get; set; }

        public Repository()
        {
            Context = new Entities();
        }

        public IEnumerable<TEntity> GetListRecords<TEntity>() where TEntity : class
        {
            return Context.Set<TEntity>().ToList();
        }
        public void Add<TEntity>(TEntity ent) where TEntity : class
        {
            Context.Set<TEntity>().Add(ent);
        }
        public void Delete<TEntity>(int id) where TEntity : class
        {
            var el = Context.Set<TEntity>().Find(id);
            Context.Set<TEntity>().Remove(el);
        }
        public void Update<TEntity>(TEntity ent) where TEntity : class
        {
            dynamic dynEntity = ent;
            var temp = Context.Set<TEntity>().Find(dynEntity.Id);
            Context.Entry<TEntity>(temp).CurrentValues.SetValues(ent);
            Context.Entry<TEntity>(temp).State = EntityState.Modified;
        }
        public void Save()
        {
            Context.SaveChanges();
        }
    }
}
