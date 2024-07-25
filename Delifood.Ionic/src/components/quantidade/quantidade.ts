import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CarrinhoProvider } from '../../providers/carrinho/carrinho';
import { ProdutoModel } from '../../app/models/produtoModel';
import { AcaoCarrinhoEnum } from '../../app/enum/acaoCarrinhoEnum';
import { Events } from 'ionic-angular';
import { ConfigHelper } from '../../app/helpers/configHelper';

@Component({
  selector: 'quantidade',
  templateUrl: 'quantidade.html'
})
export class QuantidadeComponent implements OnInit {

  numero: number = 0;
  @Input('produto') produto: ProdutoModel;
  @Output() quantidadeAlterada = new EventEmitter();

  constructor(
    private carrinhoSRV: CarrinhoProvider,
    private evt: Events) { }

  private _registerEvent(): void {
    this.evt.subscribe(ConfigHelper.Events.atualizacaoQuantidadeProduto, () => {
      this._atualizarQuantidade();
    })
  }

  private _atualizarQuantidade(): void {
    let quantidade = this.carrinhoSRV.getQuantidadeItem(this.produto);
    this.numero = quantidade;
  }

  ngOnInit(): void {
    this._atualizarQuantidade();
    this._registerEvent();
  }

  add() {
    this.numero += 1;
    this.quantidadeAlterada.emit({
      quantidade: this.numero,
      acao: AcaoCarrinhoEnum.Adicionar,
    });
  }

  remove() {
    let _valorFinal = this.numero -= 1;
    if (_valorFinal <= 0)
      this.numero = 0;
    this.quantidadeAlterada.emit(
      {
        quantidade: this.numero,
        acao: AcaoCarrinhoEnum.Remover,
      }
    );
  }

}
