import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the Googlepopover page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-googlepopover',
  templateUrl: 'googlepopover.html',
})
export class Googlepopover {
  public place : any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(navParams.get('place'))
    this.place = navParams.get('place')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Googlepopover');
  }

  public showUrl() {
    alert(this.place.website)
  }
}
