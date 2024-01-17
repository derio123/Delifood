import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoriaPage } from './categoria';
import { CommonModule } from '@angular/common';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    CategoriaPage,
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(CategoriaPage),
    CommonModule,
  ],
})
export class CategoriaPageModule { }
