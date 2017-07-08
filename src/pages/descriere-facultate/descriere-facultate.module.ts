import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DescriereFacultate } from './descriere-facultate';

@NgModule({
  declarations: [
    DescriereFacultate,
  ],
  imports: [
    IonicPageModule.forChild(DescriereFacultate),
  ],
  exports: [
    DescriereFacultate
  ]
})
export class DescriereFacultateModule {}
