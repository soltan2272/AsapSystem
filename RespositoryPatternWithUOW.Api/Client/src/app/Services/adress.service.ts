import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAdress } from '../ViewModels/iadress';

@Injectable({
  providedIn: 'root'
})
export class AdressService {

  constructor(private httpservice:HttpClient) { }

  getAlladress():Observable< IAdress[]>
  {
   this.httpservice.get<any>(`${environment.APIURL}getaddress`)
    .subscribe({
      next:(res)=>{
        console.log(res);
      }
    });

      return  this.httpservice.get<IAdress[]>(`${environment.APIURL}getaddress`);
  }


  deleteadress(id:number):Observable<IAdress[]>
  {
    this.httpservice.delete(`${environment.APIURL}deleteaddress/${id}`).subscribe(
      {
        next:(res)=>
        {
          console.log(res)
        }
      }
     
    );
    return this.httpservice.delete<IAdress[]>(`${environment.APIURL}deleteaddress/${id}`)
  }


  addaddress(address:IAdress):Observable<IAdress[]>
  {
    const httpOptions={
      headers:new HttpHeaders({
        'content-type': 'application/JSON'})
    }
    this.httpservice.post<IAdress[]>(`${environment.APIURL}addaddress`,JSON.stringify(address))
    .subscribe({
      next:(res)=>{
        console.log(res);
      }
    });

      return  this.httpservice.post<IAdress[]>(`${environment.APIURL}addaddress`,JSON.stringify(address),httpOptions);
  }
}
