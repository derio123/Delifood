import { AlertProvider } from './../../providers/alert/alert';
import { UsuarioProvider } from './../../providers/usuario/usuario';
import { UsuarioModel } from './../../app/models/usuarioModel';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {

  usuario: UsuarioModel = new UsuarioModel();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private usuarioSRV: UsuarioProvider,
    private alertSRV: AlertProvider) { }

  acessarLogin() {
    this.navCtrl.setRoot('LoginPage');
  }

  async cadastrar(): Promise<void> {
    let resultCadastro = await this.usuarioSRV.register(this.usuario);
    if (resultCadastro.sucess) {
      this.alertSRV.toast('Cadastro realizado com sucesso!', 'bottom');
      this.navCtrl.setRoot('LoginPage');
    }
  }
}
