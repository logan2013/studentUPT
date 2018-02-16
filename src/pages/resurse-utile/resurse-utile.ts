import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

export interface ResurseUtile {
  titlu: string,
  description: string,
  imageLink: string,
  urlResursa: string
};

export interface reqData {
  success: boolean,
  data: ResurseUtile[]
}
@IonicPage()
@Component({
  selector: 'page-resurse-utile',
  templateUrl: 'resurse-utile.html',
})
export class ResurseUtilePage {
  public server: string = "http://193.226.9.153";
  public resurse: ResurseUtile[];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http
  ) {
    this.getRes().toPromise().then((value: any) => {
      this.resurse = value.data;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResurseUtilePage');
  }

  public getRes() {
    return this.http.get(this.server + '/getRes.php').map(res => res.json());
  }
}
