import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, NavParams, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';

@IonicPage()
@Component({
  selector: 'page-informatii',
  templateUrl: 'informatii.html',
})
export class Informatii {
  public title: string[] = [];
  public content: string[] = [];
  public imageLink: string[] = [];
  public typeOfPage: number[] = []; // 1 - list page or 2 -content page
  public items: Array<{ title: string, content: string, imageLink: string, typeOfPage: number, statistici: any }>;
  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public http: Http,
    public navParams: NavParams) {
    console.log(this.navCtrl.getViews())

    this.title = ['Statistici pentru admitere '];
    this.content = [`O reprezentare grafica a numarului de studenti inscrisi la fiecare facultate`,
    ];
    this.imageLink = ['http://study.com/cimages/course-image/statistics-for-teachers-professional-development_137460_large.jpg'];



    this.typeOfPage = [1];

    this.http.get('http://193.226.9.153/statistici.php').map(res => res.json()).subscribe(data => {
      this.items = [];
      for (let i = 0; i < this.title.length; i++) {
        this.items.push({
          title: this.title[i],
          content: this.content[i],
          imageLink: this.imageLink[i],
          typeOfPage: this.typeOfPage[i],
          statistici: data
        });
      }
    });

  }

  showContent(item) {
    if (item.typeOfPage == 1) {
      this.modalCtrl.create('ShowChart', { item: item }).present();

    } else {
      this.modalCtrl.create('ShowContent', { item: item }).present();
    }
  }

}
