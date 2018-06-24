import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Login } from './login';
import { RecaptchaModule } from 'ng-recaptcha';

@NgModule({
  declarations: [
    Login,
  ],
  imports: [
    IonicPageModule.forChild(Login),
    RecaptchaModule.forRoot()
  ],
  exports: [
    Login
  ]
})
export class LoginModule {}
