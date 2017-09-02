import { Component } from '@angular/core';
import { IonicPage, LoadingController, AlertController, NavController, NavParams, ModalController, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Auth } from '../../../providers/auth';


@IonicPage()
@Component({
  selector: 'page-noutati-upt',
  templateUrl: 'noutati-upt.html',
})
export class NoutatiUpt {
  public items: Array<{ title: string, text: string, icon: string }>;
  public uptData: any; // parameters sends from tab page !
  public pozaUPT: any;
  public user: any; // this will be a global variable for status of user
  public posts: any;
  public title: any;
  public text: any;
  public newtext: any;
  public time: any;
  public info: any = [];
  public statistici: any = [];
  public limit: number = 15;
  public offset: number = 0;
  constructor(public alertCtrl: AlertController, private toastCtrl: ToastController, public auth: Auth, public loadingCtrl: LoadingController, public http: Http, public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
    this.auth.login().then((isLoggedIn) => {
      this.info = isLoggedIn;
      console.log(isLoggedIn)
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
    this.http.get('http://193.226.9.153/statistici.php').map(res => res.json()).subscribe(data => {
      this.statistici = data;
      console.log(this.statistici)
    });
    this.http.get('http://193.226.9.153/getdata.php?facultate=UPT&limit=150&offset=0').map(res => res.json()).subscribe(data => {
      this.posts = data;
      localStorage.removeItem('upt');
      loader.dismiss();
    });
  }

  doRefresh(refresher) {
    localStorage.removeItem('upt');
    this.http.get('http://193.226.9.153/getdata.php?facultate=UPT&limit=150&offset=0').map(res => res.json()).subscribe(data => {
      this.posts = data;
    });
    setTimeout(() => {
      refresher.complete();
    }, 1500);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NoutatiUpt');
  }

  addNew() {
    let profileModall = this.modalCtrl.create('FacultHome', { idd: 1, facultate: 'UPT' });
    profileModall.present();
  }

  presentProfileModal(item) {
    console.log(item)
    let profileModal = this.modalCtrl.create('FacultHome', { id: item });
    profileModal.present();
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
            this.posts = data;
          });
        }
      }]
    });
    confirm.present();
  }
  showContent(item) {
    this.modalCtrl.create('ShowContent', { item: item }).present();
  }
}
