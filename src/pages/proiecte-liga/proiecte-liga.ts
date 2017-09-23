import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { DataTabs } from '../../providers/datatabs';

@IonicPage()
@Component({
  selector: 'page-proiecte-liga',
  templateUrl: 'proiecte-liga.html',
})
export class ProiecteLiga {
  public proiecte: any = [];
  constructor(public dataTabs: DataTabs) {
    this.proiecte = this.dataTabs.proiecte;
  }
}
