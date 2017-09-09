import { Component } from '@angular/core';
import { IonicPage, LoadingController, AlertController, NavController, NavParams, ModalController, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Auth } from '../../../providers/auth';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-noutati-upt',
  templateUrl: 'noutati-upt.html',
})
export class NoutatiUpt {
  public items: Array<{ title: string, text: string, icon: string }>;
  public uptData: any; // parameters sends from tab page !
  public pozaUPT: any;
  public user: any;
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
    });
    this.items = [];
    this.newtext = localStorage.getItem('text');
    this.time = new Date().getDay() + "/" + new Date().getMonth() + "/" + new Date().getFullYear() + "  " + new Date().getHours() + ":" + new Date().getMinutes(); // current date will be replaced with date at eevery post
    this.user = localStorage.getItem('user')
    let loader = this.toastCtrl.create({
      message: "Loading...",
      position: 'middle',
      cssClass: 'toast'
    });
    loader.present();
    this.http.get(this.auth.server + '/statistici.php').map(res => res.json()).subscribe(data => {
      this.statistici = data;
    });
    this.http.get(this.auth.server + '/getdata.php?facultate=UPT&limit=150&offset=0').map(res => res.json()).subscribe(data => {
      this.posts = data;
      localStorage.removeItem('upt');
      loader.dismiss();
    });
  }

  doRefresh(refresher) {
    localStorage.removeItem('upt');
    this.http.get(this.auth.server + '/getdata.php?facultate=UPT&limit=150&offset=0').map(res => res.json()).subscribe(data => {
      this.posts = data;
    });
    setTimeout(() => {
      refresher.complete();
    }, 1500);
  }

  addNew() {
    let profileModall = this.modalCtrl.create('FacultHome', { idd: 1, facultate: 'UPT' });
    profileModall.present();
  }

  presentProfileModal(item) {
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
          this.http.get(this.auth.server + '/remove.php?delete=' + item).map(res => res.json()).subscribe(data => {
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
