import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProdutoModel } from '../../app/models/produtoModel';
import { carrinhoModel } from '../../app/models/carrinhoModel';
import { CarrinhoItemModel } from '../../app/models/carrinhoItemModel';
import { Events } from 'ionic-angular';
import { ConfigHelper } from '../../app/helpers/configHelper';
import { HttpProvider } from '../http/http';
import { httpResultModel } from '../../app/models/httpResultModel';

@Injectable()
export class CarrinhoProvider {
  private _carrinho: carrinhoModel = new carrinhoModel();
  private carrinho: Observable<carrinhoModel>;
  private carrinhoObservable: any;

  constructor(
    public http: HttpProvider,
    public evt: Events) {
    this._carrinho.dataHora = new Date();
    this._carrinho.itens = new Array<CarrinhoItemModel>();
    this._carrinho.valorTotal = 0.0;

    this.carrinho = Observable.create(obs => {
      this.carrinhoObservable = obs;
      this.carrinhoObservable.next(this._carrinho);
    });
  }

  public getCarrinho(): Observable<carrinhoModel> {
    return this.carrinho;
  }

  public addNewItem(item: ProdutoModel): void {
    let isExiste = false;
    this._carrinho.itens.forEach(prod => {
      if (prod.Produto._id == item._id) {
        prod.Quantidade++;
        isExiste = true;
      }
    });

    if (!isExiste) {
      let newProduto = new CarrinhoItemModel();
      newProduto.Produto = item;
      newProduto.Quantidade = 1;
      this._carrinho.itens.push(newProduto)
    }

    this._calcularCarrinho();
    this.evt.publish(ConfigHelper.Events.atualizacaoQuantidadeProduto, {});
    this.carrinhoObservable.next(this._carrinho);
  }

  public deleteItem(item: ProdutoModel): void {
    for (let index = 0; index < this._carrinho.itens.length; index++) {
      const prod = this._carrinho.itens[index];
      if (prod.Produto._id == item._id) {
        if (prod.Quantidade == 1) {
          this._carrinho.itens.splice(index, 1);
        } else {
          this._carrinho.itens[index].Quantidade--;
        }
      }
    }
    this._calcularCarrinho();
    this.evt.publish(ConfigHelper.Events.atualizacaoQuantidadeProduto, {});
    this.carrinhoObservable.next(this._carrinho);

  }

  /**
   * getQuantidadeItem
   */
  public getQuantidadeItem(item: ProdutoModel): number {
    let prod = this._carrinho.itens.filter(x => x.Produto._id == item._id)[0];
    if (prod) {
      return prod.Quantidade
    } else {
      return 0;
    }
  }

  private _calcularCarrinho(): void {
    this._carrinho.valorTotal = 0;
    this._carrinho.itens.forEach(prod => {
      this._carrinho.valorTotal += (prod.Produto.preco * prod.Quantidade);
    })
  }

  public SalvarPedido(pedido: carrinhoModel): Promise<httpResultModel> {
    let _pedido: any = {};
    _pedido.valorTotal = pedido.valorTotal;
    _pedido.itens = [];
    pedido.itens.forEach(prod => {
      _pedido.itens.push({
        quantidade: prod.Quantidade,
        produto: prod.Produto._id,
      })
    });

    _pedido.itens = JSON.stringify(_pedido.itens)
    return this.http.post(`${ConfigHelper.Url}/pedido`, _pedido);
  }

  public getMeusPedidos(): Promise<httpResultModel> {
    return this.http.get(`${ConfigHelper.Url}/pedido`);
  }

  /*  addNewItem(item: ProdutoModel): void {
     let newProduto = new CarrinhoItemModel();
     newProduto.Produto = item;
     newProduto.Quantidade = 1;
 
     this._carrinho.itens.forEach((it: CarrinhoItemModel) => {
       this._carrinho.valorTotal += it.Produto.preco;
     })
 
     this._carrinho.itens.push(newProduto);
     this.carrinhoObservable.next(this._carrinho);
   }
  */
}
