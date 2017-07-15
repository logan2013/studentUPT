import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NoNetwork } from './no-network';

@NgModule({
  declarations: [
    NoNetwork,
  ],
  imports: [
    IonicPageModule.forChild(NoNetwork),
  ],
  exports: [
    NoNetwork
  ]
})
export class NoNetworkModule {}
