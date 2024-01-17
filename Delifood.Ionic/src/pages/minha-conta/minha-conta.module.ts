import { NgModule } from '@angular/core';
import { IonicModule, IonicPageModule } from 'ionic-angular';
import { MinhaContaPage } from './minha-conta';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    MinhaContaPage,
  ],
  imports: [
    IonicPageModule.forChild(MinhaContaPage),
    IonicModule,
    ComponentsModule
  ],
})
export class MinhaContaPageModule { }
