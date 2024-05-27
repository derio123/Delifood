import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailsProdutosPage } from './details-produtos';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    DetailsProdutosPage,
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(DetailsProdutosPage),
  ],
})
export class DetailsProdutosPageModule {}
