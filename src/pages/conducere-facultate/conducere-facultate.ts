import { Component } from '@angular/core';
import { DataTabs } from '../../providers/datatabs';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-conducere-facultate',
  templateUrl: 'conducere-facultate.html',
})
export class ConducereFacultate {
  public conducere: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public dataTabs: DataTabs,) {
    this.conducere = this.dataTabs.conducere;
}

  ionViewDidLoad() {  }

 toggle(nume) {
    for (let i: number = 0; i < this.conducere.length; i++) {
      if (this.conducere[i].nume == nume) {
        this.conducere[i].show = !this.conducere[i].show;
      }
    }
  }
}
