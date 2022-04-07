import { UsuarioProvider } from './../../providers/usuario/usuario';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  form: any = {};

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public usuarioSRV: UsuarioProvider) {
  }

  async login(): Promise<void> {
    let result = await this.usuarioSRV.autenticate(this.form.email, this.form.senha);
    console.log(result);
  }

  cadastrar(): void {
    this.navCtrl.setRoot('CadastroPage');
  }
}
