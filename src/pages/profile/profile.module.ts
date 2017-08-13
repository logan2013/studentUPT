import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Profile } from './profile';
import { SuperTabsModule } from 'ionic2-super-tabs';

@NgModule({
  declarations: [
    Profile,
  ],
  imports: [
    IonicPageModule.forChild(Profile),
    SuperTabsModule
  ],
  exports: [
    Profile
  ]
})
export class ProfileModule { }
