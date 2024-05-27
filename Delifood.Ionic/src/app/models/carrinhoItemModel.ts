import { ProdutoModel } from "./produtoModel";

export class CarrinhoItemModel {
    Produto: ProdutoModel;
    Quantidade: number = 1;
}