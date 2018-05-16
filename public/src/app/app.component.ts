import { Component, OnInit } from '@angular/core';
import { MainService } from './main.service';
import { Router } from "@angular/router";
import io from "socket.io-client";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  auser = [];
  socket;
  constructor(private _mainService:MainService, private _router:Router) {
    this.socket = io('http://localhost:8000');
      this._mainService.socket = this.socket;      
      this.socket.on('online', function(data){
        this._mainService.update_loginusers(data.users) ;
        console.log(this._mainService.login_users);
      }.bind(this));
  }
   onDeactivate($event){

   }

   
   ngOnInit() {    
  }

}
