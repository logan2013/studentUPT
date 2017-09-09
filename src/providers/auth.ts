import { Injectable } from '@angular/core';
import { Platform} from 'ionic-angular';
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
              public nativeStorage: NativeStorage) {
      this.user = localStorage.getItem('user');
  }

  login() {
    this.user = localStorage.getItem('user');
    return new Promise((resolve) => {
      this.http.get('http://193.226.9.153/login.php?user='+this.user).map(res => res.json()).subscribe(data => {
        this.userData = data;
        console.log(this.userData)
        if(this.userData.data != 'user'){
           console.log(this.userData.follow[0].counter);
        }
        resolve(this.userData);    
      });
    });
  }

}
