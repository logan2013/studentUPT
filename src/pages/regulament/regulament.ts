import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FileChooser } from '@ionic-native/file-chooser';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import * as firebase from 'firebase';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-regulament',
  templateUrl: 'regulament.html',
})
export class RegulamentPage {
  public nativepath: any;
  public firestore = firebase.storage();
  public imgsource: any;
  public title: any = [];
  constructor( private http: Http, public navCtrl: NavController, public navParams: NavParams, private fileChooser: FileChooser, private file: File, private filePath: FilePath, private zone: NgZone) {
    this.http.get('http://193.226.9.153/regulamente.php').map(res => res.json()).subscribe((data) => {
      this.title = data;
    });
  }
  
  showPDF(url) {
    console.log('asda')
    window.open(url, '_system', 'location=yes');
  }



}
