import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PersonService } from '../Services/person.service';
import { IPerson } from '../ViewModels/iperson';
import { NotificationService } from '../Services/notification.service'


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  person:any[]=[];
  addPerson: FormGroup = {} as FormGroup;
  personData:any={}as any;
  constructor(private personSrvice:PersonService,private fb: FormBuilder,private personService:PersonService,private router:Router
    ,private notifyService : NotificationService) { }

  ngOnInit(): void {
   this.getAllPersons();
  }
  getAllPersons()
  {
    this.personSrvice.getAllUsers().subscribe(
      {
        next:(result)=>
        {
          this.person=result;
          console.log(this.person);
        }
      });
  }
  EditPerson(personId:number,addressId:number)
  {
    
    console.log(personId);
    console.log(addressId);
    this.router.navigate(['/editperson',personId,addressId]); 
  }
  deletePerson(id:number)
  {
    console.log(id);
    this.personSrvice.deletepersonAddress(id).subscribe({
      next:(result)=>
      {
        
        console.log(result);
        this.notifyService.showSuccess("Success","Deleted Succesully");
        this.getAllPersons();
      },
      error:(error)=>
      {
        console.log(error);
        this.notifyService.showError("Error","Error Occur while Delete");
      }
    })
  }

}
