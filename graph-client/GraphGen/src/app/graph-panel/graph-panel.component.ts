import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import * as go from 'gojs';

@Component({
  selector: 'app-graph-panel',
  templateUrl: './graph-panel.component.html',
  styleUrls: ['./graph-panel.component.css']
})
export class GraphPanelComponent implements OnInit {
  title = 'My First GoJS App in Angular';

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
  // model = new go.GraphLinksModel(
  //   [
  //     { key: 1, text: "Alpha", color: "lightblue", optionYes: "Respuesta Si", optionNo: "Respuesta No", character: "None", effectYes: [0,0,0,0], effectNo: [0,0,0,0]  },
  //     { key: 2, text: "Beta", color: "orange", optionYes: "Respuesta Si", optionNo: "Respuesta No", character: "None", effectYes: [0,0,0,0], effectNo: [0,0,0,0]  },
  //     { key: 3, text: "Gamma", color: "lightgreen", optionYes: "Respuesta Si", optionNo: "Respuesta No", character: "None", effectYes: [0,0,0,0], effectNo: [0,0,0,0]  },
  //     { key: 4, text: "Delta", color: "pink", optionYes: "Respuesta Si", optionNo: "Respuesta No", character: "None", effectYes: [0,0,0,0], effectNo: [0,0,0,0]  }
  //   ],
  //   [
  //     { from: 1, to: 2, type:"Si", color:"green" },
  //     { from: 1, to: 3, type:"No", color:"red" },
  //     { from: 2, to: 2, type:"Si", color:"green" },
  //     { from: 3, to: 4, type:"No", color:"red" },
  //     { from: 4, to: 1, type:"Si", color:"green" }
  //   ]);

  @ViewChild('text')
  private textField: ElementRef;

  data: any;
  dataLink: any;
  node: go.Node;
  link: go.Link;

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
    this.model = new go.GraphLinksModel(
      [
        { key: 1, text: "Alpha", color: "lightblue", optionYes: "Respuesta Si", optionNo: "Respuesta No", character: "None", effectYes: [0,0,0,0], effectNo: [0,0,0,0]  },
        { key: 2, text: "Beta", color: "orange", optionYes: "Respuesta Si", optionNo: "Respuesta No", character: "None", effectYes: [0,0,0,0], effectNo: [0,0,0,0]  },
        { key: 3, text: "Gamma", color: "lightgreen", optionYes: "Respuesta Si", optionNo: "Respuesta No", character: "None", effectYes: [0,0,0,0], effectNo: [0,0,0,0]  },
        { key: 4, text: "Delta", color: "pink", optionYes: "Respuesta Si", optionNo: "Respuesta No", character: "None", effectYes: [0,0,0,0], effectNo: [0,0,0,0]  }
      ],
      [
        { from: 1, to: 2, type:"Si", color:"green" },
        { from: 1, to: 3, type:"No", color:"red" },
        { from: 2, to: 2, type:"Si", color:"green" },
        { from: 3, to: 4, type:"No", color:"red" },
        { from: 4, to: 1, type:"Si", color:"green" }
      ]);
  }
}
