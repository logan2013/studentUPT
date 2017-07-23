import { Component, ViewChild } from '@angular/core';
import { Nav, Events, Platform, LoadingController, ToastController, AlertController, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativeStorage } from '@ionic-native/native-storage';
import { Auth } from '../providers/auth';
import { Getlocation } from '../providers/getlocation';
import { OneSignal } from '@ionic-native/onesignal';
import { Device } from '@ionic-native/device';
import { Http } from '@angular/http';
import { AppMinimize } from '@ionic-native/app-minimize';
import { AppUpdate } from '@ionic-native/app-update';
import { AppVersion } from '@ionic-native/app-version';
import 'rxjs/add/operator/map';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  public rootPage: any = "Login";
  public dataUser: any = [];
  activePage: any;
  
  pages: Array<{ icon: string, title: string, component: any }>;
  constructor(private oneSignal: OneSignal,
    public events: Events,
    private appMinimize: AppMinimize,
    public device: Device,
    public modalCtrl: ModalController,
    private toastCtrl: ToastController,
    public loadCtrl: LoadingController,
    public getlocation: Getlocation,
    public auth: Auth,
    private http: Http,
    public alertCtrl: AlertController,
    public platform: Platform,
    private nativeStorage: NativeStorage,
    private appVersion: AppVersion,
    public statusBar: StatusBar,
    private appUpdate: AppUpdate,
    public splashScreen: SplashScreen) {
    this.initializeApp();
    let load = this.loadCtrl.create({
      content: "Data is loading...",
    });
    this.auth.login().then((isLoggedIn) => {
    this.activePage = 'Home';

      load.dismiss();
      this.dataUser = isLoggedIn;
      console.log(this.dataUser)
      this.statusBar.styleDefault();
      if (this.dataUser.right == 0) {

        this.rootPage = 'Login';
        this.pages = [
          { icon: 'home', title: 'Home', component: "HomePage" },
          { icon: 'information-circle', title: 'UPT', component: "About" },
          { icon: 'school', title: 'Facultăți', component: "Facultati" },
          { icon: 'school', title: 'Organizații Studențești', component: "Organizatii" },
          { icon: 'map', title: 'Harta Campusului', component: "Googlemaps" },
          { icon: 'log-in', title: 'Autentificare', component: "Logout" },
        ];
        
      } else if (this.dataUser.right == 1) {

        this.rootPage = 'Login';
        this.pages = [
          { icon: 'home', title: 'Home', component: "HomePage" },
          { icon: 'information-circle', title: 'UPT', component: "About" },
          { icon: 'school', title: 'Facultăți', component: "Facultati" },
          { icon: 'school', title: 'Organizații Studențești', component: "Organizatii" },
          { icon: 'map', title: 'Harta Campusului', component: "Googlemaps" },
          { icon: 'log-in', title: 'Autentificare', component: "Logout" },
        ];
      } else {

        this.rootPage = 'Login';
        this.pages = [
          { icon: 'home', title: 'Home', component: "HomePage" },
          { icon: 'information-circle', title: 'UPT', component: "About" },
          { icon: 'school', title: 'Facultăți', component: "Facultati" },
          { icon: 'school', title: 'Organizații Studențești', component: "Organizatii" },
          { icon: 'map', title: 'Harta Campusului', component: "Googlemaps" },
          { icon: 'log-in', title: 'Autentificare', component: "Login" },
        ];
        
      }
    })
    events.subscribe('try:login', () => {
      // your action here

      this.menuOpened();
    });

  }

  menuClosed() {
    //code to execute when menu has closed
    console.log('menu closed')
  }

  menuOpened() {
    this.auth.login().then((isLoggedIn) => {
      this.dataUser = isLoggedIn;
      console.log('menu opened')
      if (this.dataUser.right == 0) {
        this.pages = [
          { icon: 'home', title: 'Home', component: "HomePage" },
          { icon: 'information-circle', title: 'UPT', component: "About" },
          { icon: 'school', title: 'Facultăți', component: "Facultati" },
          { icon: 'school', title: 'Organizații Studențești', component: "Organizatii" },
          { icon: 'map', title: 'Harta Campusului', component: "Googlemaps" },
          { icon: 'log-in', title: 'Autentificare', component: "Logout" },

        ];
      } else if (this.dataUser.right == 1 || this.dataUser.right == 2) {
        this.pages = [
          { icon: 'home', title: 'Home', component: "HomePage" },
          { icon: 'information-circle', title: 'UPT', component: "About" },
          { icon: 'school', title: 'Facultăți', component: "Facultati" },
          { icon: 'school', title: 'Organizații Studențești', component: "Organizatii" },
          { icon: 'map', title: 'Harta Campusului', component: "Googlemaps" },
          { icon: 'log-in', title: 'Autentificare', component: "Logout" },

        ];
      } else {
        this.pages = [
          { icon: 'home', title: 'Home', component: "HomePage" },
          { icon: 'information-circle', title: 'UPT', component: "About" },
          { icon: 'school', title: 'Facultăți', component: "Facultati" },
          { icon: 'school', title: 'Organizații Studențești', component: "Organizatii" },
          { icon: 'map', title: 'Harta Campusului', component: "Googlemaps" },
          { icon: 'log-in', title: 'Autentificare', component: "Login" },
        ];
      }

    })
    //code to execute when menu ha opened
  }

  /**
   * editProfile
   */
  public editProfile(user) {
    if (user.data == 'user') {
      let alert = this.alertCtrl.create({
        title: 'Trebuie sa te loghezi :-(',
        subTitle: 'Momentan aceasta sectiune nu este disponibila pentru studenti. Multumim!',
        buttons: ['OK']
      });
      alert.present();
    } else {
      this.modalCtrl.create('Profile').present()
      // this.rootPage = 'Profile';
    }
    console.log(user)
  }


  initializeApp() {
    //a0bfcab0-43b0-456e-a62d-48c86af5202a
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      setTimeout(function () {
        this.splashScreen.hide();

      }, 100);

      this.getlocation.startTracking();
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.oneSignal.startInit("a0bfcab0-43b0-456e-a62d-48c86af5202a", "791062974267");
      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
      this.oneSignal.setSubscription(true);
      this.oneSignal.handleNotificationReceived().subscribe(() => {
        // do something when the notification is received.
      });
      this.oneSignal.handleNotificationOpened().subscribe(() => {
        // do something when the notification is opened.
        this.rootPage = 'Home';
      });
      this.oneSignal.endInit();
      this.oneSignal.getIds().then(data => {
        this.http.get('http://193.226.9.153/sendDevices.php?uuid=' + data.userId + '&deviceid=' + this.device.uuid + '&model=' + this.device.model + '&platform=' +
          this.device.platform + '&version=' + this.device.version + '&manufacturer=' + this.device.manufacturer+ '&versionapp=' + this.appVersion.getVersionCode()).map(res => res.json()).subscribe(data => {
            if (data.success) {
              //    alert('merge');
            } else {
              console.log(data.error)
            }
          });
        // this gives you back the new userId and pushToken associated with the device. Helpful.
      });

    });

  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
    this.activePage = page;
  }

  checkActive(page) {
   if(page.title == this.activePage.title) {
     return true;
   }
  }
}
