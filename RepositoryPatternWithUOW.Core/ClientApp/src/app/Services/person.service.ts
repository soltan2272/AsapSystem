import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IPerson } from '../ViewModels/iperson';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private httpservice:HttpClient) { }

    getAllUsers():Observable<IPerson[]>
  {
   this.httpservice.get<any>(`${environment.APIURL}GetPersonsWithAddresses`)
    .subscribe({
      next:(res)=>{
        console.log(res);
      }
    });

      return this.httpservice.get<IPerson[]>(`${environment.APIURL}GetPersonsWithAddresses`);
  }
  deletepersonAddress(personId:number):Observable<any[]>
  {
    return this.httpservice.get<any[]>(`${environment.APIURL}DeletePersonAddress?personId=${personId}`)
  }

  getPersonAddress(personid:number,addressid:number):Observable<any[]>
  {
    this.httpservice.get(`${environment.APIURL}GetPersonAddressById?personId=${personid}&addId=${addressid}`).subscribe(
      {
        next:(res)=>
        {
          console.log(res)
        }
      }
     
    );
    return this.httpservice.get<any[]>(`${environment.APIURL}GetPersonAddressById?personId=${personid}&addId=${addressid}`)
  }

  addPersonAddress(person:any):Observable<any[]>
  {
    const httpOptions={
      headers:new HttpHeaders({
        'content-type': 'application/JSON'})
    }
    this.httpservice.post<any[]>(`${environment.APIURL}AddPersonAddress`,JSON.stringify(person),httpOptions)
    .subscribe({
      next:(res)=>{
        console.log(res);
      }
    });

      return  this.httpservice.post<any[]>(`${environment.APIURL}AddPersonAddress`,JSON.stringify(person),httpOptions);
  }

  editPersonAddress(person:any):Observable<any[]>
  {
    const httpOptions={
      headers:new HttpHeaders({
        'content-type': 'application/json'})
    }
    this.httpservice.post<any[]>(`${environment.APIURL}EditPersonAddress`,JSON.stringify(person),httpOptions)
    .subscribe({
      next:(res)=>{
        console.log(res);
      }
    });

      return  this.httpservice.post<any[]>(`${environment.APIURL}EditPersonAddress`,JSON.stringify(person),httpOptions);
  }
}
