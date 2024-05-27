import { CarrinhoItemModel } from "./carrinhoItemModel";

export class carrinhoModel {
    dataHora: Date;
    valorTotal: number = 0.0;
    itens: Array<CarrinhoItemModel>

    constructor() {
        this.itens = new Array<CarrinhoItemModel>();
    }
}