import { Component } from '@angular/core';
import { IonicPage, NavController, Events, NavParams, AlertController, ModalController } from 'ionic-angular';
import { Http } from '@angular/http';
import { DataTabs } from '../../../providers/datatabs';
import { Auth } from '../../../providers/auth';
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-orar-facultate',
  templateUrl: 'orar-facultate.html',
})
export class OrarFacultate {
  private showCalendar: boolean = true;
  private showTabel: boolean = false;
  private orar: any = [];
  private eventss: any = [];
  private eventData: Array<{ startTime: any, endTime: any, title: any, allDay: boolean, id: any }> = [];
  private eventSource = [];
  private viewTitle: string;
  private selectedDay = new Date();
  private fullinfo: any = [];
  private startToggle: any = 1;
  private userData: any = [];
  private onetime: any;
  private calendar = {
    mode: 'month',
    currentDate: new Date()
  };

  constructor(
    private dataTabs: DataTabs,
    private modalCtrl: ModalController,
    private auth: Auth,
    private events: Events,
    private http: Http,
    private navCtrl: NavController,
    private navParams: NavParams,
    private alertCtrl: AlertController) {
    events.subscribe('user:back', () => {
    });
    this.auth.login().then((isLoggedIn) => {
      this.userData = isLoggedIn;
    });

    this.eventSource = this.dataTabs.orar[0].eventSource;
    this.eventss = this.eventSource;

    this.http.get('http://193.226.9.153/sendOrar.php?typeofrequest=get&user=' + this.dataTabs.message.note).map(res => res.json()).subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        let eventData: any = [];
        this.eventData.push({
          title: data[i].title,
          startTime: new Date(data[i].startTime),
          endTime: new Date(data[i].endTime),
          allDay: (data[i].allday == "true"),
          id: data[i].id
        })
      }
      this.eventSource = this.eventData;

    })
    this.orar = this.dataTabs.orar;
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
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
    this.fullinfo = ev.events;
  }

  private toggle() {
    if (this.startToggle == 1) {
      this.showCalendar = !this.showCalendar;
      this.startToggle = 0;
      let scope = this;
      setTimeout(function () {
        scope.startToggle = 1;
      }, 1000)
    }
  }

  addEvent() {
    let modal = this.modalCtrl.create('AddOrarPage', { selectedDay: this.selectedDay, type: 'add' });
    modal.present();
    modal.onDidDismiss(data => {
      if (data) {
        let eventData = data;
        eventData.startTime = new Date(data.startTime);
        eventData.endTime = new Date(data.endTime);
        let events = this.eventSource;
        events.push(eventData);
        this.eventSource = [];
        setTimeout(() => {
          this.eventSource = events;
          this.http.get('http://193.226.9.153/sendOrar.php?user=' + this.userData.facultate +
            '&title=' + eventData.title + '&start= ' + eventData.startTime +
            '&end=' + eventData.endTime + '&allday=' + eventData.allDay +
            '&typeofrequest=insert').map(res => res.json()).subscribe();
        });
      }
    });
  }

  deleteEvent() {
    let modal = this.modalCtrl.create('AddOrarPage', { selectedDay: this.selectedDay, type: 'delete', events: this.fullinfo });
    modal.present();
    modal.onDidDismiss(data => {
      if (data) {
        let eventData = data;
        eventData.startTime = new Date(data.startTime);
        eventData.endTime = new Date(data.endTime);
        let events = this.eventSource;
        for (let i = 0; i < events.length; i++) {
          if (events[i].title == eventData.title && events[i].startTime == eventData.startTime && events[i].endTime == eventData.endTime) {
            events.splice(i, 1);
          }
        }
        this.eventSource = [];
        setTimeout(() => {
          this.eventSource = events;
          this.http.get('http://193.226.9.153/sendOrar.php?user=' + this.userData.facultate +
            '&id=' + eventData.id +
            '&typeofrequest=delete').map(res => res.json()).subscribe();
        });
      }
    });
  }

  editEvent() {
    let modal = this.modalCtrl.create('AddOrarPage', { selectedDay: this.selectedDay, type: 'edit', events: this.fullinfo });
    modal.present();
    modal.onDidDismiss(data => {
      if (data) {
        let eventData: any = [];
        eventData.startTime = new Date(data.startTime);
        eventData.endTime = new Date(data.endTime);
        eventData.title = data.title;
        eventData.allDay = data.allDay;
        let events = this.eventSource;
        for (let i = 0; i < events.length; i++) {
          if (events[i].id == data.id) {
            events[i] = eventData;
          }
        }
        this.eventSource = [];
        setTimeout(() => {
          this.eventSource = events;
          this.http.get('http://193.226.9.153/sendOrar.php?user=' + this.userData.facultate +
            '&title=' + eventData.title + '&start= ' + eventData.startTime +
            '&end=' + eventData.endTime + '&allday=' + eventData.allDay +
            '&typeofrequest=edit&id=' + data.id).map(res => res.json()).subscribe();
        })
      }
    });
  }
}
