import { AlertProvider } from './../../providers/alert/alert';
import { CameraProvider } from './../../providers/camera/camera';
import { UsuarioProvider } from './../../providers/usuario/usuario';
import { Component } from '@angular/core';
import { ActionSheetController, IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { ConfigHelper } from '../../app/helpers/configHelper';
import { UsuarioModel } from '../../app/models/usuarioModel';

@IonicPage()
@Component({
  selector: 'page-minha-conta',
  templateUrl: 'minha-conta.html',
})
export class MinhaContaPage {

  usuarioLogado: UsuarioModel = new UsuarioModel();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private usuarioSRV: UsuarioProvider,
    private cameraSRV: CameraProvider,
    public actionSheet: ActionSheetController,
    public platform: Platform,
    private alertSRV: AlertProvider,
  ) { }

  ionViewDidLoad() {
    this.LoadData();
  }

  updatePhoto(): void {
    let action = this.actionSheet.create({
      title: 'Foto',
      buttons: [
        { text: 'Limpar', icon: this.platform.is('ios') ? null : 'grid', handler: () => { this.usuarioLogado.foto = ConfigHelper.photo }, },
        {
          text: 'Tirar foto', icon: this.platform.is('ios') ? null : 'cog', handler: () => {
            this.cameraSRV.getPictureFromGallery(photo => {
              this.usuarioLogado.foto = photo;
            })
          },
        },
        { text: 'Cancelar', icon: this.platform.is('ios') ? null : 'close', handler: () => { }, role: 'destructive' },

      ]
    })
    action.present();
  }

  async salvar(): Promise<void> {
    try {
      let salvarResult = await this.usuarioSRV.put(this.usuarioLogado._id, this.usuarioLogado);
      if (salvarResult.sucess) {
          this.alertSRV.toast('Dados atualizados com sucesso', 'bottom');
      }
    } catch (error) {
      console.log('Erro ao atualizar os dados', error);
      
    }
  }

  async LoadData(): Promise<void> {
    try {
      let user = <UsuarioModel>JSON.parse(localStorage.getItem(ConfigHelper.storageKeys.user));
      let userResult = await this.usuarioSRV.getById(user._id);
      if (userResult.sucess) {
        this.usuarioLogado = <UsuarioModel>userResult.data;
        if (!this.usuarioLogado.foto)
          this.usuarioLogado.foto = ConfigHelper.photo;
      }
    } catch (error) {
      console.log('problema ao carregar os dados do usuário');
    }
  }



}
