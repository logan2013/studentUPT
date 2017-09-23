import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Organizatii } from './organizatii';
import { IonicImageLoader } from 'ionic-image-loader';

@NgModule({
  declarations: [
    Organizatii,
  ],
  imports: [
    IonicPageModule.forChild(Organizatii),
    IonicImageLoader
  ],
  exports: [
    Organizatii
  ]
})
export class OrganizatiiModule {}
