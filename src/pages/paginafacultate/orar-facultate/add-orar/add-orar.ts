import { IDateFormatter } from 'ionic2-calendar/calendar';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-add-orar',
  templateUrl: 'add-orar.html',
})
export class AddOrarPage {
  public myForm: any;
  public all: Array<{ startTime: string, endTime: string, title: any, allDay: any, show: boolean, id: any }> = [];
  event = { startTime: new Date().toISOString(), endTime: new Date().toISOString(), allDay: false };
  minDate = new Date().toISOString();
  public type: any;
  public events: any = [];
  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    private navParams: NavParams,
    public viewCtrl: ViewController) {

    this.myForm = this.formBuilder.group({
      title: [''],
      startTime: [''],
      endTime: [''],
      allDay: [''],
      id: ['']
    });
    let preselectedDate = moment(this.navParams.get('selectedDay')).format();
    this.type = this.navParams.get('type');
    this.events = this.navParams.get('events');
    if (this.type == 'edit') {
      for (let i = 0; i < this.events.length; i++) {
        this.all.push({
          title: this.events[i].title,
          startTime: moment(this.events[i].startTime).format(),
          endTime: moment(this.events[i].endTime).format(),
          allDay: this.events[i].allDay,
          show: false,
          id: this.events[i].id
        });
      }
    }
    this.event.startTime = preselectedDate;
    this.event.endTime = preselectedDate;

  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  save() {
    this.viewCtrl.dismiss(this.event);
  }

  delete(ev) {
    this.viewCtrl.dismiss(ev);
  }

  edit(ev) {
    console.log(ev)
    this.viewCtrl.dismiss(ev);
  }
}