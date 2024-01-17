export class ProdutoModel {
    _id: string
    nome: string;
    descricao: string;
    preco: number;
    foto: string;
    ativa: boolean;
    categoriaId: string;
    dataCriacao: Date;
}