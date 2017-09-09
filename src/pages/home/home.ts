import { Component } from '@angular/core';
import { IonicPage, ToastController, Platform, AlertController, ViewController, MenuController, NavController, App, Nav, Events } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { AppMinimize } from '@ionic-native/app-minimize';
import { Auth } from '../../providers/auth';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public informatii: string = "Informatii";
  public about: string = "About";
  public beneficii: string = "Beneficii";
  public user: string;
  public alert: any = false;
  public backButtonPressedOnceToExit: boolean = false;
  constructor(
    private events: Events,
    private network: Network,
    private toastCtrl: ToastController,
    public platform: Platform,
    public app: App,
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController,
    public nav: Nav,
    public appMinimize: AppMinimize,
    public menuCtrl: MenuController,
    private auth: Auth
  ) {

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

  showToast() {
    let toast = this.toastCtrl.create({
      message: 'Press Again to exit',
      duration: 2000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
  /**
 * 
 * @param connectionState 
 */
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

  /**
   * check if you have netowrk connection
   */
  ionViewDidEnter() {
    this.network.onConnect().subscribe(data => {
      this.displayNetowrk(data.type);
    }
      , error => console.log(error));

    this.network.onDisconnect().subscribe(data => {
      this.displayNetowrk(data.type);
    }
      , error => console.log(error)
    );
  }

}
