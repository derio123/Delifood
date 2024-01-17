import { Component } from '@angular/core';
import { ActionSheetController, IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { ProdutoModel } from '../../app/models/produtoModel';
import { ProdutoProvider } from '../../providers/produto/produto';
import { AlertProvider } from '../../providers/alert/alert';
import { CameraProvider } from '../../providers/camera/camera';
import { CategoriaModel } from '../../app/models/categoriaModel';
import { CategoriasProvider } from '../../providers/categorias/categorias';

@IonicPage()
@Component({
  selector: 'page-adm-produto',
  templateUrl: 'adm-produto.html',
})
export class AdmProdutoPage {

  produto: ProdutoModel;
  categorias: Array<CategoriaModel> = new Array<CategoriaModel>();

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public actionCtrl: ActionSheetController,
    public platform: Platform,
    public produtoSRV: ProdutoProvider,
    public categoriaSRV: CategoriasProvider,
    public cameraSRV: CameraProvider,
    public alertSRV: AlertProvider) {

      let _prod = this.navParams.get('_produto');
      if (_prod && _prod._id) {
        this.produto = <ProdutoModel>_prod;
        this.produto.categoriaId = _prod.categoriaId._id;
      }
      else
        this.produto = new ProdutoModel();
  
      this.loadData();
  }

  async loadData(): Promise<void> {
    try {
      let categoriasResult = await this.categoriaSRV.get();
      if (categoriasResult.sucess) {
        this.categorias = <Array<CategoriaModel>>categoriasResult.data;
      }
    } catch (error) {
      console.log('Erro ao carregar as categorias', error);
    }
  }

  async excluir(): Promise<void> {
    try {
      this.alertSRV.confirm('Excluir ?', `Deseja excluir o ${this.produto.nome}?`,
        async () => {
          let excluirResult = await this.produtoSRV.delete(this.produto._id);
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
    if (!this.produto._id) {
      let resultCadastro = await this.produtoSRV.post(this.produto);
      sucesso = resultCadastro.sucess;
    } else {
      let resultUpdate = await this.produtoSRV.put(this.produto._id, this.produto);
      sucesso = resultUpdate.sucess;
    }

    if (sucesso) {
      this.alertSRV.toast('Produto salvo com sucesso!', 'bottom');
      this.navCtrl.setRoot('AdmProdutosPage');
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
              this.produto.foto = photo;
            })
          }
        }, {
          text: 'Arquivo',
          icon: this.platform.is('ios') ? null : 'images',
          handler: () => {
            this.cameraSRV.getPictureFromGallery(photo => {
              this.produto.foto = photo;
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
