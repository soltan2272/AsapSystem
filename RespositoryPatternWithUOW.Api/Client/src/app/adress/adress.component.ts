import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdressService } from '../Services/adress.service';
import { IAdress } from '../ViewModels/iadress';

@Component({
  selector: 'app-adress',
  templateUrl: './adress.component.html',
  styleUrls: ['./adress.component.scss']
})
export class AdressComponent implements OnInit {

  address:IAdress[]=[];
  addaddress: FormGroup = {} as FormGroup;
  addressData:IAdress={}as IAdress;
  constructor(private addressSrvice:AdressService,private fb: FormBuilder) { }

  ngOnInit(): void {
   this.addressSrvice.getAlladress().subscribe(
     {
       next:(result)=>
       {
         this.address=result;
       }
     }
   );

   this.addaddress= this.fb.group({
    country: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    postcode: ['', Validators.required]
  })
}
  deleteaddress(PID:number)
  {
      this.addressSrvice.deleteadress(PID).subscribe(
        {
          next:(result)=>{
            this.address=result;
          }
        }
      );
    }
    onSubmit()
    {
      console.log(this.addaddress.get("country")?.value);
      console.log(this.addaddress.get("state")?.value);
      this.addressData.country=this.addaddress.get("country")?.value;
      this.addressData.city=this.addaddress.get("city")?.value;
      this.addressData.state=this.addaddress.get("state")?.value;
      this.addressData.postal_Code=this.addaddress.get("postcode")?.value;
      this.addressData.currentPersonId=1;
      this.addressSrvice.addaddress(this.addressData).subscribe(
        {
          next:(res)=>{
            this.address=res
          }
        }
      )
    }
}
