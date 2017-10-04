import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Paginafacultate } from './paginafacultate';
import { SuperTabsModule } from 'ionic2-super-tabs';
import { IonicImageLoader } from 'ionic-image-loader';

@NgModule({
  declarations: [
    Paginafacultate,
  ],
  imports: [
    IonicPageModule.forChild(Paginafacultate),
    SuperTabsModule,
    IonicImageLoader,
  ],
  exports: [
    Paginafacultate,
  ]
})
export class PaginafacultateModule { }
