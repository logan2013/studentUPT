import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegulamentPage } from './regulament';

@NgModule({
  declarations: [
    RegulamentPage,
  ],
  imports: [
    IonicPageModule.forChild(RegulamentPage),
  ],
  exports: [
    RegulamentPage
  ]
})
export class RegulamentPageModule {}
