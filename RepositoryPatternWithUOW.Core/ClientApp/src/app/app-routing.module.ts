import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPersonComponent } from './add-person/add-person.component';


import { EditPersonComponent } from './edit-person/edit-person.component';
import { MainComponent } from './main/main.component';


const routes: Routes = [
  {path:'',component:MainComponent},
  {path:'editperson/:personid/:addressid',component:EditPersonComponent},
  {path:'addperson',component:AddPersonComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
