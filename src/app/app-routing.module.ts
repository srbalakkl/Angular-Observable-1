import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ObservableWithEventsComponent} from "./observable-with-events/observable-with-events.component";
import {AppComponent} from "./app.component";

const routes: Routes = [
  // {path: '', redirectTo: 'home', pathMatch: "full"},
  // {path:'home',component:AppComponent},
  {path:'obs_event',component:ObservableWithEventsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
