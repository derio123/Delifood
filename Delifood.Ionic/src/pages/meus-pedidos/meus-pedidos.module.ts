import { NgModule } from '@angular/core';
import { IonicModule, IonicPageModule } from 'ionic-angular';
import { MeusPedidosPage } from './meus-pedidos';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    MeusPedidosPage,
  ],
  imports: [
    IonicPageModule.forChild(MeusPedidosPage),
    IonicModule,
    ComponentsModule
  ],
})
export class MeusPedidosPageModule { }
