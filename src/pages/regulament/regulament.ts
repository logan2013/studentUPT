import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RegulamentPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-regulament',
  templateUrl: 'regulament.html',
})
export class RegulamentPage {
  public title: any = [
    {
      title: 'Codul drepturilor și obligațiilor studentului din Universitatea “Politehnica” din Timișoara',
      url: 'http://193.226.9.153/regulamente/Codul drepturilor și obligațiilor studentului din Universitatea “Politehnica” din Timișoara.pdf'
    }, {
      title: `Regulament privind organizarea si functionarea Complexului de Cazare al Universitatii Politehnica Timisoara`,
      url: 'http://193.226.9.153/regulamente/Regulament privind organizarea si functionarea Complexului de Cazare al Universitatii Politehnica Timisoara.pdf'
    }, {
      title: `Regulament de Alegerea Studentilor Reprezentanti`,
      url: 'http://193.226.9.153/regulamente/Regulament de Alegerea Studentilor Reprezentanti.pdf'
    }, {
      title: `Regulament privind repartizarea locurilor de tabara in cadrul Universitatii Politehnica Timisoara`,
      url: 'http://193.226.9.153/regulamente/Regulament privind repartizarea locurilor de tabara in cadrul Universitatii Politehnica Timisoara.pdf'
    }, {
      title: `Regulament de organizare si desfasurare a procesului de invatamant la ciclul de studii Licenta din Universitatea Politehnica Timisoara`,
      url: 'http://193.226.9.153/regulamente/Regulament de organizare si desfasurare a procesului de invatamant la ciclul de studii Licenta din Universitatea Politehnica Timisoara.pdf'
    }, {
      title: `Regulament de Acordare Credite Voluntariat`,
      url: 'http://193.226.9.153/regulamente/Regulament de Acordare Credite Voluntariat.pdf'
    }];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegulamentPage');
  }
  showPDF(url) {
    console.log('asda')
    window.open(url, '_system', 'location=yes');


    // this.document.viewDocument('http://tivatheme.com/file-download-calendar/admin/report/files/example.pdf', 'application/pdf', options);
  }
}
