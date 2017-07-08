import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class DataTabs {

  public message: any = [];
  public conducere: any = [];
  public descriere: any = [];
  public orar: any = [];
  constructor() { }

  setMessage(message) {
    this.message = message;
  }

  setCoducere(conducere) {
    this.conducere = conducere;
  }

  setDescriere(descriere) {
    this.descriere = descriere;
  }

  setOrar(orar) {
    this.orar = orar;
  }


}