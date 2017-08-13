import { using } from 'rxjs/observable/using';
import { Component } from '@angular/core';
import { IonicPage, Events, NavController, MenuController, Platform, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
import { NativeStorage } from '@ionic-native/native-storage';
import { Network } from '@ionic-native/network';
import { AppUpdate } from '@ionic-native/app-update';
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
  constructor(public navCtrl: NavController,
    public menuCtrl: MenuController,
    public alertCtrl: AlertController,
    public platform: Platform,
    public events: Events,
    private network: Network,
    public nativeStorage: NativeStorage,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder,
    private appUpdate: AppUpdate,
    public http: Http) {

    this.src =  this.images[Math.floor(Math.random() * this.images.length)];
    console.log(this.src)
    this.menuCtrl.enable(false);

    if (localStorage.getItem('user')) {
      this.toastCtrl.create({
        message: 'Sunteti logat cu ' + localStorage.getItem('user'),
        duration: 1500,
        position: 'top'
      }).present();
      this.navCtrl.setRoot('HomePage')
    }

    this.myForm = this.formBuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  ionViewDidEnter() {


    this.network.onConnect().subscribe(data => {
      this.show = true;
    }
      , error => console.log(error));

    this.network.onDisconnect().subscribe(data => {
      let alert = this.alertCtrl.create({
        title: 'Network was disconnected :-(',
        subTitle: 'Please check your connection. And try again ',
        buttons: ['OK']
      });
      if (this.show == true) {
        alert.present();
        this.show = false;
      }
    }
      , error => console.log(error)
    );
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
      this.navCtrl.push('Login');
      // this.navCtrl.pop();
      this.toastCtrl.create({
        message: 'You are now ' + connectionState + ' via ' + networkType,
        duration: 5000
      }).present();
    }
  }
  ionViewDidLoad() { }

  public logForm() {

    const updateUrl = 'http://193.226.9.153/update.xml';
    this.appUpdate.checkAppUpdate(updateUrl);


    let loader = this.loadingCtrl.create({
      content: "Authentification...",
      duration: 750
    });

    let loginFail = this.toastCtrl.create({
      message: 'Failed',
      duration: 2500,
      position: 'top'
    });

    let headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });

    let postParams = {
      user: this.myForm._value.user,
      pwd: this.myForm._value.password,
    }
    loader.present();
    if (postParams.user != '' && postParams.pwd != '') {
      this.http.post('http://193.226.9.153/login.php', JSON.stringify(postParams), options).map(res => res.json()).subscribe(data => {
        this.dataUser = data;

        console.log(this.dataUser.data)
        if (this.dataUser.success) {
          loader.dismiss();
          localStorage.setItem('user', this.dataUser.data)
          this.navCtrl.setRoot('HomePage', { item: this.dataUser });
          this.events.publish('try:login', '');

        }
        else {
          loader.dismiss();

          loginFail.present(); // if login fail show a message error
        }
      }, error => {
        console.log(error);
      });
    } else {
      loader.dismiss();
    }


  }

  ionViewWillLeave() {

    this.menuCtrl.enable(true);

  }

  guest() {
    this.navCtrl.setRoot('HomePage');

    this.events.publish('try:login', '');
    this.menuCtrl.enable(true);
  }

}
