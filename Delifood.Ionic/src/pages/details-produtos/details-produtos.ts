import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ProdutoModel } from '../../app/models/produtoModel';
import { AlertProvider } from '../../providers/alert/alert';

@IonicPage()
@Component({
  selector: 'page-details-produtos',
  templateUrl: 'details-produtos.html',
})
export class DetailsProdutosPage {

  produto: ProdutoModel = new ProdutoModel();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private alertSRV: AlertProvider
  ) { }

  ionViewDidLoad() {
    this.produto = <ProdutoModel>this.navParams.get('produto');
  }

  voltar() {
    this.viewCtrl.dismiss();
  }

  addCarrinho(){
    this.alertSRV.toast('Produto adicionado com sucesso', 'bottom');
    this.viewCtrl.dismiss();
  }

}
