import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DescriereFacultate } from './descriere-facultate';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { IonicImageLoader } from 'ionic-image-loader';

@NgModule({
  declarations: [
    DescriereFacultate,
  ],
  imports: [
    IonicPageModule.forChild(DescriereFacultate),
    IonicImageViewerModule,
    IonicImageLoader
  ],
  exports: [
    DescriereFacultate
  ]
})
export class DescriereFacultateModule {}
