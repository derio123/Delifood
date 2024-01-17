import { CategoriaPage } from './../categoria/categoria';
import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tab-categoria',
  templateUrl: 'tab-categoria.html',
})
export class TabCategoriaPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public app: App) {
  }

  ionViewDidLoad() {
    this.app.getRootNav().setRoot(CategoriaPage);
  }

}
