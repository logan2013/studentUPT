import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import 'rxjs/add/operator/map';

/**
 * Generated class for the OrarStudentPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-orar-student',
  templateUrl: 'orar-student.html',
})
export class OrarStudentPage {
  public zile: any = 'Luni';
  public orar: any = [];
  public luni: any = [];
  public marti: any = [];
  public miercuri: any = [];
  public joi: any = [];
  public vineri: any = [];
  constructor(public navCtrl: NavController,
    private iab: InAppBrowser,
    public navParams: NavParams,
    public http: Http) {


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrarStudentPage');
    // this.http.get('http://localhost:8081').map(res => res.json()).subscribe((data) => {
    //   console.log(data)
    // });

    // let headers = new Headers();
    // headers.append("Accept", 'application/json');
    // headers.append('Content-Type', 'application/json');

    // let body = {
    //   user: 'bogdan',
    //   name: 'Budescu',
    //   body: 'ad'
    // };

    // this.http.post('http://localhost:8081/user/req', JSON.stringify(body), { headers: headers }).map(res => res.json()).subscribe((data) => {
    //   console.log(data)
    // });
    // this.http.get('http://atestate-inf.tk/ghidtest/readxls.php').map(res => res.json()).subscribe((data) => {
    //   this.orar = data[0];
    //   console.log(this.orar[0])

    //   let count = 0;
    //   for (let i = 2; i < this.orar.orar.length; i++) {
    //     count++;
    //     if (count < 14) {
    //       this.luni.push(this.orar.orar[i])
    //     } else if (count >= 15 && count < 28) {
    //       this.marti.push(this.orar.orar[i])
    //     }
    //   }
    //   console.log(this.luni, this.marti)
    // });
  }

  showOrar() {
    this.iab.create('https://docs.google.com/spreadsheets/d/1Xce_iTswniGhthlHVcZZETW0voP94ZJMLWq-mr7Inck/pub?gid=3');
  }
}
