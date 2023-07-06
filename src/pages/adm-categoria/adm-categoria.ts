import { Component } from '@angular/core';
import { ActionSheetController, IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { CategoriaModel } from '../../app/models/categoriaModel';
import { CameraProvider } from '../../providers/camera/camera';

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
    public cameraSRV: CameraProvider) {

    let _categ = this.navParams.get('_categoria');
    if (_categ)
      this.categoria = <CategoriaModel>_categ;
    else
      this.categoria = new CategoriaModel();
  }


  getPictureOption(): void {
    let actionSheet = this.actionCtrl.create({
      title: 'Adicione uma foto ?',
      buttons: [
        {
          text: 'Camera',
          icon: this.platform.is('android') ? null : 'camera',
          handler: () => {
            this.cameraSRV.takePicture(photo => {
              this.categoria.foto = photo;
            })
          }
        }, {
          text: 'Arquivo',
          icon: this.platform.is('android') ? null : 'images',
          handler: () => {
            this.cameraSRV.getPictureFromGallery(photo => {
              this.categoria.foto = photo;
            })
          }
        }, {
          text: 'Cancelar',
          role: 'destructive',
          icon: this.platform.is('android') ? null : 'close',
          handler: () => {

          }
        }
      ]
    });
    actionSheet.present();

  }

}
