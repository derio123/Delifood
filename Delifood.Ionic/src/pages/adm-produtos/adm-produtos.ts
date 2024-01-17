import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriaModel } from '../../app/models/categoriaModel';
import { ProdutoModel } from '../../app/models/produtoModel';
import { ProdutoProvider } from '../../providers/produto/produto';

@IonicPage()
@Component({
  selector: 'page-adm-produtos',
  templateUrl: 'adm-produtos.html',
})
export class AdmProdutosPage {

  listCategorias: Array<ProdutoModel> = new Array<ProdutoModel>();
  isLoading: boolean = true;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private produtoSRV: ProdutoProvider) {
    this._loadData();
  }

  ionViewDidEnter() {
    this.isLoading = true;
    this._loadData();
  }

  private async _loadData(): Promise<void> {
    let produtoResult = await this.produtoSRV.get();

    if (produtoResult.sucess) {
      this.isLoading = false;
      this.listCategorias = <Array<ProdutoModel>>produtoResult.data;
    }
  }

  addOrEdit(model?: CategoriaModel): void {
    this.navCtrl.push('AdmProdutoPage', { _produto: model })
  }
}
