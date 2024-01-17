import { CategoriasProvider } from './../../providers/categorias/categorias';
import { CategoriaModel } from './../../app/models/categoriaModel';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-adm-categorias',
  templateUrl: 'adm-categorias.html',
})
export class AdmCategoriasPage {

  listCategorias: Array<CategoriaModel> = new Array<CategoriaModel>();
  isLoading: boolean = true;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private categoriaSRV: CategoriasProvider) {
    this._loadData();
  }

  ionViewDidEnter() {
    this.isLoading = true;
    this._loadData();
  }

  private async _loadData(): Promise<void> {
    let categoriaResult = await this.categoriaSRV.get();
    if (categoriaResult.sucess) {
      this.isLoading = false;
      this.listCategorias = <Array<CategoriaModel>>categoriaResult.data;
    }
  }

  addOrEdit(model?: CategoriaModel):void {
    this.navCtrl.push('AdmCategoriaPage', {_categoria: model})
  }
}
