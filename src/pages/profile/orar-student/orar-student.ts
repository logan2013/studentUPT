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

  public orar: any = [];
  public userSet: any = [];
  public secretariat: any = '';
  public orarlink: any = "";
  public nume: any = "";
  public specializare: any = "";
  constructor(public navCtrl: NavController,
    private iab: InAppBrowser,
    public navParams: NavParams,
    public http: Http) {
    try {

      this.userSet = localStorage.getItem("dataUser");
      var usrData = JSON.parse(this.userSet);
      this.http.get('http://193.226.9.153/coduriFacultati.php?cod=' + usrData['Profil']).map(res => res.json()).subscribe((data) => {
        setTimeout(() => {

          document.getElementById("nume").innerHTML = data[0].Nume;
          document.getElementById("specializare").innerHTML = data[0].Specializare;
          document.getElementById("text").innerHTML = data[0].Secretariat;
          this.nume = data[0].Nume;
          this.specializare = data[0].Specializare;
          this.secretariat = data[0].secretariat
        }, 1000)

        this.orarlink = data[0].Orar;
        this.orar = data;
      });
    }
    catch (e) {
    
    }
  }

  ionViewDidLoad() {
    try {
      this.userSet = localStorage.getItem("dataUser");
      var usrData = JSON.parse(this.userSet);
      this.http.get('http://193.226.9.153/coduriFacultati.php?cod=' + usrData['Profil']).map(res => res.json()).subscribe((data) => {
        setTimeout(() => {

          document.getElementById("nume").innerHTML = data[0].Nume;
          document.getElementById("specializare").innerHTML = data[0].Specializare;
          document.getElementById("text").innerHTML = data[0].Secretariat;
          this.nume = data[0].Nume;
          this.specializare = data[0].Specializare;
          this.secretariat = data[0].secretariat
        }, 1000)

        this.orarlink = data[0].Orar;
        this.orar = data;
      });
    }
    catch (e) {
      console.log(e)
    }
  }

  openOrar() {
    this.iab.create(this.orarlink)
  }

  showOrar() {
    this.iab.create('https://docs.google.com/spreadsheets/d/1Xce_iTswniGhthlHVcZZETW0voP94ZJMLWq-mr7Inck/pub?gid=3');
  }
}

