import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ViewController, Events } from 'ionic-angular';
import { Auth } from '../../providers/auth';

/**
 * Generated class for the ShowContent page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-show-content',
  templateUrl: 'show-content.html',
})
export class ShowContent {
  public item: any = [];
  constructor(private auth: Auth, private events: Events, private app: App, public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.item = navParams.get('item');
    this.auth.modal = true;
    
    this.events.subscribe('page:back', () => {
        this.auth.modal = false;
        this.navCtrl.pop().catch((e) => {
          console.log(e)
        })
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowContent');
  }

  goBack() {
    this.viewCtrl.dismiss();
    this.auth.modal = false;
    // this.navCtrl.pop();
    // this.app.getRootNav().setRoot('Facultati', {animate: true, direction: 'forward'});

  }

}
