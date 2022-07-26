using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RepositoryPatternWithUOW.Core.Models.Person
{
    public class Address
    {
        public int Id { get; set; }
        [Required, MaxLength(250)]
        public string Country { set; get; }
        [Required, MaxLength(250)]
        public string City { set; get; }
        public string State { set; get; }
        public string Postal_Code { set; get; }

        [ForeignKey("Person")]
        public int CurrentPersonId { get; set; }
        public Person Person { get; set; }
    }
}
