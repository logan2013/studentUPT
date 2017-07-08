import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConducereUpt } from './conducere-upt';

@NgModule({
  declarations: [
    ConducereUpt,
  ],
  imports: [
    IonicPageModule.forChild(ConducereUpt),
  ],
  exports: [
    ConducereUpt
  ]
})
export class ConducereUptModule {}
