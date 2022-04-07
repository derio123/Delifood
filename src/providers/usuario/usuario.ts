import { httpResultModel } from './../../app/models/httpResultModel';
import { ConfigHelper } from './../../app/helpers/configHelper';
import { HttpProvider } from './../http/http';
import { Injectable } from '@angular/core';
import { ProviderBase } from '../../app/base/providerBase';
import { UsuarioModel } from '../../app/models/usuarioModel';

@Injectable()
export class UsuarioProvider extends ProviderBase<UsuarioModel> {

  url: string = `${ConfigHelper.Url}usuario`;

  constructor(public http: HttpProvider) {
    super(`${ConfigHelper.Url}usuario`, http)
  }


  async autenticate(email: string, senha: string): Promise<httpResultModel> {
    return this.http.post(`${this.url}/autenticar`, { email: email, senha: senha });
  }

  async register(usuario: UsuarioModel): Promise<httpResultModel> {
    return this.http.post(`${this.url}/register`, usuario)    
  }
}
