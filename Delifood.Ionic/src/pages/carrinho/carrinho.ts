import { CarrinhoProvider } from './../../providers/carrinho/carrinho';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { carrinhoModel } from '../../app/models/carrinhoModel';
import { ProdutoModel } from '../../app/models/produtoModel';
import { AcaoCarrinhoEnum } from '../../app/enum/acaoCarrinhoEnum';
import { AlertProvider } from '../../providers/alert/alert';

@IonicPage()
@Component({
  selector: 'page-carrinho',
  templateUrl: 'carrinho.html',
})
export class CarrinhoPage {

  produtos: any;
  total: number = 0.00;
  carrinho: carrinhoModel = new carrinhoModel();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private carrinhoSRV: CarrinhoProvider,
    private altertCTRL: AlertProvider,
  ) {
  }

  ionViewDidLoad() {
    this.carrinhoSRV.getCarrinho().subscribe(data => {
      this.carrinho = data;
    })
  }

  quantidadeAlterada(produto: ProdutoModel, event: any): void {
    console.log(`${produto.nome} - quantidade:${event.quantidade} - acao: ${event.acao}`);
    if (event.acao == AcaoCarrinhoEnum.Adicionar)
      this.carrinhoSRV.addNewItem(produto);
    else
      this.carrinhoSRV.deleteItem(produto);
  }

  async finalizarPedido(): Promise<void> {
    try {
      let pedidoResult = await this.carrinhoSRV.SalvarPedido(this.carrinho);
      if (pedidoResult.sucess) {
        this.navCtrl.setRoot('MeusPedidosPage')
        this.altertCTRL.toast('Pedido realizado com sucesso', 'bottom');
      }
    } catch (error) {
      console.log("Problema ao enviar seu pedido", error);
      
    }
  }

}
