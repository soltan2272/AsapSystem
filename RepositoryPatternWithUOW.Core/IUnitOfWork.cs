using RepositoryPatternWithUOW.Core.Interfaces;
using RepositoryPatternWithUOW.Core.Models;
using RepositoryPatternWithUOW.Core.Models.Person;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RepositoryPatternWithUOW.Core
{
    public interface IUnitOfWork : IDisposable
    {
        IBaseRepository<Address> Address { get; }
        IBaseRepository<Person> Pesoons { get; }

        int Complete();
    }
}