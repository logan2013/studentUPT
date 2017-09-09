import { Component } from '@angular/core';
import { IonicPage, AlertController, ModalController, NavController, NavParams, LoadingController, ToastController, Events, App } from 'ionic-angular';
import { Http } from '@angular/http';
import { DataTabs } from '../../../providers/datatabs';
import { Auth } from '../../../providers/auth';
import 'rxjs/add/operator/map';
/**
 * Generated class for the Viewpage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-viewpage',
  templateUrl: 'viewpage.html',
})
export class Viewpage {
  public uptData: any; // parameters sends from tab page !
  public pozaUPT: any;
  public user: any; // this will be a global variable for status of user
  public posts: any;
  public title: any;
  public text: any;
  public newtext: any;
  public time: any;
  public info: any = []; // data user recieve from provider
  public items: Array<{ title: string, text: string, icon: string }>;
  public limit: number = 50;
  public offset: number = 0;
  constructor(
    private app: App,
    private events: Events,
    public dataTabs: DataTabs,
    public alertCtrl: AlertController,
    public http: Http,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: Auth,
    public loadingCtrl: LoadingController) {

    this.auth.login().then((isLoggedIn) => {
      this.info = isLoggedIn;
      console.log(isLoggedIn)
      console.log(this.info, this.dataTabs.message.note)
    });
    this.items = [];
    this.newtext = localStorage.getItem('text');// ??
    this.time = new Date().getDay() + "/" + new Date().getMonth() + "/" + new Date().getFullYear() + "  " + new Date().getHours() + ":" + new Date().getMinutes(); // current date will be replaced with date at eevery post
    this.user = localStorage.getItem('user') //user
    let loader = this.toastCtrl.create({
      message: "Loading...",
      position: 'middle',
      cssClass: 'toast'
    });
    loader.present();
    this.http.get('http://193.226.9.153/getdata.php?facultate=' + this.dataTabs.message.note + '&limit=50&offset=0').map(res => res.json()).subscribe(data => {
      this.posts = data;
      console.log(data)
      localStorage.removeItem('upt');
      loader.dismiss();
    });
  }


  doRefresh(refresher) {
    localStorage.removeItem('upt');
    this.http.get('http://193.226.9.153/getdata.php?facultate=' + this.dataTabs.message.note + '&limit=50&offset=0').map(res => res.json()).subscribe(data => {
      this.posts = data;
    });

    setTimeout(() => {
      refresher.complete();
    }, 500);

  }

  ionViewDidLoad() { }

  presentProfileModal(item) {
    console.log(item)
    let profileModal = this.modalCtrl.create('FacultHome', { id: item });
    profileModal.present();
  }


  addNew() {
    let profileModall = this.modalCtrl.create('FacultHome', { idd: 1, facultate: this.dataTabs.message.note });
    profileModall.present();
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    this.offset += this.limit;
    this.limit += 15;
    this.http.get('http://193.226.9.153/getdata.php?facultate=' + this.dataTabs.message.note + '&limit=' + this.limit + '&offset=' + this.offset).map(res => res.json()).subscribe(data => {
      if (data !== null) {
        for (let i = 0; i < data.length; i++) {
          this.posts.push(data[i]);
        }
      } else {
        this.limit -= 15;
        this.offset = this.limit;
        infiniteScroll.enable(false);
      }
      console.log(this.posts)
      console.log('Async operation has ended');
    });
    infiniteScroll.complete();

  }

  deleteProfil(item) {
    let confirm = this.alertCtrl.create({
      title: 'Do you want to delete this item?',
      message: 'If item is deleted it can t be restored',
      buttons: [{
        text: 'Disagree',
        handler: () => {
          console.log('Disagree clicked');
        }
      }, {
        text: 'Agree',
        handler: () => {
          this.http.get('http://193.226.9.153/remove.php?delete=' + item).map(res => res.json()).subscribe(data => {
          });
        }
      }]
    });
    confirm.present();
  }

  showContent(item) {
    // this.app.getRootNav().setRoot('ShowContent', { item: item }, {animate: true, direction: 'forward'});
    // this.events.publish('page:news', item);
    this.modalCtrl.create('ShowContent', { item: item }).present().then(() => {
      this.auth.modal = true;
    })
   // this.navCtrl.push('ShowContent', { item: item });
  }

}
