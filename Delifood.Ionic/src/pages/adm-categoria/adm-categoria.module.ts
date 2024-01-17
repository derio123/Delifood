import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { IonicModule, IonicPageModule } from 'ionic-angular';
import { AdmCategoriaPage } from './adm-categoria';

@NgModule({
  declarations: [
    AdmCategoriaPage,
  ],
  imports: [
    IonicPageModule.forChild(AdmCategoriaPage),
    IonicModule 
  ],
  exports: [AdmCategoriaPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdmCategoriaPageModule {}
