using Microsoft.EntityFrameworkCore;
using RepositoryPatternWithUOW.Core.Models;
using RepositoryPatternWithUOW.Core.Models.Person;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RepositoryPatternWithUOW.EF
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Address> Addresses { get; set; }

        public DbSet<Person> Persons { get; set; }
    }
}