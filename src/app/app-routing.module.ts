import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventDetailsComponent } from './event-details/event-details.component';
import { HomeComponent } from './home/home.component';
import { TableComponent } from './table/table.component';
import { CalComponent } from './cal/cal.component';


const routes: Routes = [
  {path: "", component: HomeComponent, pathMatch: 'full'},
  { path: "boxevents/:id", component: EventDetailsComponent },
  { path: "table", component: TableComponent},
  { path: 'calendar', component: CalComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
