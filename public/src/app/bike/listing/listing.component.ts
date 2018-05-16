import { Component, OnInit } from '@angular/core';
import { MainService } from '../../main.service';
import { Router } from "@angular/router";


@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
  new_bike={
    title:"",
    desc:"",
    price:"",
    location:"",
    imgurl:"",
  };
  my_bikes;
  err_message="";


  constructor(private _mainService:MainService, private _router:Router) { }

  create(){
    this._mainService.createBike(this.new_bike,(res)=>{
      console.log(res);
      if(res == 'success'){
        // this._mainService.getmybikes((res)=>{
        //   this.my_bikes = res.bikes;
        //   this.my_bikes.sort(function(a,b){
        //     return b.updatedAt > a.updatedAt;
        //   })
        // });
        console.log(res.json());
      }else{
        this.err_message = res;
      }
    });
    this.new_bike={
      title:"",
      desc:"",
      price:"",
      location:"",
      imgurl:"",
    };
  }
  
  update(id,bike){
    this._mainService.updateBike(id,bike,(res)=>{
      console.log(res);
      this._mainService.getmybikes((res)=>{
        this.my_bikes = res.bikes;
        this.my_bikes.sort(function(a,b){
          return b.updatedAt > a.updatedAt;
        })
      });
    })
  };

  delete(id){
    this._mainService.deleteBike(id, (res)=>{
      console.log(res);
      this._mainService.getmybikes((res)=>{
        this.my_bikes = res.bikes;
        this.my_bikes.sort(function(a,b){
          return b.updatedAt > a.updatedAt;
        })
      });
    })
  }

  ngOnInit() {
    if(localStorage.user == undefined){
      this._router.navigate(['']);
    }else{
      this._mainService.getmybikes((res)=>{
        this.my_bikes = res.bikes;
        this.my_bikes.sort(function(a,b){
          return b.updatedAt > a.updatedAt;
        })
      })
    }
  }

}
