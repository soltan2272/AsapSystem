import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdressComponent } from './adress/adress.component';
import { MainComponent } from './main/main.component';
import { PersonComponent } from './person/person.component';

const routes: Routes = [
  {path:'',component:MainComponent},
  {path:'person',component:PersonComponent},
  {path:'address',component:AdressComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
