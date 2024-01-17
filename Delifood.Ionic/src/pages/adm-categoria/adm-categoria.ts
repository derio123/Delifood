import { Component } from '@angular/core';
import { ActionSheetController, IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { CategoriaModel } from '../../app/models/categoriaModel';
import { CameraProvider } from '../../providers/camera/camera';
import { CategoriasProvider } from '../../providers/categorias/categorias';
import { AlertProvider } from '../../providers/alert/alert';

@IonicPage()
@Component({
  selector: 'page-adm-categoria',
  templateUrl: 'adm-categoria.html',
})
export class AdmCategoriaPage {

  categoria: CategoriaModel;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public actionCtrl: ActionSheetController,
    public platform: Platform,
    public cameraSRV: CameraProvider,
    public categoriaSRV: CategoriasProvider,
    public alertSRV: AlertProvider) {

    let _categ = this.navParams.get('_categoria');
    if (_categ)
      this.categoria = <CategoriaModel>_categ;
    else
      this.categoria = new CategoriaModel();
  }

  async excluir(): Promise<void> {
    try {
      this.alertSRV.confirm('Excluir ?', `Deseja excluir a ${this.categoria.titulo}?`,
        async () => {
          let excluirResult = await this.categoriaSRV.delete(this.categoria._id);
          if (excluirResult.sucess) {
            this.alertSRV.toast('Categoria excluída com sucesso', 'bottom');
            this.navCtrl.setRoot('AdmCategoriasPage');
          }
        })


    } catch (err) {
      console.log('Erro ao excluir!', err);
    }
  }

  async salvar(): Promise<void> {
    let sucesso = false;
    if (!this.categoria._id) {
      let resultCadastro = await this.categoriaSRV.post(this.categoria);
      sucesso = resultCadastro.sucess;
    } else {
      let resultUpdate = await this.categoriaSRV.put(this.categoria._id, this.categoria);
      sucesso = resultUpdate.sucess;
    }

    if (sucesso) {
      this.alertSRV.toast('Categoria salva com sucesso!', 'bottom');
      this.navCtrl.setRoot('AdmCategoriasPage');
    }
  }

  getPictureOption(): void {
    let actionSheet = this.actionCtrl.create({
      title: 'Adicione uma foto ?',
      buttons: [
        {
          text: 'Camera',
          icon: this.platform.is('ios') ? null : 'camera',
          handler: () => {
            this.cameraSRV.takePicture(photo => {
              this.categoria.foto = photo;
            })
          }
        }, {
          text: 'Arquivo',
          icon: this.platform.is('ios') ? null : 'images',
          handler: () => {
            this.cameraSRV.getPictureFromGallery(photo => {
              this.categoria.foto = photo;
            })
          }
        }, {
          text: 'Cancelar',
          role: 'destructive',
          icon: this.platform.is('ios') ? null : 'close',
          handler: () => {

          }
        }
      ]
    });
    actionSheet.present();

  }

}
