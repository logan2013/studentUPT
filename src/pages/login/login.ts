import { Component } from '@angular/core';
import { IonicPage, Events, NavController, MenuController, Platform, ToastController, LoadingController, AlertController, App } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
import { NativeStorage } from '@ionic-native/native-storage';
import { Network } from '@ionic-native/network';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
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
      message: 'Failed',
      duration: 2500,
      position: 'top'
    });

    let headers = new Headers();

    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });
    let user: string = this.myForm._value.user.split("@");
    console.log(user);
    if (user[1] == "student.upt.ro" || user[1]=="upt.ro") {

      let postParams = 'utilizator=' + user[0] + '&parola=' + this.myForm._value.password + '&intra=Intra';
      // {
      //   utilizator: this.myForm._value.user,
      //   parola: this.myForm._value.password,
      // }
      loader.present();
      this.http.post('https://upt.ro/gisc/mbackend.php', postParams, options).map(res => res.json()).subscribe(data => {
        this.dataUser = data;
        if (this.dataUser.ok == false) {

          loader.dismiss();
          loginFail.present(); // if login fail show a message error
        } else {
          this.http.get('http://193.226.9.153/getUserPhoto.php?user=' + this.myForm._value.user).map(res => res.json()).subscribe(data => {
            if (data.success == true) {
              localStorage.setItem('photo', data.photo);
            } else {
              localStorage.removeItem('photo');
            }
            
          })
          let userSet = {
            "success": true,
            "data": this.myForm._value.user,
            "facultate": null,
            "right": "0",
          }
          localStorage.setItem("dataUser", JSON.stringify(this.dataUser));
          localStorage.setItem('user', this.myForm._value.user)
          loader.dismiss();
          this.menuCtrl.enable(true);
          localStorage.removeItem('slide');
          this.app.getRootNav().setRoot('Profile');
          this.navCtrl.setRoot('Profile', { item: userSet });
          this.events.publish('try:login', '');
        }


      }, error => {
        loader.dismiss();
        loginFail.present();
        let postParams =
          {
            user: this.myForm._value.user,
            pwd: this.myForm._value.password,
          }
        if (postParams.user != '' && postParams.pwd != '') {

          this.http.post('http://193.226.9.153/login.php', JSON.stringify(postParams), options).map(res => res.json()).subscribe(data => {
            this.dataUser = data;

            console.log(this.dataUser.data)
            if (this.dataUser.success) {
              loader.dismiss();
              localStorage.setItem('user', this.dataUser.data)
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
          }, error => {
            console.log(error);
          });
        } else {
          loader.dismiss();
        }
        //'utilizator=' + this.myForm._value.user + '&parola=' + this.myForm._value.password + '&intra=Intra';

        console.log(error);
      });

    } else {
      alert("adresa email invalida !")
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
