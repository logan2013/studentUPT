import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrarFacultate } from './orar-facultate';

@NgModule({
  declarations: [
    OrarFacultate,
  ],
  imports: [
    IonicPageModule.forChild(OrarFacultate),
  ],
  exports: [
    OrarFacultate
  ]
})
export class OrarFacultateModule {}
