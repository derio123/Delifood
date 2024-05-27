import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProdutoModel } from '../../app/models/produtoModel';
import { carrinhoModel } from '../../app/models/carrinhoModel';

@Injectable()
export class CarrinhoProvider {
  private _carrinho: carrinhoModel = new carrinhoModel();
  carrinho: Observable<carrinhoModel>;
  carrinhoObservable: any;

  constructor(public http: HttpClient) {
    this.carrinho = Observable.create(obs => {
      this.carrinhoObservable = obs;
    });
  }

  addNewItem(item: ProdutoModel) {
    this._carrinho.itens.push(item);
    this.carrinhoObservable.next(this._carrinho);
  }

}
