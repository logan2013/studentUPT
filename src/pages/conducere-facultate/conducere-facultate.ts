import { Component } from '@angular/core';
import { DataTabs } from '../../providers/datatabs';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ConducereFacultate page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConducereFacultate');
  }

 toggle(nume) {
    for (let i: number = 0; i < this.conducere.length; i++) {
      if (this.conducere[i].nume == nume) {
        console.log('ss')
        this.conducere[i].show = !this.conducere[i].show;
      }
    }
  }
}
