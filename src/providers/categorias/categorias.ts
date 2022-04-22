import { Injectable } from '@angular/core';
import { ProviderBase } from '../../app/base/providerBase';
import { ConfigHelper } from '../../app/helpers/configHelper';
import { CategoriaModel } from '../../app/models/categoriaModel';
import { HttpProvider } from '../http/http';

@Injectable()
export class CategoriasProvider extends ProviderBase<CategoriaModel> {

  url: string = `${ConfigHelper.Url}categoria`;

  constructor(public http: HttpProvider) {
    super(`${ConfigHelper.Url}categoria`, http)
  }

}
