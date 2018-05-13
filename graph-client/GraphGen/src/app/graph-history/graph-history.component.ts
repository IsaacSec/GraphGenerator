import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { GoElement } from '../models/go-element';

import { GoHistoryService } from '../services/go-history.service';

@Component({
  selector: 'app-graph-history',
  templateUrl: './graph-history.component.html',
  styleUrls: ['./graph-history.component.css']
})
export class GraphHistoryComponent implements OnInit {


  graphList$:GoElement[];

  constructor(
    private router:Router,
    private historyl:GoHistoryService
  ) { }

  ngOnInit() {
    if(localStorage.getItem("userToken") == null){
      this.router.navigate(['login']);
    } else {
      this.historyl.getGraphHistory().subscribe((res) => {
        this.graphList$ = res;
        console.log(res);
      });
    }
  }

  doLogout(){
    localStorage.removeItem("userToken");
    this.router.navigate(['login']);
  }

}
