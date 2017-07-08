import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { DataTabs } from '../../providers/datatabs';

@IonicPage()
@Component({
  selector: 'page-paginafacultate',
  templateUrl: 'paginafacultate.html',
})
export class Paginafacultate {
  public item: any;
  public descriere: any;
  public orar: any;
  public condurere: any;
  public rootPage: string = "Viewpage"; // timeLine
  public rootOrar: string = "OrarFacultate";
  public rootDescriere: string = "DescriereFacultate";
  public rootConducere: string = "ConducereFacultate"
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dataTabs: DataTabs,
    public modalCtrl: ModalController) {

    this.item = navParams.get('item');
    this.descriere = navParams.get('descriere');
    this.condurere = navParams.get('conducere');
    this.orar = navParams.get('orar');
    this.dataTabs.setMessage(this.item);
    this.dataTabs.setCoducere(this.condurere);
    this.dataTabs.setDescriere(this.descriere);
    this.dataTabs.setOrar(this.orar);

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
    this.navCtrl.pop();
  }

}
