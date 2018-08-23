import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { Auth } from '../../../providers/auth';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  templateUrl: 'descriere-upt.html',
})
export class DescriereUpt {
  public server: string;
  public descriere: string;
  constructor(private auth: Auth, private http: Http) { }

  ionViewWillEnter() {
    this.server = this.auth.server + "/images/upt/legitimatie.jpg";
    this.http.get('http://193.226.9.153/descriereUPT.php').map(res => res.json())
      .subscribe((data) => {
        this.descriere = data.descriere;
      })

  }
}

