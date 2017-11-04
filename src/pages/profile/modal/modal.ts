import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';


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
  constructor(public navCtrl: NavController, public navParams: NavParams, private app: App) {
    this.slides = [
      {
        title: "",
        description: "",
        image: '../assets/s2_b.png',
      },
      {
        title: "",
        description: "",
        image: '../assets/s3_b.png',
      },
      {
        title: "",
        description: "",
        image: '../assets/s4_b.png',
      }
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPage');
  }
  startApp() {
    localStorage.setItem('slide', 'true');
    // this.app.getRootNav().setRoot('Login');
    this.navCtrl.setRoot("Login", {}, {
      animate: true,
      direction: 'left'
    });
  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd();
  }

}
