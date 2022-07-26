import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonService } from '../Services/person.service';
import { IPerson } from '../ViewModels/iperson';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {

  person:IPerson[]=[];
  addPerson: FormGroup = {} as FormGroup;
  personData:IPerson={}as IPerson;
  constructor(private personSrvice:PersonService,private fb: FormBuilder,private personService:PersonService) { }

  ngOnInit(): void {
   this.personSrvice.getAllUsers().subscribe(
     {
       next:(result)=>
       {
         this.person=result;
       }
     }
   );

   this.addPerson = this.fb.group({
    fname: ['', Validators.required],
    lname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required]
  })
}
  deletePerson(PID:number)
  {
      this.personSrvice.deleteperson(PID).subscribe(
        {
          next:(result)=>{
            this.person=result;
          }
        }
      );
    }
    onSubmit()
    {
      console.log(this.addPerson.get("fname")?.value);
      console.log(this.addPerson.get("email")?.value);
      this.personData.email=this.addPerson.get("email")?.value;
      this.personData.first_Name=this.addPerson.get("fname")?.value;
      this.personData.last_Name=this.addPerson.get("lname")?.value;
      this.personData.phone=this.addPerson.get("phone")?.value;
      this.personService.addPerson(this.personData).subscribe(
        {
          next:(res)=>{
            this.person=res
          }
        }
      )
    }
}
