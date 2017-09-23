import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-regulament',
  templateUrl: 'regulament.html',
})
export class RegulamentPage {
  public title: any = [];
  constructor( private http: Http, public navCtrl: NavController, public navParams: NavParams) {
    this.http.get('http://193.226.9.153/regulamente.php').map(res => res.json()).subscribe((data) => {
      this.title = data;
    });
  }
  
  showPDF(url) {
    console.log('asda')
    window.open(url, '_system', 'location=yes');
  }

}
