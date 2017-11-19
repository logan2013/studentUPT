import { Component, NgZone,ViewChild } from '@angular/core';
import { IonicPage, Content,ScrollEvent, AlertController, ModalController, ToastController, Events, } from 'ionic-angular';
import { Http } from '@angular/http';
import { DataTabs } from '../../../providers/datatabs';
import { Auth } from '../../../providers/auth';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-viewpage',
  templateUrl: 'viewpage.html',
})
export class Viewpage {
  public showSpinner: boolean = true;
  public url: any;
  public firestore = firebase.storage();
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
    public zone: NgZone,
    public events: Events,
    public dataTabs: DataTabs,
    public alertCtrl: AlertController,
    public http: Http,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public auth: Auth) {
    this.auth.login().then((isLoggedIn) => {
      this.info = isLoggedIn;
    });
    this.items = [];
    this.newtext = localStorage.getItem('text');// ??
    this.user = localStorage.getItem('user') //user
    let loader = this.toastCtrl.create({
      message: "Loading...",
      position: 'middle',
      cssClass: 'toast'
    });
    loader.present();
    this.http.get('http://193.226.9.153/getdata.php?facultate=' + this.dataTabs.message.note + '&limit=50&offset=0').map(res => res.json()).subscribe(data => {
      console.log(data)
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
      localStorage.removeItem('upt');
      // setTimeout(() => {
        loader.dismiss();
      // }, 500);
     
    });

  }


  doRefresh(refresher) {
    this.showSpinner = false;
    
    localStorage.removeItem('upt');
    this.http.get('http://193.226.9.153/getdata.php?facultate=' + this.dataTabs.message.note + '&limit=50&offset=0').map(res => res.json()).subscribe(data => {
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
    });

    setTimeout(() => {
      refresher.complete();
    }, 200);

  }

  ionViewDidLoad() { }

  presentProfileModal(item) {
    let profileModal = this.modalCtrl.create('FacultHome', { id: item });
    profileModal.present();
  }


  addNew() {
    let profileModall = this.modalCtrl.create('FacultHome', { idd: 1, facultate: this.dataTabs.message.note });
    profileModall.present();
  }

  doInfinite(infiniteScroll) {
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
          this.http.get('http://193.226.9.153/remove.php?delete=' + item + '&token='+localStorage.getItem('token')).map(res => res.json()).subscribe(data => {
          });
        }
      }]
    });
    confirm.present();
  }

  showContent(item) {
    this.modalCtrl.create('ShowContent', { item: item }).present().then(() => {
      console.log(item)
      this.auth.modal = true;
    })
  }
  scrolll(ev) {
    console.log(ev)
  }
}
