import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import 'rxjs/add/operator/map';

var usrData;
@IonicPage()
@Component({
  selector: 'page-orar-student',
  templateUrl: 'orar-student.html',
})
export class OrarStudentPage {
  public orar: any = [];
  public userSet: any = [];
  public secretariat: any = '';
  public orarlink: any = "";
  public nume: any = "";
  public specializare: any = "";
  public orare: any[] = [];
  public showContent: any = true;
  public error: any = false;
  constructor(public navCtrl: NavController,
    private iab: InAppBrowser,
    public navParams: NavParams,
    public http: Http,
    public zone: NgZone
  ) {
    this.userSet = localStorage.getItem("dataUser");
    usrData = JSON.parse(this.userSet);
  }

  ionViewDidLoad() {
    try {
      let urlReq: string = 'http://193.226.9.153/coduriFacultati.php?cod=';
      this.http.get((usrData != null) ? urlReq + usrData['Profil'] : urlReq + "try").map(res => res.json()).subscribe((data) => {
        this.error = false;
        this.secretariat = data[0].Secretariat
        this.orarlink = data[0].Orar;
        this.orar = data;
        setTimeout(() => {
          this.showContent = false;
        }, 300)
      }, (err) => {
        this.getAllOr();
      })
    }
    catch (e) {
      console.log(e)
      this.getAllOr();
      this.showContent = false;
    }
  }

  openOrar() {
    this.iab.create(this.orarlink)
  }

  openOrare(link) {
    this.iab.create(link)
  }

  showOrar() {
    this.iab.create('https://docs.google.com/spreadsheets/d/1Xce_iTswniGhthlHVcZZETW0voP94ZJMLWq-mr7Inck/pub?gid=3');
  }

  public getAllOr() {
    this.http.get('http://193.226.9.153/coduriFacultati.php?cod=all')
      .map(res => res.json())
      .toPromise()
      .then((data) => {
        this.showContent = false;
        this.error = true;
        this.orare = data;
      })
  }
}

