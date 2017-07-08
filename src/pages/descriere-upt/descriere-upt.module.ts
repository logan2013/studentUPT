import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DescriereUpt } from './descriere-upt';

@NgModule({
  declarations: [
    DescriereUpt,
  ],
  imports: [
    IonicPageModule.forChild(DescriereUpt),
  ],
  exports: [
    DescriereUpt
  ]
})
export class DescriereUptModule {}
