import { Component ,ViewChild} from '@angular/core';
import { IonicPage, Content, Events, NavController, NavParams, ModalController } from 'ionic-angular';
import { DataTabs } from '../../providers/datatabs';

@IonicPage()
@Component({
  templateUrl: 'pagina-liga.html',
})
export class PaginaLiga {
  @ViewChild(Content) content: Content;
  public item: any;
  public descriere: any;
  public orar: any;
  public condurere: any;
  public proiecte: any;
  public rootPage: string = "Viewpage"; // timeLine
  public rootDescriere: string = "DescriereFacultate";
  public rootProiecte: string = "ProiecteLiga"
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dataTabs: DataTabs,
    public events: Events,
    public modalCtrl: ModalController) {

    this.item = navParams.get('item');
    this.descriere = navParams.get('descriere');
    this.condurere = navParams.get('conducere');
    this.orar = navParams.get('orar');
    this.proiecte = navParams.get('proiecte');
    this.dataTabs.setMessage(this.item);
    this.dataTabs.setCoducere(this.condurere);
    this.dataTabs.setDescriere(this.descriere);
    this.dataTabs.setOrar(this.orar);
    this.dataTabs.setProiecte(this.proiecte)

    this.events.subscribe('user:scroll', () => {
      console.log('sadasd')
      //  this.content.scrollTo(0,0, 100);
    })
  }

  ionViewDidLoad() {
  }
  presentProfileModal() {
    let profileModal = this.modalCtrl.create('facult-home', { tip: this.item });
    profileModal.present();

  }

  addNew() {
    let profileModall = this.modalCtrl.create('facult-home', { idd: 1, facultate: this.dataTabs.message.note });
    profileModall.present();

  }

  goBack() {
    this.dataTabs.setMessage('');
    this.dataTabs.setCoducere('');
    this.dataTabs.setDescriere('');
    this.dataTabs.setOrar('');
    this.dataTabs.setProiecte('')
    this.navCtrl.pop();
  }
 
}

