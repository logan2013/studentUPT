import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotePage } from './note';
import { AccordionListComponent } from '../../../components/accordion-list/accordion-list';

@NgModule({
  declarations: [
    NotePage,
    AccordionListComponent
  ],
  imports: [
    IonicPageModule.forChild(NotePage),
  ],
  exports: [
    NotePage,
    AccordionListComponent
  ]
})
export class NotePageModule {}
