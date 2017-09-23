import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConducereUpt } from './conducere-upt';
import { IonicImageLoader } from 'ionic-image-loader';

@NgModule({
  declarations: [
    ConducereUpt,
  ],
  imports: [
    IonicPageModule.forChild(ConducereUpt),
    IonicImageLoader
  ],
  exports: [
    ConducereUpt
  ]
})
export class ConducereUptModule {}
