import { ViewCompiler } from '@angular/compiler';
import { Component, keyframes } from '@angular/core';
import { App, NavController, NavParams, ModalController, ViewController, Events } from 'ionic-angular';
import { ToastService } from '../../../providers/util/toast.service';
import { AlertService } from '../../../providers/util/alert.service';
import { Camera } from '@ionic-native/camera';
import { IonicPage } from 'ionic-angular';
import { Auth } from '../../../providers/auth';

/**
 * Generated class for the SetariPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-setari',
  templateUrl: 'setari.html',
})
export class SetariPage {
  public userData: any = [];
  profilePicture: string;
  profileRef: any;
  errorMessage: any;
  placeholderPicture = 'http://api.adorable.io/avatar/200/bob';

  enableNotifications = true;
  language: any;
  currency: any;
  paymentMethod: any;

  languages = ['English', 'Portuguese', 'French'];
  paymentMethods = ['Paypal', 'Credit Card'];
  currencies = ['USD', 'BRL', 'EUR'];

  user = {
    name: 'Marty Mcfly',
    imageUrl: 'http://193.226.9.153/profilelogo.png'
  };

  constructor(
    public events: Events,
    public viewCtrl: ViewController,
    public app: App,
    public alertService: AlertService,
    public toastCtrl: ToastService,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public auth: Auth,
    public camera: Camera
  ) {
    this.auth.login().then((isLoggedIn) => {
      this.userData = isLoggedIn;
    });
  }

  toggleNotifications() {
    if (this.enableNotifications) {
      this.toastCtrl.create('Notifications enabled.');
    } else {
      this.toastCtrl.create('Notifications disabled.');
    }
  }

  updateImage(value) {
    this.profilePicture = 'data:image/jpeg;base64,' + value.val();
  }

  updateProfileImage() {
    this.camera.getPicture({
      quality: 50,
      allowEdit: true,
      cameraDirection: this.camera.Direction.FRONT,
      destinationType: this.camera.DestinationType.DATA_URL
    }).then((imageData) => {
      this.user.imageUrl = imageData;
    }, (err) => {
      this.toastCtrl.create('Error: ' + err);
    });
  }

  logOut() {
    this.alertService.presentAlertWithCallback('Are you sure?',
      'This will log you out of this application.').then((yes) => {
        if (yes) {
          this.events.publish('user:logout');
        }
      });
  }
}