using RepositoryPatternWithUOW.Core;
using RepositoryPatternWithUOW.Core.Interfaces;
using RepositoryPatternWithUOW.Core.Models;
using RepositoryPatternWithUOW.Core.Models.Person;
using RepositoryPatternWithUOW.EF.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RepositoryPatternWithUOW.EF
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext _context;

      //  public IBaseRepository<Author> Authors { get; private set; }
     //   public IBooksRepository Books { get; private set; }

       public IBaseRepository<Address> Address { get; private set; }
       public IBaseRepository<Person> Pesoons { get; private set; }

        public UnitOfWork(ApplicationDbContext context)
        {
            _context = context;

            
            Address= new BaseRepository<Address>(_context);
            Pesoons = new BaseRepository<Person>(_context);
        }

        public int Complete()
        {
            return _context.SaveChanges();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}