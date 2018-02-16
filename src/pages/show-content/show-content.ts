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
  public cssProperties: any = {
    'white-space': 'pre-line',
    'background': '#fff',
    'position': 'relative',
    'border': '1px solid #fff',
    'font-size': '1.4rem',
    'line-height': '1.6',
    'text-align': 'justify'
  };
  private lastPWEditor: Date = new Date(2017, 12, 15); // last post without editor
  constructor(
    private auth: Auth,
    private events: Events,
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController) {

    this.item = navParams.get('item');
    this.item.content = this.item.content;

    let myData: any = [];
    try {
      myData = this.item.data.substr(0, 10).split('/');
      if (new Date(myData[0], myData[1], myData[2]) > this.lastPWEditor) {
        this.cssProperties = {
          'background': '#fff',
          'position': 'relative',
          'border': '1px solid #fff',
          'font-size': '1.4rem',
          'line-height': '1.6',
          'text-align': 'justify'
        };
      }
    } catch(err) {}

    try {
      this.item.text = decodeURIComponent(this.item.text);
      this.item.content = decodeURIComponent(this.item.content);
    }
    catch (e) {
      console.log(e)
    }

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
