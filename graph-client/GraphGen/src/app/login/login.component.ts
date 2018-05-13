import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Input()
  userName:string;

  @Input()
  userPassword:string;

  constructor(
    private router:Router
  ) { }

  ngOnInit() {
    if(localStorage.getItem("userToken") != null){
      this.router.navigate(['history']);
    }
  }

  doLogin(){


    //findUser()
    if(this.userName == "root" && this.userPassword=="root"){
      console.log("login OK");

      localStorage.setItem("userToken", "1234567890'0987654321");

      this.router.navigate(['history']);
    } else {
      console.log("credentials are not ok");
    }
  }

}
