import { Injectable } from '@angular/core';
import { ProviderBase } from '../../app/base/providerBase';
import { ConfigHelper } from '../../app/helpers/configHelper';
import { HttpProvider } from '../http/http';
import { ProdutoModel } from '../../app/models/produtoModel';
import { httpResultModel } from '../../app/models/httpResultModel';

@Injectable()
export class ProdutoProvider extends ProviderBase<ProdutoModel> {

  url: string = `${ConfigHelper.Url}produto`;

  constructor(public http: HttpProvider) {
    super(`${ConfigHelper.Url}produto`, http)
  }

  async produtoCategoriaById(id:string): Promise<httpResultModel> {
    return await this.http.get(`${this.url}/categoria/${id}`);
  }
}
