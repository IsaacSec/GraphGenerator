export class Graph {
  _id : string;
  version : number;
  identifier: string;
  visualGraph: any;
  // visualGraph: {
  //   class: string,
  //   nodeDataArray: any[],
  //   linkDataArray: any[],
  //   decisionGraph: any[]
  // };

  constructor(_id:string, version:number, identifier: string, visualGraph:any){
    this._id = _id;
    this.version = version;
    this.identifier = identifier;
    this.visualGraph = visualGraph;
  }



}
