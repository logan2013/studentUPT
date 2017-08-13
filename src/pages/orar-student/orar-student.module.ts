import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrarStudentPage } from './orar-student';

@NgModule({
  declarations: [
    OrarStudentPage,
  ],
  imports: [
    IonicPageModule.forChild(OrarStudentPage),
  ],
  exports: [
    OrarStudentPage
  ]
})
export class OrarStudentPageModule {}
