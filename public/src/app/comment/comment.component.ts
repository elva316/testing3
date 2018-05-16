import { Component, OnInit } from '@angular/core';
import { MainService } from './../main.service';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  the_bike;
  all_comments;
  user;
  comment = {
    user:'',
    title:"",
    content:"",
  };

  constructor(private _mainService:MainService, private _router:Router, private _route: ActivatedRoute) {
    this.user = this._mainService.user;
    if(this.user != null){
    this.comment.user = this.user.first_name +" "+ this.user.last_name;
    }
  }

  create(){
    this._mainService.createComment({id:this.the_bike._id,comment: this.comment}, (res)=>{
      if(res == "success"){
        this._mainService.getallcomments(this.the_bike._id, (res)=>{
          this.all_comments = res.comments;
          this.all_comments.sort(function(a,b){
            return b.likes > a.likes
          })
        })
      }else{
        console.log(res);
      }
      this.comment.title = "";
      this.comment.content = "";
    })
  }

  like(status, id){
    this._mainService.updateLikes({status:status, id:id},(res)=>{
      if(res == "success"){
        this._mainService.getallcomments(this.the_bike._id, (res)=>{
          this.all_comments = res.comments;
          this.all_comments.sort(function(a,b){
            return b.likes > a.likes
          })
        })
      }else{
        console.log(res);
      }
    })
  }


  logout(){
    this._mainService.user = null;
    this._router.navigate(['']);
    localStorage.removeItem('user');
  }
  ngOnInit() {
    if(localStorage.user == undefined){
      this._router.navigate(['']);
    }else{
      this._route.paramMap.subscribe((params)=>{
        let id  = params.get('id');
        this._mainService.getallcomments(id, (res)=>{
          this.the_bike = res;
          this.all_comments = res.comments;
          this.all_comments.sort(function(a,b){
            return b.likes > a.likes
          })
        })
      })

    }
  }

}
