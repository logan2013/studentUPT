import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ToastController, ModalController, AlertController} from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Auth } from '../../providers/auth';
import { Http } from '@angular/http';
import { OneSignal } from '@ionic-native/onesignal';
@IonicPage()
@Component({
  selector: 'page-facultati',
  templateUrl: 'facultati.html',
})

export class Facultati {
  public selectedItem: any;
  public posts: any;
  public postss: any;
  public id: any;
  public icons: string[];
  public faculties: string[];
  public user: string;
  public danger: string = "danger";
  public favorite: string = "Follow";
  public info: any = [];
  private notes: any[];
  public series: any[];
  public items: Array<{title: string, note: string, iconActive: any, faculties: string, favorite: string, serie: string[]}>=[];
  constructor(
          public auth: Auth,
          public http: Http,
          public oneSignal: OneSignal,
          public alertCtrl: AlertController,
          public navCtrl: NavController, 
          public modalCtrl: ModalController,
          public toastCtrl: ToastController,
          public navParams: NavParams) {
    this.user = localStorage.getItem('user');
    this.auth.login().then((isLoggedIn) => {
      this.info = isLoggedIn;
      console.log(this.info)
      this.selectedItem = navParams.get('item');
      this.notes= ['ACUPT','CHIUPT','EEUPT','ETCUPT','MECUPT','MPTUPT','OSTLUPT'];
      this.faculties = [
        'Facultatea de Automatica si Calculatoare',
        'Facultatea de Chimie Industriala si Ingineria Mediului',
        'Facultatea Electrotehnica si Electroenergetica',
        'Facultatea de Electronica si Telecomunicatii',
        'Facultatea de Mecanica',
        'Facultatea de Management si Productie in Transporturi',
        'Facultatea de Arhitectura si Urbanism'];
      this.items = [];
      console.log(this.selectedItem)
      // If we navigated to this page, we will have an item available as a nav param
      if(this.info.data == "user"){
          for(let i = 0; i < 7; i++) {
            // for(let j = 0; j < this.info.follow.length; j++){
            //   if(this.notes[i] == this.info.follow[j].value && this.info.follow[j].counter == 1 ){
            //       this.danger = "secondary";
            //       this.favorite = "Unfollow";
            //   }
            //   else if(this.notes[i] == this.info.follow[j].value && this.info.follow[j].counter == 0){
            //     this.danger = "danger";
            //     this.favorite = "Follow"
            //   }
            // }
            if(this.notes[i] == 'ACUPT'){
              this.series = ['Ingineria Sistemelor','Calculatoare si Tehnologia Informatiei','Informatica']
            }
            else{
              this.series = [];
            }
            this.items.push({
              title: this.faculties[i],
              note: this.notes[i],
              iconActive:"",
              faculties:this.faculties[i],
              favorite:"",
              serie:this.series
            });
          }
      } else {
        for(let i = 0; i < 7; i++) {
           this.danger = "danger";
                this.favorite = "Follow"
          if(this.info.follow != null) {
            for(let j = 0; j < this.info.follow.length; j++) {
            
              if(this.notes[i] == this.info.follow[j].value && this.info.follow[j].counter == 1 ) {
                  this.danger = "secondary";
                  this.favorite = "Unfollow";
                } else if(this.notes[i] == this.info.follow[j].value && this.info.follow[j].counter == 0) {
                  this.danger = "danger";
                  this.favorite = "Follow"
                } 
            }
          }
       
            if(this.notes[i] == 'ACUPT') {
                this.series = ['Ingineria Sistemelor','Calculatoare si Tehnologia Informatiei','Informatica']
            } else {
              this.series = [];
            }
              
            this.items.push({
              title: this.faculties[i],
              note: this.notes[i],
              iconActive:this.danger,
              faculties:this.faculties[i],
              favorite:this.favorite,
              serie:this.series
            });
          }
        }
     });
  }

  /**
   * 
   * @param event 
   * @param item 
   */
  itemTapped(event, item) {
    this.navCtrl.push('Paginafacultate', {
      item: item
    });
  }
  
  /**
   * 
   * @param itemss 
   */
  addFollow(itemss) {
    console.log(itemss)
    this.oneSignal.getIds().then((ids)=>{
      this.id = ids.userId; // recieve de id device and send it to server 
      this.http.get('http://www.atestate-inf.tk/ghidtest/notification.php?id='+ this.id+'&user='+this.user+'&facultate='+itemss.note/*+'&ids='+Device.uuid*/ ).map(res => res.json()).subscribe(data => {
        this.posts = data;
      });
    });

    for(let  i = 0; i < 7; i++) {
      if(this.items[i].title == itemss.title && this.items[i].iconActive == "danger"){
        this.items[i].iconActive = "secondary";
        this.items[i].favorite = "FAVORITE";
        let toast = this.toastCtrl.create({
          message:  'Now you follow '+ this.items[i].faculties+' news!',
          duration: 1500 ,
          position: 'top'
        });
        toast.present();
      } else if(this.items[i].title == itemss.title && this.items[i].iconActive == "secondary") {
        this.items[i].iconActive = "danger";
        this.items[i].favorite ="Add to favorite";
      }
    }
  }
}