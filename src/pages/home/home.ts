import { Component } from '@angular/core';
import { IonicPage, ToastController, Platform, MenuController, NavController, App, Nav } from 'ionic-angular';
import { Network } from '@ionic-native/network';

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
  constructor(private network: Network,
    private toastCtrl: ToastController,
    public platform: Platform,
    public app: App,
    public navCtrl: NavController,
    public nav: Nav,
    public menuCtrl: MenuController
  ) {
    this.platform.ready().then(() => {
      this.menuCtrl.enable(true);
      var lastTimeBackPress = 0;
      var timePeriodToExit = 2000;
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
