import { Component } from '@angular/core';
import { ActionSheetController, IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { CategoriasProvider } from '../../providers/categorias/categorias';
import { CategoriaModel } from '../../app/models/categoriaModel';
import { ConfigHelper } from '../../app/helpers/configHelper';

@IonicPage()
@Component({
  selector: 'page-categoria',
  templateUrl: 'categoria.html',
})
export class CategoriaPage {

  categorias: Array<CategoriaModel> = new Array<CategoriaModel>();

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public categoriaSRV: CategoriasProvider,
    public platform: Platform,
    public actionSheet: ActionSheetController) {
  }

  ionViewWillEnter() {
    this.load();
  }

  async load(): Promise<void> {
    try {
      let categoriaResult = await this.categoriaSRV.get();
      if (categoriaResult.sucess) {
        this.categorias = <Array<CategoriaModel>>categoriaResult.data;
      }
    } catch (error) {
      console.log("Problema para carregar as categorias", error);
    }
  }

  adminOptions(): void {
    let action = this.actionSheet.create({
      title: 'Administração',
      buttons: [
        { text: 'Gerenciar Categorias', icon: this.platform.is('ios') ? null : 'grid', handler: () => { this.abriCategoria() }, },
        { text: 'Gerenciar Produto', icon: this.platform.is('ios') ? null : 'cog', handler: () => { this.abriProduto() }, },
        { text: 'Cancelar', icon: this.platform.is('ios') ? null : 'close', handler: () => { }, role: 'destructive' },

      ]
    })
    action.present();
  }

  selecionarProduto(item: CategoriaModel): void {
    localStorage.setItem(ConfigHelper.storageKeys.selectCategory, JSON.stringify(item));
    this.navCtrl.setRoot('ProdutosPage');
  }

  private abriCategoria(): void {
    this.navCtrl.push('AdmCategoriasPage');
  }

  private abriProduto() {
    this.navCtrl.push('AdmProdutosPage')
  }
}
