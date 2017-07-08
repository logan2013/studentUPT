import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataTabs } from '../../providers/datatabs';

/**
 * Generated class for the OrarFacultate page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-orar-facultate',
  templateUrl: 'orar-facultate.html',
})
export class OrarFacultate {
  public orar: any = [];
  constructor(public dataTabs: DataTabs,  public navCtrl: NavController, public navParams: NavParams) {
    this.orar = this.dataTabs.orar;
    console.log(this.orar)
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrarFacultate');
  }

}
