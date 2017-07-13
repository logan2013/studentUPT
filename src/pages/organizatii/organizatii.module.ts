import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Organizatii } from './organizatii';

@NgModule({
  declarations: [
    Organizatii,
  ],
  imports: [
    IonicPageModule.forChild(Organizatii),
  ],
  exports: [
    Organizatii
  ]
})
export class OrganizatiiModule {}
