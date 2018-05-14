import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { GoElement } from '../models/go-element';

import { GoHistoryService } from '../services/go-history.service';
import { LoginService } from "../services/login.service";

import { MdlDefaultTableModel, IMdlTableModelItem } from '@angular-mdl/core';

@Component({
  selector: 'app-graph-history',
  templateUrl: './graph-history.component.html',
  styleUrls: ['./graph-history.component.css']
})
export class GraphHistoryComponent implements OnInit {

  tableData: IMdlTableModelItem[];
  graphList$:GoElement[];


  public tableModel = new MdlDefaultTableModel([
    {key: 'version', name: 'Version'},
    {key: 'identifier', name: 'Identifier'},
    {key: 'link', name: 'Edit'}
  ]);

  constructor(
    private router:Router,
    private historyl:GoHistoryService,
    private loginService:LoginService
  ) { }

  ngOnInit() {
    if(localStorage.getItem("userToken") == null){
      this.router.navigate(['login']);
    } else {
      this.loginService.validateToken(localStorage.getItem("userToken"))
      .subscribe(res =>{
        if(res){
          this.historyl.getGraphHistory().subscribe((res) => {
            this.graphList$ = res;
            this.tableData = this.getTableData();
            this.tableModel.addAll(this.tableData);
            console.log(res);
          });
        } else {
          localStorage.removeItem("userToken");
          this.router.navigate(['login']);
        }
      })

    }
  }

  doLogout(){
    localStorage.removeItem("userToken");
    this.router.navigate(['login']);
  }

  getTableData(){
    var data = [];

    for (let i of this.graphList$) {
      const row = {
        'version': i.version,
        'identifier': i.detail,
        'link': '<a href="./graphEdit?id=' + i.id + '"><mdl-icon>edit</mdl-icon></a>'
      };
      data.push(row);
    }

    return data;
}

}
