import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataTabs } from '../../providers/datatabs';

/**
 * Generated class for the DescriereFacultate page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-descriere-facultate',
  templateUrl: 'descriere-facultate.html',
})
export class DescriereFacultate {
  public descriere: any = [];
  public conducere: any = [];
  public proiecte: any = [];
  constructor(public navCtrl: NavController, public dataTabs: DataTabs, public navParams: NavParams) {
    this.descriere = this.dataTabs.descriere;
    this.conducere = this.dataTabs.conducere;
    this.proiecte = this.dataTabs.proiecte;
    console.log(this.descriere)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DescriereFacultate');
  }

}
