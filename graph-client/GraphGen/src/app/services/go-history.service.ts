import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';

import { HttpClient } from '@angular/common/http';

import { ResponseTemp } from '../models/response';
import { GoElement } from '../models/go-element';

@Injectable()
export class GoHistoryService {

  constructor(private http:HttpClient) { }

  getGraphHistory():Observable<GoElement[]>{

    // return this.http.get<ResponseTemp>("http://localhost:8080/getGraphList")
    //   .map(res => {
    //       if(res.code == 0 && res.content.length != 0){
    //       return res.content.map(item => {
    //         return new GoElement(
    //             item.version,
    //             item.identifier
    //         );
    //       });
    //     } else {
    //       //throw error
    //
    //       return null;
    //     }
    //
    //   });

    //return this.http.get("./api/history.json");
    return this.http.get<ResponseTemp>("assets/history.json")
      .map(res => {
          if(res.code == 0){
          return res.content.map(item => {
            return new GoElement(
                item.version,
                item.identifier
            );
          });
        } else {
          //throw error
          return null;
        }

      });

  }


}
