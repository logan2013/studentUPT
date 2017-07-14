import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShowChart } from './show-chart';

@NgModule({
  declarations: [
    ShowChart,
  ],
  imports: [
    IonicPageModule.forChild(ShowChart),
  ],
  exports: [
    ShowChart
  ]
})
export class ShowChartModule {}
