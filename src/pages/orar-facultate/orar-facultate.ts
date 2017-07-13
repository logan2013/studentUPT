import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { DataTabs } from '../../providers/datatabs';
import * as moment from 'moment';
import { LocalNotifications } from '@ionic-native/local-notifications';

/**
 * Generated class for the OrarFacultate page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-orar-facultate',
  templateUrl: 'orar-facultate.html',
})
export class OrarFacultate {
  public showCalendar: boolean = true;
  public showTabel: boolean = false;
  public orar: any = [];
  public eventSource = [];
  public viewTitle: string;
  public selectedDay = new Date();
  public startToggle: any = 1;
  public calendar = {
    mode: 'month',
    currentDate: new Date()
  };
  constructor(public dataTabs: DataTabs,
    private localNotifications: LocalNotifications,
    public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    this.localNotifications.schedule({
      text: 'Notificare locala',
      at: new Date(new Date().getTime() + 3600),
      led: 'FF0000',
      sound: null
    });
    this.eventSource = this.dataTabs.orar[0].eventSource;
    console.log(this.dataTabs.orar)
    this.orar = this.dataTabs.orar;
    console.log(this.orar)
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad OrarFacultate');
  }
  onViewTitleChanged(title) {
    this.viewTitle = title;
    window.scrollTo(0, 0)
    
  }

  onEventSelected(event) {
    let start = moment(event.startTime).format('LLLL');
    let end = moment(event.endTime).format('LLLL');
    if (start == end) {
      this.alertCtrl.create({
        title: '' + event.title,
        subTitle: 'At: ' + start,
        buttons: ['OK']
      }).present()
    } else {
      this.alertCtrl.create({
        title: '' + event.title,
        subTitle: 'From: ' + start + '<br>To: ' + end,
        buttons: ['OK']
      }).present()
    }


  }

  onTimeSelected(ev) {
    this.selectedDay = ev.selectedTime;
    window.scrollTo(0, 0)
  }

  public toggle() {
    if (this.startToggle == 1) {
      this.showCalendar = !this.showCalendar;
      this.startToggle = 0;
      console.log(this.startToggle)
      let scope = this;
      setTimeout(function () {
        scope.startToggle = 1;
        console.log(scope.startToggle)
      }, 1000)
    }
  }
}
