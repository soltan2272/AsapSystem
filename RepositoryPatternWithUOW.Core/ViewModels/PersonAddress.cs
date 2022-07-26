using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RepositoryPatternWithUOW.Core.ViewModels
{
    public class PersonAddress
    {
        public int Id { get; set; }
        public string First_Name { set; get; }
        public string Last_Name { set; get; }
        public string Email { set; get; }
        public int Phone { set; get; }

        public string Country { set; get; }
        public string City { set; get; }
        public string State { set; get; }
        public string postalCode { set; get; }
        public int AddressID { set; get; }
    }
}
