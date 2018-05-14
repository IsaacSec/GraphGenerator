import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { ResponseTemp } from '../models/response';
import { Graph } from '../models/graph';

@Injectable()
export class EditorService {

  constructor(
    private http:HttpClient
  ) { }

  getGraph(version:number):Observable<Graph>{
    // Initialize Params Object
    let Params = new HttpParams();

    // Begin assigning parameters
    Params = Params.append('version', ""+version);

    // return this.http.get<ResponseTemp>("http://localhost:8080/getGraph", { params: Params })
    // .map(res => {
    //   if(res.code == 0){
    //     return new Graph(
    //       res.content._id,
    //       res.content.version,
    //       res.content.identifier,
    //       res.content.visualGraph
    //     );
    //   } else {
    //     return null;
    //   }
    // });

    return this.http.get<ResponseTemp>("assets/getGraph.json", { params: Params })
    .map(res => {
      if(res.code == 0){
          return new Graph(
            res.content._id,
            res.content.version,
            res.content.identifier,
            res.content.visualGraph
          );

      } else {
        return null;
      }
    });
  }

  saveGraph(version:number, identifier:string, content:any):Observable<boolean>{
    return this.http.post<ResponseTemp>(
      "http://localhost:8080/saveGraph",
      {
        "version": version,
        "identifier": identifier,
        "content": content
      }).map(res => {
        if(code == 0){
          return true;
        } else {
          return false;
        }
      }, err => {
        console.log("Error Ocurred");
      }
    );

  }

}
