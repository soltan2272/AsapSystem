using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RepositoryPatternWithUOW.Core;
using RepositoryPatternWithUOW.Core.Consts;
using RepositoryPatternWithUOW.Core.Models.Person;
using RepositoryPatternWithUOW.Core.ViewModels;
using System;
using System.Collections.Generic;

namespace RespositoryPatternWithUOW.Api.Controllers
{
    [EnableCors]
    [Route("api/[controller]")]
    [ApiController]
    public class PesronController : ControllerBase
    {


        private readonly IUnitOfWork _unitOfWork;

        public PesronController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [Microsoft.AspNetCore.Mvc.HttpGet("GetPersonAddressById")]
        public IActionResult GetPersonAddressById([FromQuery] int personId,[FromQuery] int addId)
        {
            try
            {
                var person = _unitOfWork.Pesoons.GetById(personId);
                var addres = _unitOfWork.Address.GetById(addId);
                var personAddress = new PersonAddress
                {
                    Id = person.Id,
                    Email = person.Email,
                    First_Name = person.First_Name,
                    Last_Name = person.Last_Name,
                    Phone = person.Phone,
                    AddressID = addId,
                    Country = addres.Country,
                    City = addres.City,
                    State = addres.State,
                    postalCode = addres.Postal_Code
                };
                return Ok(personAddress);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Microsoft.AspNetCore.Mvc.HttpGet("GetAllPersons")]
        public IActionResult GetAllPersons()
        {
            try
            {
                return Ok(_unitOfWork.Pesoons.GetAll());
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
           
        }

        [Microsoft.AspNetCore.Mvc.HttpGet("GePersonsByEmail")]
        public IActionResult GePersonsByEmail(string email)
        {
            try
            {
                return Ok(_unitOfWork.Pesoons.Find(b => b.Email == email, new[] { "Addresses" }));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Microsoft.AspNetCore.Mvc.HttpGet("GetPersonsWithAddresses")]
        public IActionResult GetPersonsWithAddresses()
        {
            var persons = _unitOfWork.Pesoons.GetAll();
            try
            {
                var personsList = new List<PersonAddress>();
                if (persons != null)
                {
                    foreach (var person in persons)
                    {
                        personsList.Add(new PersonAddress
                        {
                            Id = person.Id,
                            Email = person.Email,
                            First_Name = person.First_Name,
                            Last_Name = person.Last_Name,
                            Phone = person.Phone,
                            AddressID = person.Addresses[0].Id,
                            Country = person.Addresses[0].Country,
                            City = person.Addresses[0].City,
                            State = person.Addresses[0].State,
                            postalCode = person.Addresses[0].Postal_Code
                        });
                    }
                }
                return Ok(personsList);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
       

        [Microsoft.AspNetCore.Mvc.HttpPost("AddPersonAddress")]
        public IActionResult AddPersonAddress(PersonAddress personAddress)
        {
            try
            {
                Person person = new Person
                {
                    First_Name = personAddress.First_Name,
                    Last_Name = personAddress.Last_Name,
                    Email = personAddress.Email,
                    Phone = personAddress.Phone
                };

                _unitOfWork.Pesoons.Add(person);

                if (_unitOfWork.Complete() > 0)
                {
                    Address address = new Address
                    {
                        Country = personAddress.Country,
                        City = personAddress.City,
                        Postal_Code = personAddress.postalCode,
                        State = personAddress.State,
                        CurrentPersonId = person.Id
                    };
                    _unitOfWork.Address.Add(address);
                    _unitOfWork.Complete();

                   
                }
                return Ok(personAddress);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }

           

        }

        [Microsoft.AspNetCore.Mvc.HttpPost("EditPersonAddress")]
        public IActionResult EditPersonAddress(PersonAddress editPersonAddress)
        {
            try
            {
                var person = _unitOfWork.Pesoons.GetById(editPersonAddress.Id);
                var address = _unitOfWork.Address.GetById(editPersonAddress.AddressID);
                person.First_Name = editPersonAddress.First_Name;
                person.Last_Name = editPersonAddress.Last_Name;
                person.Phone = editPersonAddress.Phone;
                person.Email = editPersonAddress.Email;
                address.Country = editPersonAddress.Country;
                address.City = editPersonAddress.City;
                address.State = editPersonAddress.State;
                address.Postal_Code = editPersonAddress.postalCode;
                address.CurrentPersonId = editPersonAddress.Id;

                _unitOfWork.Pesoons.Update(person);
                _unitOfWork.Complete();

                return Ok(person);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Microsoft.AspNetCore.Mvc.HttpGet("DeletePersonAddress")]
        public IActionResult DeletePersonAddress([FromQuery] int personId)
        {
           

                var person = _unitOfWork.Pesoons.GetById(personId);

                _unitOfWork.Pesoons.Delete(person);
                _unitOfWork.Complete();

                return Ok(person);
        }
    }
}
