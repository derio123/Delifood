import { NgModule } from '@angular/core';
import { IonicModule, IonicPageModule } from 'ionic-angular';
import { AdmCategoriasPage } from './adm-categorias';

@NgModule({
  declarations: [
    AdmCategoriasPage,
  ],
  imports: [
    IonicPageModule.forChild(AdmCategoriasPage),
    IonicModule
  ],
})
export class AdmCategoriasPageModule {}
