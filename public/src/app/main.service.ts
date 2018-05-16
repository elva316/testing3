import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import io from "socket.io-client";
import {BehaviorSubject} from 'Rxjs';

@Injectable()
export class MainService {
  user=null;
  socket;
  islogined = false;
  if_socket_disconnect = false;
  login_users: BehaviorSubject<any []> = new  BehaviorSubject([])
  constructor(private _http:Http) {
    if(localStorage.user != undefined){
      this.user = JSON.parse( localStorage.user);
    }
   }

  createUser(user, callback){
    this._http.post("/users", user).subscribe(
      (res)=>{
        console.log('success 1');
        callback(res.json());
        if(res.json().message == "success"){
          this.user = res.json().user;
          localStorage.setItem('user',JSON.stringify(res.json().user));
          this.reconnect();
        }
      },
      (error)=>{
        console.log("error 1 ");
      }
    )
  }
  loginUser(user, callback){
    this._http.post('/login',user).subscribe(
      (res)=>{
        console.log('success 2');
        callback(res.json());
        if(res.json().error == undefined){
          this.user = res.json();
          localStorage.setItem('user',JSON.stringify(res.json()));
          this.reconnect();
        }
      },
      (error)=>{
        console.log("error 2 ");
      }
    )
  }

  createBike(bike, callback){
    this._http.post('/bikes',{bike:bike, id:this.user._id}).subscribe(
      (res)=>{
        console.log('success 3');
        callback(res.json());
      },
      (error)=>{
        console.log("error 3 ");
      }
    )
  }
//////////////
  getmybikes(callback){
    this._http.get('/bikes/user/'+this.user._id).subscribe(
      (res)=>{
        callback(res.json());
        //console.log('success 44444' + res );  //////////
      },
      (error)=>{
        console.log("error 4 ");
      }
    )
}

  updateBike(id, bike, callback){
    this._http.put('/bikes/'+id, bike).subscribe(
      (res)=>{
        callback(res.json());
      },
      (error)=>{
        console.log("error 5 ");
      }
    )
  }
  deleteBike(id, callback){
    this._http.delete('/bikes/'+id).subscribe(
      (res)=>{
        console.log('success 6');
        callback(res.json());
      },
      (error)=>{
        console.log("error 6 ");
      }
    )
  }

  getAllBikes(callback){
    this._http.get('/bikes').subscribe(
      (res)=>{
        console.log('success 7');
        callback(res.json());
      },
      (error)=>{
        console.log("error 7");
      }
    )
  }
  getContact(id, callback){
    this._http.get('/users/'+id).subscribe(
      (res)=>{
        console.log('success 8');
        callback(res.json());
      },
      (error)=>{
        console.log("error 8");
      }
    )
  }

  searchBike(search,callback){
    this._http.post('/bikes/search',{search:search}).subscribe(
      (res)=>{
        console.log('success 9');
        callback(res.json());
      },
      (error)=>{
        console.log("error 9");
      }
    )
  }

  getallcomments(id, callback){
    this._http.get('/comments/bikes/'+id).subscribe(
      (res)=>{
        console.log('success 10');
        callback(res.json());
      },
      (error)=>{
        console.log("error 10");
      }
    )
  }

  createComment(info,callback){
    this._http.post('/comments', info).subscribe(
      (res)=>{
        console.log('success 11');
        callback(res.json());
      },
      (error)=>{
        console.log("error 11");
      }
    )
  }

  updateLikes(info, callback){
    this._http.post('/comments/likes', info).subscribe(
      (res)=>{
        console.log('success 12');
        callback(res.json());
      },
      (error)=>{
        console.log("error 12");
      }
    )
  }

  update_loginusers(data){
    this.login_users.next(data);
  }

  reconnect(){
    if(this.if_socket_disconnect){
      this.socket = io('http://localhost:8000');
    }
  }
}
