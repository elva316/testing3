import { Component, OnInit } from "@angular/core";
import { MainService } from "./../main.service";
import { Router } from "@angular/router";
declare var $: any;
declare var jquery: any;
// import io from "socket.io-client";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  new_user = {
    first_name: "",
    last_name: "",
    email: "",
    password: ""
  };

  pass_confir;

  login_user = {
    email: "",
    password: ""
  };
  bike;

  err_message = {
    email: "",
    login: ""
  };
  socket;

  create() {
    this._mainService.createUser(this.new_user, res => {
      console.log(res);
      if (res.message === "success") {
        this._router.navigate(["bike", "browse"]);
      } else {
        this.err_message.email = "The email has been registered!!";
      }
    });
    this.new_user = {
      first_name: "",
      last_name: "",
      email: "",
      password: ""
    };
    this.pass_confir = "";
  }
  login(form) {
    this._mainService.loginUser(this.login_user, res => {
      if (res.error == undefined) {
        this._router.navigate(["bike", "browse"]);
      } else {
        this.err_message.login = res.error;
      }
    });
    // form.reset();
    this.login_user = {
      email: "",
      password: ""
    };
  }
  constructor(private _mainService: MainService, private _router: Router) {}

  ngOnInit() {
    this._mainService.getAllBikes(res => {
      var index = Math.floor(Math.random() * res.length);
      this.bike = res[index];
    });
    this.socket = this._mainService.socket
    /////////////////////////////////////
    $(function() {

          $('#login-form-link').click(function(e) {
          $("#login-form").delay(100).fadeIn(100);
           $("#register-form").fadeOut(100);
          $('#register-form-link').removeClass('active');
          $(this).addClass('active');
          e.preventDefault();
        });
        $('#register-form-link').click(function(e) {
          $("#register-form").delay(100).fadeIn(100);
           $("#login-form").fadeOut(100);
          $('#login-form-link').removeClass('active');
          $(this).addClass('active');
          e.preventDefault();
        });

      });
  }
}
