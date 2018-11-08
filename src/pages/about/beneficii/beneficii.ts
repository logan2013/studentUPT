import { Component, ViewChild } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-beneficii',
  templateUrl: 'beneficii.html',
})
export class Beneficii {

  public title: string[] = [];
  public content: string[] = [];
  public imageLink: string[] = [];
  public preview: string[] = [];
  public typeOfPage: number[] = []; // 1 - list page or 2 -content page
  public items: Array<{ title: string, content: string, imageLink: string, typeOfPage: number, preview: string, text: any }>;
  @ViewChild('videoPlayer') mVideoPlayer: any;
  constructor(
    public modalCtrl: ModalController,
    private http: Http
  ) {
    this.typeOfPage = [0, 1, 0];
    this.items = [];
    this.http.get('http://193.226.9.153/beneficiiUPT.php').map(res => res.json())
      .subscribe((data) => {
        this.title = data.title;
        this.content = data.content;
        this.imageLink = data.imageLink;
        this.preview = data.preview;
        for (let i = 0; i < this.title.length; i++) {
          this.items.push({
            title: this.title[i],
            content: this.content[i],
            imageLink: this.imageLink[i],
            typeOfPage: this.typeOfPage[i],
            preview: this.preview[i],
            text: ""
          });
        }
      });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Beneficii');
  }

  showContent(item) {
    this.modalCtrl.create('ShowContent', { item: item }).present();
  }

}
