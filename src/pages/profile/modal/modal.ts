import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, MenuController } from 'ionic-angular';


export interface Slide {
  title: string;
  description: string;
  image: string;
}

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {
  loading: any;
  slides: Slide[];
  showSkip = true;
  constructor(public navCtrl: NavController, public navParams: NavParams, private app: App, public menuCtrl: MenuController) {
    this.slides = [
      {
        title: "",
        description: "",
        image: 'http://193.226.9.153/images/s2_b.png',
      },
      {
        title: "",
        description: "",
        image: 'http://193.226.9.153/images/s3_b.png',
      },
      {
        title: "",
        description: "",
        image: 'http://193.226.9.153/images/s4_b.png',
      }
    ];
    this.menuCtrl.enable(false);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPage');
  }
  startApp() {
    localStorage.setItem('slide', 'true');
    this.navCtrl.setRoot("Login", {}, {
      animate: true,
      direction: 'left'
    });
  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd();
  }

}
