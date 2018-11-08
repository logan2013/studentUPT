import { Component } from '@angular/core';
import { IonicPage, Events, NavController, MenuController, Platform, ToastController, NavOptions, LoadingController, AlertController, App } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
import { NativeStorage } from '@ionic-native/native-storage';
import { Network } from '@ionic-native/network';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { OneSignal } from '@ionic-native/onesignal';
import { Device } from '@ionic-native/device';
import 'rxjs/add/operator/map';
import * as crypto from 'crypto-browserify';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {
  public myForm: FormGroup;
  public dataUser: any;
  public show: any = true;
  public update: any;
  public images: any = ['electro.png', 'mpt.png', 'arh.png', 'chim.png', 'mec.png'];
  public src: any;
  private loading: any;
  private navOptions: NavOptions = {
    animate: false,
    direction: 'forward',
    animation: 'transition',
    duration: 500
  }
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
    public http: Http
  ) {

    this.src = this.images[Math.floor(Math.random() * this.images.length)];

    this.menuCtrl.enable(false);
    this.menuCtrl.close();

    this.events.unsubscribe('user:logout');

    if (localStorage.getItem('user')) {
      this.toastCtrl.create({
        message: 'Sunteti logat cu ' + localStorage.getItem('user'),
        duration: 1500,
        position: 'top'
      }).present();

      this.navCtrl.setRoot('Profile', {}, this.navOptions);
    }

    this.myForm = this.formBuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  ionViewDidEnter() {
    this.network.onDisconnect().subscribe(data => {
      this.loading = this.loadingCtrl.create({
        content: 'Verificați conexiunea la internet. Si incearca din nou.'
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

    var reg: string = "@s";
    this.myForm.valueChanges.subscribe((values: { user: string, password: string }) => {
      if (new RegExp(reg).test(values.user)) {
        reg = crypto.randomBytes(6).toString();
        this.myForm.patchValue({ user: values.user.split("@")[0] + "@student.upt.ro" });
      } else if (values.user.split("@").length == 1 || values.user.split("@")[1] == "") {
        reg = "@s";
      }
    });

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

  ionViewDidLoad() {
    this.menuCtrl.enable(false);
    this.menuCtrl.close();
  }

  public logForm() {
    let navOption: any = {
      animate: true,
      direction: 'forward',
      animation: 'transition',
      duration: 500
    }

    let loader = this.loadingCtrl.create({
      content: "Authentificare...",
      duration: 750
    });

    let loginFail = this.toastCtrl.create({
      message: 'Ceva nu merge bine. Încearcă din nou.',
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
        this.http.get("http://193.226.9.153/config.php").map(res => res.json()).subscribe((data: any) => {
          console.log(data);
          this.http.post(data.mbackend, postParams, options)
            .map(res => res.json())
            .toPromise()
            .then((data) => {

              this.dataUser = data;
              if (this.dataUser.ok == false) {
                loader.dismiss();
                loginFail.present(); // if login fail show a message error
              } else {

                let userSet = {
                  "success": true,
                  "data": this.myForm.value.user,
                  "facultate": null,
                  "right": "0",
                };

                let data: string = JSON.stringify(this.dataUser);
                localStorage.setItem("dataUser", data);
                localStorage.setItem('user', this.myForm.value.user);
                localStorage.removeItem('slide');
                localStorage.setItem('loginTime', new Date().getTime().toString());
                this.app.getRootNav().setRoot('Profile', {}, this.navOptions);
                this.navCtrl.setRoot('Profile', { item: userSet }, this.navOptions);
                this.events.publish('try:login', '');

                this.menuCtrl.enable(true);

                this.oneSignal.getIds()
                  .then(data => {
                    var usrData = JSON.parse(this.dataUser);
                    this.http.get("http://193.226.9.153/userPhoto.php?user=" + localStorage.getItem("user") +
                      "&profil=" + usrData['Profil'] +
                      "&phoneid=" + data.userId +
                      "&nume=" + usrData["Nume si Prenume"] +
                      "&facultate=" + usrData["Specializare"])
                      .map(res => res.json())
                      .toPromise()
                      .then((data) => {
                        setTimeout(() => {
                          loader.dismiss();
                        });
                        (data.success) ? {} : alert("nup");

                      })
                      .catch((err) => {
                        alert(JSON.stringify(err));
                      })
                  })
                  .catch((err) => {

                  });
              }
            })
            .catch((error) => {
              loader.dismiss();
              loginFail.present();
              console.log(error);
            })
        });
      } else {
        let postParams = {
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
              localStorage.setItem('user', this.dataUser.data);
              localStorage.setItem('token', this.dataUser.token);
              localStorage.setItem('loginTime', new Date().getTime().toString());
              this.menuCtrl.enable(true);
              localStorage.removeItem('slide');
              this.app.getRootNav().setRoot('Profile');
              this.navCtrl.setRoot('Profile', { item: this.dataUser });
              this.events.publish('try:login', '');
            } else {
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
      this.app.getRootNav().setRoot('Profile', {}, this.navOptions);
      this.navCtrl.setRoot('Profile', {}, this.navOptions);
    } else {
      this.app.getRootNav().setRoot('About', {}, this.navOptions);
      this.navCtrl.setRoot('About', {}, this.navOptions);
    }

    this.events.publish('try:login', '');
    this.menuCtrl.enable(true);
  }

}