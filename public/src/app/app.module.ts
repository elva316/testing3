import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BikeComponent } from './bike/bike.component';
import { BrowseComponent } from './bike/browse/browse.component';
import { ListingComponent } from './bike/listing/listing.component';
import { FormsModule } from '@angular/forms'; // <-- Import FormsModule
import { HttpModule } from '@angular/http'; // 
import { MainService } from './main.service';
import { CommentComponent } from './comment/comment.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BikeComponent,
    BrowseComponent,
    ListingComponent,
    CommentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
		HttpModule, 
  ],
  providers: [MainService],
  bootstrap: [AppComponent]
})
export class AppModule { }
