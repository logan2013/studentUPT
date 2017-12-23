import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FacultHome } from './facult-home';
import { CKEditorModule } from 'ng2-ckeditor';

// Import Angular2 plugin.
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
@NgModule({
  declarations: [
    FacultHome,
  ],
  imports: [
    IonicPageModule.forChild(FacultHome),
    CKEditorModule
  ],
  exports: [
    FacultHome
  ]
})
export class FacultHomeModule { }
