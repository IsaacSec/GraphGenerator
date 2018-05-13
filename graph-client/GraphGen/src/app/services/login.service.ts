import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { ResponseTemp } from '../models/response';

@Injectable()
export class LoginService {

  constructor() { }

  // doLogin(name:string, pass:string):Observable<ResponseTemp>{
  //   // Initialize Params Object
  //   let Params = new HttpParams();
  //
  //   // Begin assigning parameters
  //   Params = Params.append('un', name);
  //   Params = Params.append('pass', pass);
  //
  //   return this.http.get<ResponseTemp>("http://localhost:8080/login", { params : Params });
  //
  // }

  checkCredentials(){

  }

  doLogout(){

  }

}
