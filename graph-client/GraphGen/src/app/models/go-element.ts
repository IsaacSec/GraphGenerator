export class GoElement {

  version: number;
  id: string;
  detail: string;

  constructor(version:number, id:string, detail:string){
    this.id = id;
    this.version = version;
    this.detail = detail;
  }

}
