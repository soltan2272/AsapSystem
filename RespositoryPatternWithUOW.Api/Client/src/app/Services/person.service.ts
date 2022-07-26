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
   this.httpservice.get<any>(`${environment.APIURL}getpersons`)
    .subscribe({
      next:(res)=>{
        console.log(res);
      }
    });

      return  this.httpservice.get<IPerson[]>(`${environment.APIURL}getpersons`);
  }
  deleteperson(id:number):Observable<IPerson[]>
  {
    this.httpservice.delete(`${environment.APIURL}deleteperson/${id}`).subscribe(
      {
        next:(res)=>
        {
          console.log(res)
        }
      }
     
    );
    return this.httpservice.delete<IPerson[]>(`${environment.APIURL}deleteperson/${id}`)
  }
  addPerson(person:IPerson):Observable<IPerson[]>
  {
    const httpOptions={
      headers:new HttpHeaders({
        'content-type': 'application/JSON'})
    }
    this.httpservice.post<IPerson[]>(`${environment.APIURL}addperson`,JSON.stringify(person))
    .subscribe({
      next:(res)=>{
        console.log(res);
      }
    });

      return  this.httpservice.post<IPerson[]>(`${environment.APIURL}addperson`,JSON.stringify(person),httpOptions);
  }
}
