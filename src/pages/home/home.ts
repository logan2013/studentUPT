import { Component } from '@angular/core';
import { IonicPage, ToastController, Platform, AlertController, ViewController, MenuController, NavController, App, Nav } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { AppMinimize } from '@ionic-native/app-minimize';
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
  public alert: any;
  public backButtonPressedOnceToExit: boolean = false;
  constructor(private network: Network,
    private toastCtrl: ToastController,
    public platform: Platform,
    public app: App,
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController,
    public nav: Nav,
    public appMinimize: AppMinimize,
    public menuCtrl: MenuController
  ) {
    this.platform.ready().then(() => {
      this.menuCtrl.enable(true);
      var lastTimeBackPress = 0;

      var timePeriodToExit = 2000;
      this.platform.registerBackButtonAction(() => {
        if (this.backButtonPressedOnceToExit) {
          this.appMinimize.minimize();
        } else if (this.nav.canGoBack()) {
          this.nav.pop({});
          this.navCtrl.pop();
        } else {
          this.viewCtrl.dismiss();
          this.showToast();
          this.backButtonPressedOnceToExit = true;
          setTimeout(() => {

            this.backButtonPressedOnceToExit = false;
          }, 2000)
        }

        if (this.nav.canGoBack()) {
          this.nav.pop();
          this.navCtrl.pop();
        } else {
          this.viewCtrl.dismiss();
          if (this.alert) {
            this.alert.dismiss();
            this.alert = null;
          } else {
            this.showAlert();
          }
        }
      });

      // this.platform.registerBackButtonAction(() => {
      //   alert(this.app.getActiveNav().getViews()[0].name);
      //   // if(this.app.getActiveNav().getViews()[0].name == 'ShowContent')

      //   // get current active page
      //   //Double check to exit app  
      //   // this.apps.
      //   //           alert('1 ' +data)
      //   //         });
      //   //         this.app.navPop().then((data) => {
      //   //           alert('2 ' + data)
      //   //         })
      //   //         alert(this.navCtrl.canGoBack())
      //   // if (new Date().getTime() - lastTimeBackPress < timePeriodToExit) {
      //   //   this.platform.exitApp()
      //   // } else {
      //   //   if (this.navCtrl.canGoBack) {
      //   //     this.navCtrl.pop();
      //   //   } else {
      //   //     this.app.goBack();
      //   //   }


      //   //   let toast = this.toastCtrl.create({
      //   //     message: 'Press back again to exit App.',
      //   //     duration: 3000,
      //   //     position: 'bottom'
      //   //   });
      //   //   toast.present();
      //   //   lastTimeBackPress = new Date().getTime();
      //   // }


      // });
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
            this.alert = null;
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
