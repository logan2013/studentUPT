import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { DataTabs } from '../../../providers/datatabs';

@IonicPage()
@Component({
  selector: 'page-descriere-facultate',
  templateUrl: 'descriere-facultate.html',
})
export class DescriereFacultate {
  public descriere: any = [];
  public conducere: any = [];
  public proiecte: any = [];
  constructor(public dataTabs: DataTabs) {
    this.descriere = this.dataTabs.descriere;
    this.conducere = this.dataTabs.conducere;
    this.proiecte = this.dataTabs.proiecte;
  }

  toggle(nume) {
    for (let i: number = 0; i < this.conducere.length; i++) {
      if (this.conducere[i].nume == nume) {
        this.conducere[i].show = !this.conducere[i].show;
      }
    }
  }
}
