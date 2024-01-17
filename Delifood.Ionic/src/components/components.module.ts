import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { QuantidadeComponent } from './quantidade/quantidade';
import { TabComponent } from './tab/tab';
import { IonicModule } from 'ionic-angular';
import { CommonModule } from '@angular/common';
@NgModule({
	declarations: [QuantidadeComponent,
    TabComponent],
	imports: [IonicModule, CommonModule],
	exports: [QuantidadeComponent,
    TabComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule {}
