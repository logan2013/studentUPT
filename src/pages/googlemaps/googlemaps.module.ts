import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Googlemaps } from './googlemaps';
import { IonicImageViewerModule } from 'ionic-img-viewer';

@NgModule({
  declarations: [
    Googlemaps,
  ],
  imports: [
    IonicPageModule.forChild(Googlemaps),
    IonicImageViewerModule
  ],
  exports: [
    Googlemaps
  ]
})
export class GooglemapsModule {}
