import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaginaLiga } from './pagina-liga';
import { SuperTabsModule } from 'ionic2-super-tabs';
import { IonicImageViewerModule } from 'ionic-img-viewer';

@NgModule({
  declarations: [
    PaginaLiga,
  ],
  imports: [
    IonicPageModule.forChild(PaginaLiga),
    SuperTabsModule,
    IonicImageViewerModule
  ],
  exports: [
    PaginaLiga
  ]
})
export class PaginaLigaModule {}
