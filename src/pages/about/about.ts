import { Component } from '@angular/core';
import { IonicPage, Events, Nav, Platform, MenuController, AlertController, NavController } from 'ionic-angular';
import { Auth } from '../../providers/auth';
import { AppMinimize } from '@ionic-native/app-minimize';

@IonicPage()
@Component({
  templateUrl: 'about.html',
})
export class About {
  public descriereUpt: any = "DescriereUpt";
  public conducereUpt: any = "ConducereUpt";
  public noutatiUpt: any = "NoutatiUpt";
  public Beneficii: any = "Beneficii";
  public alert: any = false;
  public user: string = localStorage.getItem("user");

  constructor(
    private platform: Platform,
    private nav: Nav,
    private menuCtrl: MenuController,
    private alertCtrl: AlertController,
    public auth: Auth,
    private navCtrl: NavController,
    private events: Events,
    private appMinimize: AppMinimize
  ) {
    if (this.user == 'user') {
      this.platform.ready().then(() => {
        this.menuCtrl.enable(true);
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
}
