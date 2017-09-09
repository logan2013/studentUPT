import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { Auth } from '../../../providers/auth';

@IonicPage()
@Component({
  templateUrl: 'descriere-upt.html',
})
export class DescriereUpt {
  public server: string;
  constructor(private auth: Auth) { 
    this.server = this.auth.server + "/images/upt/legitimatie.jpg";
  }
}

