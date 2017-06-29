import { Component, ViewChild, ElementRef} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

declare var google;

@IonicPage()
@Component({
  selector: 'page-routeprofile',
  templateUrl: 'routeprofile.html',
})
export class Routeprofile {
  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('pleaseConnect') pleaseConnect: ElementRef;
  public setDisplay: any; 
  public map: any;
  public marker:any;  
  public position: any;
  public dataRecieve: any[]=[]
  constructor(public navCtrl: NavController,
 public navParams: NavParams) {
    this.dataRecieve = navParams.get('data');
    console.log(this.dataRecieve)
    
  }

  ionViewDidLoad() {
    
   
           
  }


}
