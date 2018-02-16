import { Component, NgZone } from '@angular/core';
import { IonicPage, LoadingController, AlertController, NavController, NavParams, ModalController, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Auth } from '../../../providers/auth';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase';
@IonicPage()
@Component({
  selector: 'page-noutati-upt',
  templateUrl: 'noutati-upt.html',
})
export class NoutatiUpt {
  public url: any;
  public firestore = firebase.storage();
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
  public titlee: string[] = [];
  public content: string[] = [];
  public imageLink: string[] = [];
  public typeOfPagee: number[] = []; // 1 - list page or 2 -content page
  public showContenttt: any = true;
  public itemss: Array<{ title: string, content: string, imageLink: string, typeOfPage: number, statistici: any }> = [];
  constructor(
    public zone: NgZone,
    public alertCtrl: AlertController, private toastCtrl: ToastController, public auth: Auth, public loadingCtrl: LoadingController, public http: Http, public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
    this.auth.login().then((isLoggedIn) => {
      this.info = isLoggedIn;
    });
    this.titlee = ['Statistici pentru admitere '];
    this.content = [`O reprezentare grafica a numarului de studenti inscrisi la fiecare facultate`,
    ];
    this.imageLink = ['http://study.com/cimages/course-image/statistics-for-teachers-professional-development_137460_large.jpg'];
    this.items = [];
    this.newtext = localStorage.getItem('text');
    this.time = new Date().getDay() + "/" + new Date().getMonth() + "/" + new Date().getFullYear() + "  " + new Date().getHours() + ":" + new Date().getMinutes(); // current date will be replaced with date at eevery post
    this.user = localStorage.getItem('user')
    let loader = this.toastCtrl.create({
      message: "Loading...",
      position: 'middle',
      cssClass: 'toast'
    });
    // loader.present();
    this.http.get(this.auth.server + '/statistici.php').map(res => res.json()).subscribe(data => {
      this.statistici = data;
    });
    this.typeOfPagee = [1];

    this.http.get('http://193.226.9.153/statistici.php').map(res => res.json()).subscribe(data => {
      this.items = [];
      for (let i = 0; i < this.titlee.length; i++) {
        this.itemss.push({
          title: this.titlee[i],
          content: this.content[i],
          imageLink: this.imageLink[i],
          typeOfPage: this.typeOfPagee[i],
          statistici: data
        });
      }
    });

    this.http.get(this.auth.server + '/getdata.php?facultate=UPT&limit=150&offset=0').map(res => res.json()).toPromise().then(data => {
      this.posts = data;
      if (this.posts !== null) {
        for (let i = 0; i < this.posts.length; i++) {
          if (this.posts[i].icon) {
            this.firestore.ref().child(this.posts[i].icon).getDownloadURL().then((url) => {
              this.zone.run(() => {
                this.posts[i].url = url;
              })
            }).catch(err => {
              console.log(err);
            })
          }
        }
      }
      localStorage.removeItem('upt');
      //  loader.dismiss();
      setTimeout(() => this.showContenttt = false, 200);
    }).catch((err) => {
      console.log(err, '/getdata.php?facultate=UPT&limit=150&offset=0')
    });
  }

  doRefresh(refresher) {
    localStorage.removeItem('upt');
    this.http.get(this.auth.server + '/getdata.php?facultate=UPT&limit=150&offset=0').map(res => res.json()).toPromise().then((data) => {
      this.posts = data;
      if (this.posts !== null) {
        for (let i = 0; i < this.posts.length; i++) {
          if (this.posts[i].icon) {
            this.firestore.ref().child(this.posts[i].icon).getDownloadURL().then((url) => {
              this.zone.run(() => {
                this.posts[i].url = url;
              })
            })
          }
        }
      }
    }).catch((err) => console.log(err, '/getdata.php?facultate=UPT&limit=150&offset=0'));
    setTimeout(() => {
      refresher.complete();
    }, 1500);
  }

  addNew() {
    // this.navCtrl.push('FacultHome', { idd: 1, facultate: 'UPT' });
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
          this.http.get(this.auth.server + '/remove.php?delete=' + item + '&token=' + localStorage.getItem('token')).map(res => res.json()).subscribe(data => {
            this.posts = data;
          });
        }
      }]
    });
    confirm.present();
  }

  showContent(item) {
    this.modalCtrl.create('ShowContent', { item: item, icon: item.url }).present();
  }

  showContentChart(item) {
    this.modalCtrl.create('ShowChart', { item: item[0].statistici[0].chart }).present();
  }
}
