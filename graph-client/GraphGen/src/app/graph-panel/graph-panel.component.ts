import { Component, ViewChild, ElementRef, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as go from 'gojs';

import { EditorService } from '../services/editor.service';
import { LoginService } from "../services/login.service";

import { Graph } from '../models/graph';

@Component({
  selector: 'app-graph-panel',
  templateUrl: './graph-panel.component.html',
  styleUrls: ['./graph-panel.component.css']
})
export class GraphPanelComponent implements OnInit {
  //Detail
  @Input()
  graphTitle:string = "";

  graphToLoad$:Graph = null;

  id:string = null;

  color_scheme = [
    {value: "white", name:"Blanco"},
    {value: "lime", name:"Verde Lima"},
    {value: "cyan", name:"Cían"},
    {value: "orange", name:"Naranja"},
    {value: "yellow", name:"Amarillo"},
    {value: "pink", name:"Rosa"},
    {value: "lightblue", name:"Azul Claro"},
    {value: "lightgreen", name:"Verde Claro"},
    {value: "lightgray", name:"Gris Claro"}
  ];

  link_types = [
    {value: 1, text:"Si" },
    {value: 2, text:"No" }
  ];


  model = null;


  @ViewChild('text')
  private textField: ElementRef;

  data: any;
  dataLink: any;
  node: go.Node;
  link: go.Link;

  constructor(
    private aRoute: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    private editorService: EditorService
  ){
    if(localStorage.getItem("userToken") == null){
      this.router.navigate(['login']);
    }
    this.aRoute.queryParams.subscribe(params => {
         this.id = params['id'];
    }).unsubscribe();
  }

  showDetails(node: go.Node | null) {
    this.node = node;
    if (node) {
      // copy the editable properties into a separate Object
      this.data = {
        text: node.data.text,
        color: node.data.color,
        optionYes: node.data.optionYes,
        optionNo: node.data.optionNo,
        character: node.data.character,
        effectYes: node.data.effectYes,
        effectNo: node.data.effectNo
      };
    } else {
      this.data = null;
    }
  }

  showLinkDetails(link: go.Link | null){
    this.link = link;
    if (link) {
      this.dataLink = {
        from : link.data.from,
        to : link.data.to,
        type : link.data.type,
        color : link.data.color
      };
    } else {
      this.dataLink = null;
    }
  }

  onCommitDetails() {
    if (this.node) {
      const model = this.node.diagram.model;
      // copy the edited properties back into the node's model data,
      // all within a transaction
      model.startTransaction();
      model.setDataProperty(this.node.data, "text", this.data.text);
      model.setDataProperty(this.node.data, "color", this.data.color);
      model.setDataProperty(this.node.data, "optionYes", this.data.optionYes);
      model.setDataProperty(this.node.data, "optionNo", this.data.optionNo);
      model.setDataProperty(this.node.data, "character", this.data.character);
      model.setDataProperty(this.node.data, "effectYes", this.data.effectYes);
      model.setDataProperty(this.node.data, "effectNo", this.data.effectNo);
      model.commitTransaction("modified properties");
    }
  }

  onCommitLinkDetails() {
    if (this.link) {
      const model = this.link.diagram.model;
      // copy the edited properties back into the node's model data,
      // all within a transaction
      model.startTransaction();

      if(this.dataLink.type == "Si"){
        this.dataLink.color = "green";
      } else {
        this.dataLink.color = "red";
      }

      model.setDataProperty(this.link.data, "type", this.dataLink.type);
      model.setDataProperty(this.link.data, "color", this.dataLink.color);

      model.commitTransaction("modified properties");
    }
  }

  onCancelChanges() {
    // wipe out anything the user may have entered
    this.showDetails(this.node);
  }

  onCancelLinkChanges() {
    // wipe out anything the user may have entered
    this.showLinkDetails(this.link);
  }

  onModelChanged(c: go.ChangedEvent) {
    // who knows what might have changed in the selected node and data?
    this.showDetails(this.node);
    //this.node = null;
    //this.link = null;
    this.showLinkDetails(this.link);
  }

  ngOnInit(){
    //this.id = this.aRoute.snapshot.paramMap.get('id');
      console.log(this.id);
      this.model = new go.GraphLinksModel(
        [

        ],
        [

        ]);

      this.graphTitle = "Nueva Gráfica";
      if(this.id != null){
        this.loginService.validateToken(localStorage.getItem("userToken"))
        .subscribe(res => {
          if(res){
            this.loadGraph();
          } else {
            localStorage.removeItem("userToken");
            this.router.navigate(['login']);
          }
        });
      } else {
        this.id = 0;
      }
    }

    loadGraph():void{
      this.editorService.getGraph(Number(this.id)).subscribe(res =>{
        if(res != null){
          this.graphToLoad$ = res;
          this.model = new go.GraphLinksModel(
            this.graphToLoad$.visualGraph.nodeDataArray,
            this.graphToLoad$.visualGraph.linkDataArray
          );
          this.graphTitle = this.graphToLoad$.identifier;
          this.id = ""+this.graphToLoad$.version;
        } else {
          console.log("Graph not found?");
        }
      });
    }

    exportModel(){
      if(this.graphTitle !== undefined && this.graphTitle != ""){
        console.log(this.model.toJson());
        console.log(this.id);
        console.log(this.graphTitle);
        // this.editorService.saveGraph(Number(this.id), this.graphTitle, this.model.toJson())
        // .subscribe(res => {
        //   if(res){
        //     console.log("Save ok");
        //     this.router.navigate(['history']);
        //   } else {
        //     console.log("Save error");
        //   }
        // })
      } else {
        console.log("Campo de titulo vacio");
      }
    }

}
