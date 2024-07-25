import { CarrinhoProvider } from './../../providers/carrinho/carrinho';
import { ProdutoModel } from './../../app/models/produtoModel';
import { ProdutoProvider } from './../../providers/produto/produto';
import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';
import { CategoriaModel } from '../../app/models/categoriaModel';
import { ConfigHelper } from '../../app/helpers/configHelper';
import { carrinhoModel } from '../../app/models/carrinhoModel';
import { AcaoCarrinhoEnum } from '../../app/enum/acaoCarrinhoEnum';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  categoriaSelecionada: CategoriaModel = new CategoriaModel();
  produtos: Array<ProdutoModel> = new Array<ProdutoModel>();
  isLoading: boolean = true;
  carrinho: carrinhoModel = new carrinhoModel();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private produtoSRV: ProdutoProvider,
    public modalCtrl: ModalController,
    private carrinhoSRV: CarrinhoProvider,
  ) { }

  ionViewWillEnter() {
    this.carrinhoSRV.getCarrinho().subscribe(data => {
      this.carrinho = data;
    })

    this.categoriaSelecionada = <CategoriaModel>JSON.parse(localStorage.getItem(ConfigHelper.storageKeys.selectCategory));
    this.load();
  }

  async load(): Promise<void> {
    try {
      let produtoResult = await this.produtoSRV.produtoCategoriaById(this.categoriaSelecionada._id);
      if (produtoResult.sucess)
        this.isLoading = false;
      this.produtos = <Array<ProdutoModel>>produtoResult.data;
    } catch (error) {
      console.log("Erro ao carregar", error);
    }
  }

  quantidadeAlterada(produto: ProdutoModel, event: any): void {
    console.log(`${produto.nome} - quantidade:${event.quantidade} - acao: ${event.acao}`);
    if(event.acao == AcaoCarrinhoEnum.Adicionar)
      this.carrinhoSRV.addNewItem(produto);
    else 
      this.carrinhoSRV.deleteItem(produto);
  }

  viewProduct(item: ProdutoModel) {
    let modal = this.modalCtrl.create('DetailsProdutosPage', { produto: item });
    modal.present();
  }

  visualizarCarrinho(): void {
    this.navCtrl.push('CarrinhoPage', {});
  }
}
