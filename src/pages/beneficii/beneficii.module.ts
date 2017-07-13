import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Beneficii } from './beneficii';
import { IonicImageViewerModule } from 'ionic-img-viewer';

@NgModule({
  declarations: [
    Beneficii,
  ],
  imports: [
    IonicPageModule.forChild(Beneficii),
    IonicImageViewerModule
  ],
  exports: [
    Beneficii
  ]
})
export class BeneficiiModule {}
