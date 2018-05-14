import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { ResponseTemp } from '../models/response';

@Injectable()
export class LoginService {

  constructor(
    private http:HttpClient
  ) { }

  getToken(name:string, pass:string):Observable<string>{
    // Initialize Params Object
    let Params = new HttpParams();

    // Begin assigning parameters
    Params = Params.append('username', name);
    Params = Params.append('password', pass);

    // return this.http.get<ResponseTemp>("http://localhost:8080/getToken", { params : Params })
    // .map(res => {
    //   if(res.code == 0){
    //     return res.content.token;
    //   } else {
    //     return null;
    //   }
    // });

    //local testing
    if(name == "admin" && pass == "root"){
      return this.http.get<ResponseTemp>("assets/loginOk.json")
      .map(res => {
        return res.content.token;
      });
    } else {
      return this.http.get<ResponseTemp>("assets/loginError.json")
      .map(res => {
        return null;
      });
    }

  }

  validateToken(token:string):Observable<boolean>{
    // Initialize Params Object
    let Params = new HttpParams();

    // Begin assigning parameters
    Params = Params.append('token', token);

    // return this.http.get<ResponseTemp>("http://localhost:8080/validateToken", { params : Params })
    // .map(res => {
    //   if(code == 0){
    //     return true;
    //   } else {
    //     return false;
    //   }
    // });

    //Local testing
    return this.http.get<ResponseTemp>("assets/tokenOk.json")
    .map(res => {
      if(res.code == 0){
        console.log("Token Ok");
        return true;
      } else {
        console.log("Invalid Token")
        return false;
      }
    });

  }

}
