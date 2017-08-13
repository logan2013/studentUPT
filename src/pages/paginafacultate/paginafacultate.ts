import { Component, ViewChild, Renderer, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ModalController, Content, Navbar } from 'ionic-angular';
import { DataTabs } from '../../providers/datatabs';

@IonicPage()
@Component({
  selector: 'page-paginafacultate',
  templateUrl: 'paginafacultate.html',
})
export class Paginafacultate {
  @ViewChild(Content) content: Content;
  @ViewChild(Navbar) navbar: Navbar;
  start = 0;
  threshold = 100;
  slideHeaderPrevious = 0;
  ionScroll: any;
  showheader: boolean;
  hideheader: boolean;
  headercontent: any;
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
    public renderer: Renderer ,
    public myElement: ElementRef,
    public dataTabs: DataTabs,
    public events: Events,
    public modalCtrl: ModalController) {
    this.showheader = false;
    this.hideheader = true;
    this.item = navParams.get('item');
    this.descriere = navParams.get('descriere');
    this.condurere = navParams.get('conducere');
    this.orar = navParams.get('orar');
    this.dataTabs.setMessage(this.item);
    this.dataTabs.setCoducere(this.condurere);
    this.dataTabs.setDescriere(this.descriere);
    this.dataTabs.setOrar(this.orar);

  }
  ngOnInit() {
    // Ionic scroll element
    this.ionScroll = this.myElement.nativeElement.getElementsByClassName('scroll-content')[0];
    // On scroll function
    this.ionScroll.addEventListener("scroll", () => {
      if (this.ionScroll.scrollTop - this.start > this.threshold) {
        this.showheader = true;
        this.hideheader = false;
      } else {
        this.showheader = false;
        this.hideheader = true;
      }
      if (this.slideHeaderPrevious >= this.ionScroll.scrollTop - this.start) {
        this.showheader = false;
        this.hideheader = true;
      }
      this.slideHeaderPrevious = this.ionScroll.scrollTop - this.start;
    });
  }
  scrollToTop() {

  }
  ionViewDidLoad() {
  }
  presentProfileModal() {
    let profileModal = this.modalCtrl.create('facult-home', { tip: this.item });
    profileModal.present();
    this.events.publish('user:back', 1);
  }

  addNew() {
    let profileModall = this.modalCtrl.create('facult-home', { idd: 1, facultate: this.dataTabs.message.note });
    profileModall.present();

  }

  goBack() {
    this.navCtrl.pop();
  }

}
