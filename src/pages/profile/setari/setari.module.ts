import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SetariPage } from './setari';

@NgModule({
  declarations: [
    SetariPage,
  ],
  imports: [
    IonicPageModule.forChild(SetariPage),
  ],
  exports: [
    SetariPage
  ]
})
export class SetariPageModule {}
