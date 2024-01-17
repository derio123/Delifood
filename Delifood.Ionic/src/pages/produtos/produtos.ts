import { ProdutoModel } from './../../app/models/produtoModel';
import { ProdutoProvider } from './../../providers/produto/produto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriaModel } from '../../app/models/categoriaModel';
import { ConfigHelper } from '../../app/helpers/configHelper';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  categoriaSelecionada: CategoriaModel = new CategoriaModel();
  produtos: Array<ProdutoModel> = new Array<ProdutoModel>();
  isLoading: boolean = true;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private produtoSRV: ProdutoProvider) {
  }

  ionViewWillEnter() {
    this.categoriaSelecionada = <CategoriaModel>JSON.parse(localStorage.getItem(ConfigHelper.storageKeys.selectCategory));
    this.load();
  }

  async load(): Promise<void> {
    try {
      let produtoResult = await this.produtoSRV.produtoCategoriaById(this.categoriaSelecionada._id);
      if (produtoResult.sucess)
        this.isLoading = false;
      this.produtos = <Array<ProdutoModel>>produtoResult.data;
      console.log(produtoResult);

    } catch (error) {
      console.log("Erro ao carregar", error);

    }
  }

  quantidadeAlterada(produto:ProdutoModel ,event:number): void {
    console.log(`${produto.nome} - quantidade:${event}`);
  }
}
