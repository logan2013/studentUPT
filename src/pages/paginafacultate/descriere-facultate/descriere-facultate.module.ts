import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DescriereFacultate } from './descriere-facultate';
import { IonicImageViewerModule } from 'ionic-img-viewer';

@NgModule({
  declarations: [
    DescriereFacultate,
  ],
  imports: [
    IonicPageModule.forChild(DescriereFacultate),
    IonicImageViewerModule
  ],
  exports: [
    DescriereFacultate
  ]
})
export class DescriereFacultateModule {}
