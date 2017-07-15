import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
/**
 * Generated class for the Profile page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class Profile {
  public myForm: any;
  public show: any = false;
  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public navParams: NavParams,
    public http: Http,
    public formBuilder: FormBuilder) {

    this.myForm = this.formBuilder.group({
      curentpass: [''],
      pass: [''],
      repetpass: ['']
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Profile');
  }

  goBack() {
    this.navCtrl.pop();
  }

  showForm() {
    if (this.show == false) {
      this.show = true;
    } else if (this.show == true) {
      this.show = false;
    }
  }

  resetPassowrd() {

    let loader = this.loadingCtrl.create({
      content: "Wait ...",
      duration: 750
    });

    let loginFail = this.toastCtrl.create({
      message: 'Incercarea de schimbare a parolei nu a avut succses.',
      duration: 2500,
      position: 'top'
    });


    if (this.myForm._value.curentpass !== '' || this.myForm._value.pass !== '' || this.myForm._value.repetpass !== '') {

      if (this.myForm._value.pass === this.myForm._value.repetpass) {
        let headers = new Headers();
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });

        let postParams = {
          curentPass: this.myForm._value.curentpass,
          pass: this.myForm._value.pass,
          repetPass: this.myForm._value.repetpass,
          user: localStorage.getItem('user')
        }

        loader.present();

        this.http.post('http://193.226.9.153/resetPassword.php', JSON.stringify(postParams), options).map(res => res.json()).subscribe(data => {

          if (data.success) {
            console.log(data);
            loader.dismiss();
            this.toastCtrl.create({
              message: data.data,
              duration: 2500,
              position: 'top'
            }).present();
          }
          else {
            this.toastCtrl.create({
              message: data.data,
              duration: 2500,
              position: 'top'
            }).present();
            loader.dismiss();
          }

        }, error => {
          console.log(error);
        });

      } else {

        this.toastCtrl.create({
          message: 'Introdu aceleasi valori in campurile "Noua parola" si "Repeta parola".',
          duration: 2500,
          position: 'top'
        }).present();

      }

    } else {
      this.toastCtrl.create({
        message: 'Completeaza toate campurile',
        duration: 2500,
        position: 'top'
      }).present();
    }
    console.log(this.myForm._value);
  }
}
