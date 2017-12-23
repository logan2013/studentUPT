import { Component } from '@angular/core';
import { IonicPage, Events, NavController, MenuController, Platform, ToastController, LoadingController, AlertController, App } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
import { NativeStorage } from '@ionic-native/native-storage';
import { Network } from '@ionic-native/network';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { OneSignal } from '@ionic-native/onesignal';
import { Device } from '@ionic-native/device';
import 'rxjs/add/operator/map';
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {
  public myForm: any;
  public dataUser: any;
  public show: any = true;
  public update: any;
  public images: any = ['electro.png', 'mpt.png', 'arh.png', 'chim.png', 'mec.png'];
  public src: any;
  private loading: any;
  constructor(
    private oneSignal: OneSignal,
    public device: Device,
    private app: App,
    private nativePageTransitions: NativePageTransitions,
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public alertCtrl: AlertController,
    public platform: Platform,
    public events: Events,
    private network: Network,
    public nativeStorage: NativeStorage,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder,
    public http: Http) {

    this.menuCtrl.close();
    this.src = this.images[Math.floor(Math.random() * this.images.length)];
    this.menuCtrl.enable(false);
    this.events.unsubscribe('user:logout');

    if (localStorage.getItem('user')) {
      this.toastCtrl.create({
        message: 'Sunteti logat cu ' + localStorage.getItem('user'),
        duration: 1500,
        position: 'top'
      }).present();

      this.navCtrl.setRoot('Profile')
    }

    this.myForm = this.formBuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  ionViewDidEnter() {
    this.network.onDisconnect().subscribe(data => {
      this.loading = this.loadingCtrl.create({
        content: 'Please check your internet connection. And try again.'
      });
      if (this.show == true) {
        this.loading.present();
        this.show = false;
      }
    }
      , error => console.log(error)
    );
    this.network.onConnect().subscribe(data => {
      this.show = true;
      this.loading.dismiss();
    }
      , error => console.log(error));
  }


  displayNetowrk(connectionState: string) {
    let networkType = this.network.type;
    if (networkType === 'none') {
      this.navCtrl.push('NoNetwork');
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
  ionViewDidLoad() { }

  public logForm() {
    let loader = this.loadingCtrl.create({
      content: "Authentification...",
      duration: 750
    });

    let loginFail = this.toastCtrl.create({
      message: 'Something goes wrong. Try again.',
      duration: 2500,
      position: 'top'
    });

    let headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });
    let user: string = this.myForm.value.user.split("@");

    var reg = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
    if (reg.test(this.myForm.value.user)) {
      if (user[1] == "student.upt.ro") {
        let postParams = `utilizator=${user[0]}&parola=${this.myForm.value.password}&intra=Intra`;
        loader.present();
        this.http.post('https://upt.ro/gisc/mbackend.php', postParams, options).map(res => res.json()).subscribe(data => {
          this.dataUser = data;
          console.log(this.dataUser)
          if (this.dataUser.ok == false) {
            loader.dismiss();
            loginFail.present(); // if login fail show a message error
          } else {
            let userSet = {
              "success": true,
              "data": this.myForm.value.user,
              "facultate": null,
              "right": "0",
            }
            localStorage.setItem("dataUser", JSON.stringify(this.dataUser));
            localStorage.setItem('user', this.myForm.value.user)
            setTimeout(() => {
              loader.dismiss();
            }, 500)
            this.menuCtrl.enable(true);
            localStorage.removeItem('slide');
            this.app.getRootNav().setRoot('Profile');
            this.navCtrl.setRoot('Profile', { item: userSet });
            this.events.publish('try:login', '');
            this.oneSignal.getIds().then(data => {
              var usrData = JSON.parse(this.dataUser);
              this.http.get("http://193.226.9.153/userPhoto.php?user=" + localStorage.getItem("user") + "&profil=" + usrData['Profil'] + "&phoneid=" + data.userId + "&nume=" + usrData["Nume si Prenume"] + "&facultate=" + usrData["Specializare"]).map(res => res.json()).subscribe(data => {
                if (data.success) {
                  
                } else {
                  alert("nup")
                }
              }, (err) => {
                alert(JSON.stringify(err))
              })
              // this gives you back the new userId and pushToken associated with the device. Helpful.
            });
          }
        }, (error) => {
          loader.dismiss();
          loginFail.present();
          console.log(error.message);
        });
      } else {
        let postParams =
          {
            user: this.myForm.value.user,
            pwd: this.myForm.value.password,
          }
        if (postParams.user != '' && postParams.pwd != '') {
          this.http.post('http://193.226.9.153/login.php', JSON.stringify(postParams), options).map(res => res.json()).subscribe(data => {
            this.dataUser = data;
            if (this.dataUser.success) {
              setTimeout(() => {
                loader.dismiss();
              }, 300)
              localStorage.setItem('user', this.dataUser.data)
              localStorage.setItem('token', this.dataUser.token)
              this.menuCtrl.enable(true);
              localStorage.removeItem('slide');
              this.app.getRootNav().setRoot('Profile');
              this.navCtrl.setRoot('Profile', { item: this.dataUser });
              this.events.publish('try:login', '');
            }
            else {
              loader.dismiss();
              loginFail.present(); // if login fail show a message error
            }
          }, (error) => {
            console.log(error.message);
          });
        } else {
          loader.dismiss();
        }
      }
    } else {
    //  alert("Insert valid email address");
    }
  }

  ionViewWillLeave() {
    this.menuCtrl.enable(true);
  }

  guest() {
    if (localStorage.getItem('slide') == null) {
      this.app.getRootNav().setRoot('Profile');
      this.navCtrl.setRoot('Profile', {
        animation: true,
        direction: 'forward'
      });
    } else {
      this.app.getRootNav().setRoot('About');
      this.navCtrl.setRoot('About', {
        animation: true,
        direction: 'forward'
      });
    }

    this.events.publish('try:login', '');
    this.menuCtrl.enable(true);
  }

}
