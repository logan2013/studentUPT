import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  templateUrl: 'about.html',
})
export class About {
  public descriereUpt: string = "DescriereUpt";
  public conducereUpt: string = "ConducereUpt";
  public noutatiUpt: string = "NoutatiUpt";
  constructor() {}
}
