import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer';

/**
 * Generated class for the NotePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-note',
  templateUrl: 'note.html',
})
export class NotePage {
  pet: string = 'studiu';

  items = [
    {
      name: 'Teoria sistemelor 1',
      description: {
        formaev: 'e',
        credite: '4',
        orecurs: '28',
        orelab: '28',
        oreproiect: '28',
        totalore: '56',
        sem: '3',
        an: '2016'
      }
    },
    {
      name: 'Principii, tehnici şi dispozitive de măsurare',
      description: {
        formaev: 'e',
        credite: '4',
        orecurs: '28',
        orelab: '28',
        oreproiect: '28',
        totalore: '56',
        sem: '3',
        an: '2016'
      }
    },
    {
      name: 'Programarea orientată pe obiecte',
      description: {
        formaev: 'e',
        credite: '4',
        orecurs: '28',
        orelab: '28',
        oreproiect: '28',
        totalore: '56',
        sem: '3',
        an: '2016'
      }
    },
    {
      name: 'Structuri de date şi algoritmi',
      description: {
        formaev: 'e',
        credite: '4',
        orecurs: '28',
        orelab: '28',
        oreproiect: '28',
        totalore: '56',
        sem: '3',
        an: '2016'
      }
    },
    {
      name: 'Structuri de date şi algoritmi',
      description: {
        formaev: 'e',
        credite: '4',
        orecurs: '28',
        orelab: '28',
        oreproiect: '28',
        totalore: '56',
        sem: '3',
        an: '2016'
      }
    },
    {
      name: 'Structuri de date şi algoritmi',
      description: {
        formaev: 'e',
        credite: '4',
        orecurs: '28',
        orelab: '28',
        oreproiect: '28',
        totalore: '56',
        sem: '3',
        an: '2016'
      }
    },
    {
      name: 'Structuri de date şi algoritmi',
      description: {
        formaev: 'e',
        credite: '4',
        orecurs: '28',
        orelab: '28',
        oreproiect: '28',
        totalore: '56',
        sem: '3',
        an: '2016'
      }
    }, {
      name: 'Structuri de date şi algoritmi',
      description: {
        formaev: 'e',
        credite: '4',
        orecurs: '28',
        orelab: '28',
        oreproiect: '28',
        totalore: '56',
        sem: '3',
        an: '2016'
      }
    },
    {
      name: 'Structuri de date şi algoritmi',
      description: {
        formaev: 'e',
        credite: '4',
        orecurs: '28',
        orelab: '28',
        oreproiect: '28',
        totalore: '56',
        sem: '3',
        an: '2016'
      }
    },
    {
      name: 'Structuri de date şi algoritmi',
      description: {
        formaev: 'e',
        credite: '4',
        orecurs: '28',
        orelab: '28',
        oreproiect: '28',
        totalore: '56',
        sem: '3',
        an: '2016'
      }
    },
    {
      name: 'Structuri de date şi algoritmi',
      description: {
        formaev: 'e',
        credite: '4',
        orecurs: '28',
        orelab: '28',
        oreproiect: '28',
        totalore: '56',
        sem: '3',
        an: '2016'
      }
    }
  ]
  constructor(public navCtrl: NavController, public navParams: NavParams, private document: DocumentViewer) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotePage');
  }

  showPDF() {
    console.log('asda')
    const options: DocumentViewerOptions = {
      title: 'My PDF'
    };
    this.document.viewDocument('assets/pdf.pdf', 'application/pdf', options);
  }
}
