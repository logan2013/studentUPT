import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Facultati } from './facultati';
import { IonicImageLoader } from 'ionic-image-loader';

@NgModule({
  declarations: [
    Facultati,
  ],
  imports: [
    IonicPageModule.forChild(Facultati),
    IonicImageLoader
  ],
  exports: [
    Facultati
  ]
})
export class FacultatiModule {}
