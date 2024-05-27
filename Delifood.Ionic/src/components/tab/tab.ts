import { Component, Input, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'tab',
  templateUrl: 'tab.html',
})
export class TabComponent implements OnInit {

  @Input('pagina') pagina: string;
  tabs: Array<{ icon: string, path: string, label: string, isSelect: boolean }>;

  constructor(public navCtrl: NavController) { }

  ngOnInit(): void {
    this.tabs = [
      { icon: 'pricetags', path: 'CategoriaPage', label: 'Categorias', isSelect: this.pagina == 'Categoria' },
      { icon: 'menu', path: 'MeusPedidosPage', label: 'Meus Pedidos', isSelect: this.pagina == 'Meus Pedidos' },
      { icon: 'contact', path: 'MinhaContaPage', label: 'Minha Conta', isSelect: this.pagina == 'Minha Conta' },
    ];
  }

  selecionaTab(path:string): void{
    this.navCtrl.setRoot(path)
  }
}
