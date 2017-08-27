import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SuperTabsController } from 'ionic2-super-tabs';


@IonicPage()
@Component({
  templateUrl: 'about.html',
})
export class About {
  public descriereUpt: string = "DescriereUpt";
  public conducereUpt: string = 'ConducereUpt';
  public noutatiUpt: string = 'NoutatiUpt';
  constructor(public navCtrl: NavController,private superTabsCtrl: SuperTabsController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad About');
  }
   onTabSelect(ev: any) {
    console.log('Tab selected', 'Index: ' + ev.index, 'Unique ID: ' + ev.id);
  }
}
