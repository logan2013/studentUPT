import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProiecteLiga } from './proiecte-liga';
import { IonicImageViewerModule } from 'ionic-img-viewer';
@NgModule({
  declarations: [
    ProiecteLiga,
  ],
  imports: [
    IonicPageModule.forChild(ProiecteLiga),
    IonicImageViewerModule
  ],
  exports: [
    ProiecteLiga
  ]
})
export class ProiecteLigaModule {}
