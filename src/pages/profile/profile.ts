import { Component } from '@angular/core';
import { IonicPage, Events, NavController, NavParams, Platform, AlertController, Nav, ToastController, LoadingController, ModalController, App, MenuController, AlertOptions } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Auth } from '../../providers/auth';
import { AppMinimize } from '@ionic-native/app-minimize';
import { Network } from '@ionic-native/network';
import 'rxjs/add/operator/map';

export interface Slide {
  title: string;
  description: string;
  image: string;
}

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class Profile {
  public photo: string = localStorage.getItem("photo");
  loading: any;
  slides: Slide[];
  showSkip = true;
  showContent: boolean = false;
  activeuser: boolean = false;
  public user: string = localStorage.getItem("user");
  public alert: any = false;
  public showSpinner: boolean = true;
  public myForm: any;
  public show: any = false;
  public userData: any = [];
  public rootOrar: any = 'OrarStudentPage';
  public rootNote: any = 'NotePage';
  public rootSetari: any = 'SetariPage';
  public userSet: any = [];
  public userKey: any = [];
  //modal
  expanded: any;
  contracted: any;
  showIcon = true;
  preload = true;

  constructor(
    private appMinimize: AppMinimize,
    private alertCtrl: AlertController,
    private network: Network,
    private menuCtrl: MenuController,
    private app: App,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public navParams: NavParams,
    public platform: Platform,
    public nav: Nav,
    public auth: Auth,
    public events: Events,
    public http: Http,
    public formBuilder: FormBuilder) {

    this.events.subscribe("updatePhoto", (photo) => {
      this.photo = photo;
    });

    try {
      this.userSet = localStorage.getItem("dataUser");
      this.userKey = Object.keys(JSON.parse(this.userSet));
    }
    catch (r) { }
    if (this.user == null || this.user == "user") {
      if (localStorage.getItem('slide') == null) {
        this.showContent = true;
        this.activeuser = false;
      } else if (localStorage.getItem('slide') == 'true') {
        this.navCtrl.setRoot('About', {
          animation: true,
          direction: "forward"
        });
      }
    } else {
      this.showContent = true;
      this.activeuser = true;
    }

    setTimeout(() => {
      this.showSpinner = false;
    }, 300);

    this.events.subscribe('user:logout', () => {
      let loader = this.toastCtrl.create({
        message: 'Logout successfuly',
        duration: 1000,
        position: 'top'
      });
      loader.present();
      localStorage.removeItem('slide')
      localStorage.removeItem('user');
      localStorage.removeItem("dataUser");
      localStorage.clear();
      this.menuCtrl.enable(false);
      this.menuCtrl.close();
      this.app.getRootNav().setRoot('Login');
    });

    this.auth.login().then((isLoggedIn) => {
      this.userData = isLoggedIn;
    });

    this.myForm = this.formBuilder.group({
      curentpass: [''],
      pass: [''],
      repetpass: ['']
    });

    this.platform.ready().then(() => {
      this.menuCtrl.enable(true);
      var lastTimeBackPress = 0;

      var timePeriodToExit = 2000;

      this.platform.registerBackButtonAction(() => {
        let name: string = '' + document.location;
        var n = name.lastIndexOf('/');
        var result = name.substring(n + 1);
        if (this.auth.modal == false) {
          if (this.nav.canGoBack()) {
            this.nav.pop({});
            this.navCtrl.pop();
          } else {
            if (this.alert) {
            } else {
              this.alert = true;
              this.menuCtrl.open()
              this.showAlert();
            }
          }
        } else {
          this.events.publish('page:back');
        }
      });
    });
  }

  showAlert() {
    this.alertCtrl.create({
      title: 'Exit?',
      message: 'Do you want to exit the app?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.menuCtrl.close()
            this.alert = false;
          }
        },
        {
          text: 'Exit',
          handler: () => {
            this.appMinimize.minimize();
          }
        }
      ]
    }).present();
  }

  ionViewDidLoad() {
  }

  goBack() {
    this.navCtrl.pop();
  }

  showForm() {
    this.show == false ? this.show = true : this.show = false;
  }

  logout() {

    let loader = this.toastCtrl.create({
      message: 'Logout successfuly',
      duration: 1000,
      position: 'top'
    });
    loader.present();
    localStorage.removeItem('user');
    this.events.publish('try:login', '');

  }

  resetPassowrd() {

    let loader = this.loadingCtrl.create({
      content: "Wait ...",
      duration: 750
    });

    let loginFail = this.toastCtrl.create({
      message: 'Incercarea de schimbare a parolei nu a avut succses.',
      duration: 2500,
      position: 'top'
    });

    if (this.myForm._value.curentpass !== '' || this.myForm._value.pass !== '' || this.myForm._value.repetpass !== '') {

      if (this.myForm._value.pass === this.myForm._value.repetpass) {
        let headers = new Headers();
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });

        let postParams = {
          curentPass: this.myForm._value.curentpass,
          pass: this.myForm._value.pass,
          repetPass: this.myForm._value.repetpass,
          user: localStorage.getItem('user')
        }

        loader.present();

        this.http.post('http://193.226.9.153/resetPassword.php', JSON.stringify(postParams), options).map(res => res.json()).subscribe(data => {

          if (data.success) {
            console.log(data);
            loader.dismiss();
            this.toastCtrl.create({
              message: data.data,
              duration: 2500,
              position: 'top'
            }).present();
          }
          else {
            this.toastCtrl.create({
              message: data.data,
              duration: 2500,
              position: 'top'
            }).present();
            loader.dismiss();
          }

        }, error => {
          console.log(error);
        });

      } else {
        this.toastCtrl.create({
          message: 'Introdu aceleasi valori in campurile "Noua parola" si "Repeta parola".',
          duration: 2500,
          position: 'top'
        }).present();

      }

    } else {
      this.toastCtrl.create({
        message: 'Completeaza toate campurile',
        duration: 2500,
        position: 'top'
      }).present();
    }
  }

  displayNetowrk(connectionState: string) {
    let networkType = this.network.type;
    if (networkType === 'none') {
      this.toastCtrl.create({
        message: 'You are now ' + connectionState,
        duration: 5000
      }).present();
    } else {
      this.toastCtrl.create({
        message: 'You are now ' + connectionState + ' via ' + networkType,
        duration: 5000
      }).present();
    }
  }


  ionViewWillLeave() {
    if (this.user == 'user') {
      this.menuCtrl.enable(true);
    }
  }

  ionViewDidEnter() {
    this.user == 'user' ? this.menuCtrl.enable(false) : null;

    this.network.onDisconnect().subscribe(data => {
      this.loading = this.loadingCtrl.create({
        content: 'Please check your internet connection. And try again.'
      });
      if (this.show == true) {
        this.loading.present();
        this.show = false;
      }
    });

    this.network.onConnect().subscribe(data => {
      this.show = true;
      this.loading.dismiss();
    }, error => console.log(error));

  }

  startApp() {
    localStorage.setItem('slide', 'true');
    this.navCtrl.setRoot("Login", {}, {
      animate: true,
      direction: 'left'
    });
  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd();
  }

  expand() {
    this.expanded = true;
    this.contracted = !this.expanded;
    this.showIcon = false;
    setTimeout(() => {
      const modal = this.navCtrl.push('ModalPage');
    }, 250);
  }
}
