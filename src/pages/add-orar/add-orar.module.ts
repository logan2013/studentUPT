import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddOrarPage } from './add-orar';

@NgModule({
  declarations: [
    AddOrarPage,
  ],
  imports: [
    IonicPageModule.forChild(AddOrarPage),
  ],
  exports: [
    AddOrarPage
  ]
})
export class BeneficiiModule {}
