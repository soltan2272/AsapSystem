import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from '../Services/person.service';

import { NotificationService } from '../Services/notification.service'




@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.scss']
})
export class EditPersonComponent implements OnInit {
  editPerson: FormGroup = {} as FormGroup;
  person:any;
  personId:any;
  addressId:any;
  constructor(private fb: FormBuilder,private _Activatedroute:ActivatedRoute,private personSrvice:PersonService,
    private notifyService : NotificationService,private router:Router) { }

  ngOnInit(): void {

       this.personId =this._Activatedroute.snapshot.paramMap.get('personid'); 
       this.addressId =this._Activatedroute.snapshot.paramMap.get('addressid');
        console.log(this.personId);
        console.log(this.addressId);
        

       this.personSrvice.getPersonAddress(this.personId,this.addressId).subscribe(
        {
          next:(result)=>{
            this.person=result;
            console.log(this.person);
            this.editPerson = this.fb.group({
              Id:[this.personId],
              AddressID:[this.addressId],
              Email: [this.person.email, [Validators.required, Validators.email]],
              Phone: [this.person.phone, Validators.required],
              Country: [this.person.country, Validators.required],
              City: [this.person.city, Validators.required],
              State: [this.person.state, Validators.required],
              postalCode: [this.person.postalCode, Validators.required],
              First_Name: [this.person.first_Name, Validators.required],
              Last_Name: [this.person.last_Name, Validators.required],
            })
          },
          error:(err)=>
          {
            console.log(err);
          }
       
        }
      );

   
  }

  onSubmit()
  {
    console.log(this.editPerson);
    this.personSrvice.editPersonAddress(this.editPerson.value).subscribe({
      next:(result)=>{

      console.log(result);
      this.notifyService.showSuccess("Success","Updated Successfully!");
      this.router.navigate(['']); 
      },
      error:(err)=>
      {
        console.log(err);
        this.notifyService.showError("Error","Error While Updating!")
      }
    })
  }

}
