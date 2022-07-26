using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RepositoryPatternWithUOW.Core.Models.Person
{
    public class Person
    {
        public int Id { get; set; }
        public string First_Name { set; get; }
        public string Last_Name { set; get; }

        [Required,MaxLength(250)]
        public string Email { set; get; }
        public int Phone { set; get; }

        public List<Address> Addresses { get; set; }
    }
}
