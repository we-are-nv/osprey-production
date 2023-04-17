import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { QuoteFormComponent } from './pages/quote-form/quote-form.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'quote', component:QuoteFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
