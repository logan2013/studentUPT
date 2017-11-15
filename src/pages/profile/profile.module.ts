import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Profile } from './profile';
import { SuperTabsModule } from 'ionic2-super-tabs';
import { IonicImageViewerModule } from 'ionic-img-viewer';

@NgModule({
  declarations: [
    Profile,
  ],
  imports: [
    IonicPageModule.forChild(Profile),
    SuperTabsModule,
    IonicImageViewerModule
  ],
  exports: [
    Profile
  ]
})
export class ProfileModule { }
