import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Events } from 'ionic-angular';
import { Auth } from '../../providers/auth';

@IonicPage()
@Component({
  selector: 'page-show-content',
  templateUrl: 'show-content.html',
})
export class ShowContent {
  public item: any = [];
  constructor(
    private auth: Auth,
    private events: Events,
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController) {

    this.item = navParams.get('item');
    this.item.content =  this.item.content ;
    console.log(this.item)
    this.auth.modal = true;
    this.events.subscribe('page:back', () => {
      this.auth.modal = false;
      this.navCtrl.pop().catch((e) => { })
    });

  }

  goBack() {
    this.viewCtrl.dismiss();
    this.auth.modal = false;
  }

}
