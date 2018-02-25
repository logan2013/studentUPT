import { Injectable } from '@angular/core';
import { Platform, Events } from 'ionic-angular';
import { Http } from '@angular/http';
import { NativeStorage } from '@ionic-native/native-storage';
import 'rxjs/add/operator/map';

@Injectable()
export class Auth {
  public userData: any = [];
  public user: any;
  public run: boolean = true;
  public modal: boolean = false;
  public server: string = "http://193.226.9.153";
  constructor(public http: Http,
    public platform: Platform,
    public events: Events,
    public nativeStorage: NativeStorage) {
    this.user = localStorage.getItem('user');
  }

  login() {
    this.user = localStorage.getItem('user');
    return new Promise((resolve) => {
      if (JSON.parse(localStorage.getItem("dataUser")) !== null) {
        this.http.get('http://193.226.9.153/getUserPhoto.php?user=' + this.user).map(res => res.json()).subscribe(data => {
          if (data.success == true) {
            this.events.publish("updatePhoto", (data.photo));
            localStorage.setItem('photo', data.photo);
            localStorage.setItem('enableNotification', data.enableNotification);
            localStorage.setItem('phoneid', data.phoneid);
          } else {
            localStorage.removeItem('photo');
          }
        })
        resolve(
          {
            "success": true,
            "data": this.user,
            "facultate": null,
            "right": "0",
          }
        )
      } else {
        this.http.get('http://193.226.9.153/login.php?user=' + this.user).map(res => res.json()).subscribe(data => {
          this.userData = data;
          console.log(this.userData)
          if (this.userData.data != 'user') {
            console.log(this.userData.follow[0].counter);
          }
          resolve(this.userData);
        });
      }
    });
  }

  checkServer() {
    return new Promise((resolve) => {
      this.http.get('https://193.226.9.153').map(res => res.json()).subscribe(data => {
        resolve(data);
      });
    });
  }

}
