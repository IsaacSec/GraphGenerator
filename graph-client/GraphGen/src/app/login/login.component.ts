import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from "../services/login.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  notification:string = null;

  @Input()
  userName:string;

  @Input()
  userPassword:string;

  constructor(
    private router:Router,
    private loginService:LoginService
  ) { }

  ngOnInit() {
    if(localStorage.getItem("userToken") != null){
      this.router.navigate(['history']);
    }

  }

  doLogin(){
    
    if((this.userName !== undefined && this.userName != "") && (this.userPassword !== undefined && this.userPassword != "")){
    this.loginService.getToken(this.userName, this.userPassword).subscribe(res => {
      if(res != null){
        localStorage.setItem("userToken", res);
        this.router.navigate(['history']);
      } else {
        this.notification = "ERROR: Credenciales invalidas.";
        console.log(this.notification);
      }

    });
    } else {
      this.notification = "Algún campo está vacio";
      console.log("Campos vacios");
    }

  }

}
