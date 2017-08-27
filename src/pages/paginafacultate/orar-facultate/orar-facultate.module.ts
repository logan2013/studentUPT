import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrarFacultate } from './orar-facultate';
import { NgCalendarModule  } from 'ionic2-calendar';

@NgModule({
  declarations: [
    OrarFacultate,
  ],
  imports: [
    NgCalendarModule,
    IonicPageModule.forChild(OrarFacultate),
  ],
  exports: [
    OrarFacultate
  ]
})
export class OrarFacultateModule {}
