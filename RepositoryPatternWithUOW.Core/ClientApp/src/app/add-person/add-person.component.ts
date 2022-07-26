import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '../Services/notification.service';
import { PersonService } from '../Services/person.service';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.scss']
})
export class AddPersonComponent implements OnInit {

  addPerson: FormGroup = {} as FormGroup;
  constructor(private fb: FormBuilder ,private personSrvice:PersonService, private notifyService : NotificationService,
    private router:Router) { }

  ngOnInit(): void {

    this.addPerson = this.fb.group({
     
     
      Email: ['', [Validators.required, Validators.email]],
      Phone: [201, Validators.required],
      Country: ['', Validators.required],
      City: ['', Validators.required],
      State: ['', Validators.required],
      postalCode: ['', Validators.required],
      First_Name: ['', Validators.required],
      Last_Name: ['', Validators.required],
    })
  }

  onSubmit()
  {

    console.log(this.addPerson);
    this.personSrvice.addPersonAddress(this.addPerson.value).subscribe({
      next:(result)=>{

      console.log(result);
      this.notifyService.showSuccess("Success","Addedd Successfully!");
      this.router.navigate(['']); 
      },
      error:(err)=>
      {
        console.log(err);
        this.notifyService.showError("Error","Error While Add!")
      }
    })
  }

}
