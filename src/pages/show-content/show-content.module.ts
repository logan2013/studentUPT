import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShowContent } from './show-content';
import { IonicImageViewerModule } from 'ionic-img-viewer';

@NgModule({
  declarations: [
    ShowContent,
  ],
  imports: [
    IonicPageModule.forChild(ShowContent),
    IonicImageViewerModule
  ],
  exports: [
    ShowContent
  ]
})
export class ShowContentModule {}
