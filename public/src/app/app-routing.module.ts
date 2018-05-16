import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BikeComponent } from './bike/bike.component';
import { BrowseComponent } from './bike/browse/browse.component';
import { ListingComponent } from './bike/listing/listing.component';
import { CommentComponent } from './comment/comment.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: LoginComponent, outlet:'login'},
  
  { path: 'bike', component: BikeComponent, children:[
      { path: 'browse', component: BrowseComponent },
      { path: 'listing', component: ListingComponent },
  ] },
  {path: 'comment/bikes/:id', component: CommentComponent},

  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
