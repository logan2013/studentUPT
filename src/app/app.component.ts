import { Component, ViewChild } from '@angular/core';
import { Nav, Events, Platform, LoadingController, NavOptions, ToastController, AlertController, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Auth } from '../providers/auth';
import { Getlocation } from '../providers/getlocation';
import { OneSignal } from '@ionic-native/onesignal';
import { Device } from '@ionic-native/device';
import { Http } from '@angular/http';
import { AppVersion } from '@ionic-native/app-version';
import 'rxjs/add/operator/map';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  public photo: string = 'null';
  public rootPage: any = "Profile";
  public dataUser: any = [];
  public activePage: any;
  public theme: any = 'theme-light';
  public pages: Array<{ icon: string, title: string, component: any }>;
  public userSet: any = [];
  private navOptions: NavOptions = {
    animate: true,
    direction: 'forward',
    animation: 'wp-transition',
    duration: 300
  };
  public guestUserPages: any = [
    { icon: 'home', title: 'Home', component: "Profile" },
    { icon: 'information-circle', title: 'UPT', component: "About" },
    { icon: 'school', title: 'Facultăți', component: "Facultati" },
    { icon: 'school', title: 'Organizații Studențești', component: "Organizatii" },
    { icon: 'book', title: 'Regulamente', component: "RegulamentPage" },
    { icon: 'map', title: 'Harta Campusului', component: "Googlemaps" },
    { icon: 'document', title: 'Resurse Utile', component: "ResurseUtilePage" },
    { icon: 'log-in', title: 'Autentificare', component: "Login" },
  ];
  public loggedInUserPages: any = [
    { icon: 'home', title: 'Home', component: "Profile" },
    { icon: 'information-circle', title: 'UPT', component: "About" },
    { icon: 'school', title: 'Facultăți', component: "Facultati" },
    { icon: 'school', title: 'Organizații Studențești', component: "Organizatii" },
    { icon: 'book', title: 'Regulamente', component: "RegulamentPage" },
    { icon: 'map', title: 'Harta Campusului', component: "Googlemaps" },
    { icon: 'document', title: 'Resurse Utile', component: "ResurseUtilePage" },
  ];
  constructor(
    private oneSignal: OneSignal,
    public events: Events,
    public device: Device,
    public modalCtrl: ModalController,
    private toastCtrl: ToastController,
    public loadCtrl: LoadingController,
    public getlocation: Getlocation,
    public auth: Auth,
    private http: Http,
    public alertCtrl: AlertController,
    public platform: Platform,
    private appVersion: AppVersion,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen) {

    this.initializeApp();
    this.activePage = 'Profile';
    this.statusBar.styleDefault();
    this.events.subscribe("updatePhoto", (data) => {
      this.photo = data;
    })

    if (localStorage.getItem('slide') == "true") {
      this.rootPage = 'About';
    } else {
      this.rootPage = 'Profile';
    }

    if (localStorage.getItem('user')) {
      this.toastCtrl.create({
        message: 'Sunteti logat cu ' + localStorage.getItem('user'),
        duration: 1500,
        position: 'top'
      }).present();
      this.rootPage = 'Profile';
    }

    this.auth.login().then((isLoggedIn) => {
      this.dataUser = isLoggedIn;
      if (this.dataUser.right == 0 || this.dataUser.right == 1 || this.dataUser.right == 2) {
        this.pages = this.loggedInUserPages;
      } else {
        this.pages = this.guestUserPages;
      }
    });

    events.subscribe('try:login', () => {
      this.menuOpened();
      this.userSet = localStorage.getItem("dataUser");
      var usrData = JSON.parse(this.userSet);
      this.oneSignal.getIds().then(data => {
        this.http.get('http://193.226.9.153/userPhoto.php?photo=' + localStorage.getItem("photo") + "&user=" + localStorage.getItem("user") + "&profil=" + usrData['Profil'] + "&phoneid=" + data.userId + "&nume=" + usrData["Nume si Prenume"] + "&facultate=" + usrData["Specializare"]).map(res => res.json()).subscribe(data => {
          if (data.success) {
            this.events.publish("updatePhoto", localStorage.getItem("photo"));
            localStorage.setItem("photo", localStorage.getItem("photo"));
          } else {
            console.log("nup")
          }
        }, (err) => {
          console.log("Eroare: " + JSON.stringify(err))
        })
      });
    });

  }

  menuClosed() {
    this.events.unsubscribe('updatePhoto')
  }

  ionViewDidLeave() { }

  ionViewDidEnter() { }

  ionViewDidLoad() { }

  menuOpened() {

    if (localStorage.getItem("loginTime") != null) {
      var timeLog: any = localStorage.getItem("loginTime");
      var timeCurrent: any = new Date().getTime().toString();
      if ((timeCurrent - timeLog) / 1000 > 259000) {
        localStorage.clear();
      }
    }

    this.photo = localStorage.getItem("photo");
    this.http.get('http://193.226.9.153/getUserPhoto.php?user=' + localStorage.getItem('user')).map(res => res.json()).subscribe(data => {
      if (data.success == true) {
        this.photo = data.photo;
        this.events.publish("updatePhoto", (data.photo));
        localStorage.setItem('photo', data.photo);
        localStorage.setItem('enableNotification', data.enableNotification);
        localStorage.setItem('phoneid', data.phoneid);
      } else {
        localStorage.removeItem('photo');
        this.photo = 'null';
        this.events.publish("updatePhoto", "null");
      }
    })

    this.auth.login().then((isLoggedIn) => {
      this.dataUser = isLoggedIn;
      if (this.dataUser.right == 0 || this.dataUser.right == 1 || this.dataUser.right == 2) {
        this.pages = this.loggedInUserPages;
      } else {
        this.pages = this.guestUserPages;
      }
    }).catch((e) => {
      if (this.dataUser.right == 0 || this.dataUser.right == 1 || this.dataUser.right == 2) {
        this.pages = this.loggedInUserPages
      } else {
        this.pages = this.guestUserPages;
      }
    })
  }

  public editProfile(page) {
    this.openPage({ component: "Profile" });
  }

  initializeApp() {
    //a0bfcab0-43b0-456e-a62d-48c86af5202a
    this.platform.ready().then(() => {

      // setTimeout(() => {
        this.splashScreen.hide();
      // }, 100);
      this.userSet = localStorage.getItem("dataUser");
      var usrData = JSON.parse(this.userSet);

      this.getlocation.startTracking();
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.oneSignal.startInit("a0bfcab0-43b0-456e-a62d-48c86af5202a", "791062974267");
      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
      this.oneSignal.setSubscription(true);
      // this.oneSignal.handleNotificationReceived().subscribe((data) => {
      //   // do something when the notification is received.
      // });
      this.oneSignal.handleNotificationOpened().subscribe((data) => {
        localStorage.setItem("popUpNotification", "true");
        setTimeout(() => {
          this.rootPage = 'About';
        }, 40)
        // this.modalCtrl.create('ShowContent', { item: data.notification.payload.additionalData }).present().then(() => {
        //   this.auth.modal = true;
        // });
      });
      this.oneSignal.endInit();
      this.oneSignal.getIds().then(data => {

        this.http.get('http://193.226.9.153/sendDevices.php?uuid=' + data.userId + '&deviceid=' + this.device.uuid + '&model=' + this.device.model + '&platform=' +
          this.device.platform + '&version=' + this.device.version + '&manufacturer=' + this.device.manufacturer + '&versionapp=' + this.appVersion.getVersionCode()).map(res => res.json()).subscribe(data => {
            if (data.success) {
              //    alert('merge');
            } else {
              console.log(data.error)
            }
          });

        this.http.get('http://193.226.9.153/userPhoto.php?photo=' + localStorage.getItem("photo") + "&user=" + localStorage.getItem("user") + "&profil=" + usrData['Profil'] + "&phoneid=" + data.userId + "&nume=" + usrData["Nume si Prenume"] + "&facultate=" + usrData["Specializare"]).map(res => res.json()).subscribe(data => {
          if (data.success) {
            this.events.publish("updatePhoto", localStorage.getItem("photo"));
            localStorage.setItem("photo", localStorage.getItem("photo"));
          } else {
            alert("nup")
          }
        }, (err) => {
          alert(JSON.stringify(err))
        })
        // this gives you back the new userId and pushToken associated with the device. Helpful.
      });

    });

  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (page.component == 'Profile') {
      if (localStorage.getItem('slide') == null) {
        this.nav.setRoot(page.component, {}, this.navOptions);
      } else {
        let alert = this.alertCtrl.create({
          title: 'Trebuie sa te loghezi!',
          subTitle: 'Pentru a accesa aceasta sectiune este nevoie sa te loghezi folosind contul upt!',
          buttons: [{
            text: 'Nu acum',
            handler: () => {
              // this.nav.setRoot('About');
            }
          },
          {
            text: 'Login',
            handler: () => {
              this.nav.setRoot('Login', {}, this.navOptions);
            }
          }
          ]
        });
        alert.present();
      }
    } else {
      this.nav.setRoot(page.component, {}, this.navOptions);
    }

    this.activePage = page;
  }

  checkActive(page) {
    if (page.title == this.activePage.title) {
      return true;
    }
  }
}
