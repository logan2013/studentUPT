import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataTabs } from '../../providers/datatabs';


/**
 * Generated class for the ProiecteLiga page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-proiecte-liga',
  templateUrl: 'proiecte-liga.html',
})
export class ProiecteLiga {
  public proiecte: any = [];
  constructor(public navCtrl: NavController, public dataTabs: DataTabs, public navParams: NavParams) {
        this.proiecte = this.dataTabs.proiecte;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProiecteLiga');
  }

}
