import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ConducereUpt page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-conducere-upt',
  templateUrl: 'conducere-upt.html',
})
export class ConducereUpt {
  public functie: any = [];
  public nume: any = [];
  public image: any = [];
  public resort: any = [];
  public adresa: any = [];
  public telfax: any = [];
  public email: any = [];

  public all: Array<{ functie: any, nume: any, image: any, resort: any, adresa: any, telfax: any, email: any }>;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.functie = [
      'Rector',
      'Prorector',
      'Prorector',
      'Prorector',
      'Prorector',
      'Prorector',
      'Director general administrativ'
    ];

    this.nume = [
      'Prof.univ.dr.ing. Viorel-Aurel ŞERBAN',
      'Prof.univ.dr.ing. Corneliu - Mircea DAVIDESCU',
      'Prof.univ.dr.ing.  Marius-Emil OTEŞTEANU',
      'Prof.univ.dr.ing. Daniel DAN',
      'Conf.univ.dr.ing. Florin DRĂGAN',
      'Conf.univ.dr. Liviu Ioan CĂDARIU-BRĂILOIU',
      'Dr.ing. Florențiu STAICU'
    ];

    this.image = [
      'upt/serban.jpg',
      'upt/davidescu.jpg',
      'upt/oltesteanu.jpg',
      'upt/dan.jpg',
      'upt/dragan.jpg',
      'upt/cadariu-brailoiu.jpg',
      'upt/staicu.jpg'
    ];

    this.resort = [
      '',
      'managementul resurselor și politici financiare, evaluare instituțională',
      'relații internaționale, imagine și comunicare',
      'gestiunea patrimoniului și relația cu mediul economic și sectorul public',
      'proces de învățământ, problematică studențească și asigurarea calității',
      'cercetare științifică, inovare, transfer tehnologic, resurse umane',
      ''
    ];

    this.adresa = [
      'Rectorat, Piața Victoriei nr.2, etaj 3, cab.317 Timișoara, 300006',
      'Rectorat, Piața Victoriei nr.2, etaj 3, cab.321Timișoara,300006',
      'Rectorat, Piața Victoriei nr.2, etaj 3, cab.308 Timișoara, 300006',
      'Rectorat, Piața Victoriei nr.2, etaj 3, cab.311 Timișoara, 300006',
      'Rectorat, Piața Victoriei nr.2, etaj 3, cab.312 Timișoara, 300006',
      'Rectorat, Piața Victoriei nr.2 Timișoara, 300006',
      'Rectorat, Piața Victoriei nr.2, etaj 3, cab.304 Timișoara, 300006'
    ];

    this.telfax = [
      'Tel./Fax: 0256 – 403011 / 0256 – 403021',
      'Tel./Fax: 0256 – 403012/ 0256 – 403022',
      'Tel./Fax: 0256 – 403014 / 0256 – 403024',
      'Tel./Fax: 0256 – 403160 / 0256 – 403161',
      'Tel./Fax: 0256 – 403013 / 0256 – 403023',
      'Tel./Fax: 0256 - 403018 / 0256 - 403028',
      'Tel./Fax: 0256 – 403016 / 0256 – 403026'
    ];

    this.email = [
      'emiliana.ieli@upt.ro',
      'simona.damian@upt.ro',
      'laura.mirica@upt.ro',
      'laura.ciutina@upt.ro',
      'iolanda.cosovan@upt.ro',
      'iolanda.cosovan@upt.ro',
      'monica.jurjiu@upt.ro'
    ];

    this.all = [];
    for (let i: number = 0; i < this.nume.length; i++) {
      this.all.push({
        functie: this.functie[i],
        nume: this.nume[i],
        image: this.image[i],
        resort: this.resort[i],
        adresa: this.adresa[i],
        telfax: this.telfax[i],
        email: this.email[i]
      })
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConducereUpt');
  }

}
