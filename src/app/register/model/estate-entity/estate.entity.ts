import {EstateImg} from "../estate-img-entity/estate-img.entity";

export class Estate {
  Id?: number;
  title: string;
  owner: string;
  status: string;
  location: string;
  yearBuilt: string;
  description: string;
  currency: string;
  price: string;
  //thumbnail: string;
  type: string;
  size:string;
  bedrooms:number;
  bathrooms:number;
  garageSpace:number;
  image: EstateImg;

  constructor() {
    this.title = "";
    this.owner = "";
    this.status = "";
    this.location = "";
    this.yearBuilt = "";
    this.description = "";
    this.currency = "";
    this.price = "";
    //this.thumbnail = "";
    this.type= "";
    this.size="";
    this.bedrooms=0;
    this.bathrooms=0;
    this.garageSpace=0;
    this.image = new EstateImg();
  }
}
