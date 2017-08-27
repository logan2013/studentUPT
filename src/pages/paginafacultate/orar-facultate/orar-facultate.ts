import { Component } from '@angular/core';
import { IonicPage, NavController, Events, NavParams, AlertController, ModalController } from 'ionic-angular';
import { DataTabs } from '../../../providers/datatabs';
import { Http } from '@angular/http';
import * as moment from 'moment';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Auth } from '../../../providers/auth';

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
  public eventss: any = [];
  public eventData: Array<{ startTime: any, endTime: any, title: any, allDay: boolean, id: any }> = [];
  public eventSource = [];
  public viewTitle: string;
  public selectedDay = new Date();
  public fullinfo: any = [];
  public startToggle: any = 1;
  public userData: any = [];
  public onetime: any;
  public calendar = {
    mode: 'month',
    currentDate: new Date()
  };

  constructor(public dataTabs: DataTabs,
    private localNotifications: LocalNotifications,
    private modalCtrl: ModalController,
    public auth: Auth,
    public events: Events,
    public http: Http,
    public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    // this.localNotifications.schedule({
    //   text: 'Notificare locala',
    //   at: new Date(new Date().getTime() + 3600),
    //   led: 'FF0000',
    //   sound: null
    // });
    events.subscribe('user:back', () => {
      console.log('aas')
      // user and time are the same arguments passed in `events.publish(user, time)`
      // this.eventSource = [];
    });
    this.auth.login().then((isLoggedIn) => {
      this.userData = isLoggedIn;
      // console.log(this.userData)
      // console.log(isLoggedIn)
    });
    // console.log(this.eventSource)
    this.eventSource = this.dataTabs.orar[0].eventSource;
    this.eventss = this.eventSource;

    this.http.get('http://193.226.9.153/sendOrar.php?typeofrequest=get&user=' + this.dataTabs.message.note).map(res => res.json()).subscribe(data => {

      for (let i = 0; i < data.length; i++) {
        let eventData: any = [];
        this.eventData.push({
          title: data[i].title,
          startTime: new Date(data[i].startTime),
          endTime: new Date(data[i].endTime),
          allDay: Boolean(data[i].allday),
          id: data[i].id
        })
      }
      this.eventSource = this.eventData;

    })
    // console.log(this.dataTabs.orar)
    this.orar = this.dataTabs.orar;
    // console.log(this.orar)
  }
 
  ionViewDidLeave() {
    console.log('ies')
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad OrarFacultate');
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
    // console.log(ev)
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

  addEvent() {
    console.log(this.fullinfo)
    let modal = this.modalCtrl.create('AddOrarPage', { selectedDay: this.selectedDay, type: 'add' });
    modal.present();
    modal.onDidDismiss(data => {
      if (data) {
        let eventData = data;
        console.log(eventData, localStorage.getItem('user'))
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
            '&typeofrequest=insert').map(res => res.json()).subscribe(data => {
              console.log('data')
            });
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
        console.log(eventData, localStorage.getItem('user'), eventData.title)
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
            '&typeofrequest=delete').map(res => res.json()).subscribe(data => {
              console.log(data)
            });
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
        console.log(eventData)
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
            '&typeofrequest=edit&id=' + data.id).map(res => res.json()).subscribe(data => {
              // console.log(data)
            });

        })
      }
    });
  }
}
