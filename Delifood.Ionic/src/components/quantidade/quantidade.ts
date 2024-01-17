import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'quantidade',
  templateUrl: 'quantidade.html'
})
export class QuantidadeComponent {

  number: number = 1;
  @Output() quantidadeAlterada = new EventEmitter();

  constructor() { }

  add() {
    this.number += 1;
    this.quantidadeAlterada.emit(this.number);
  }

  remove() {
    let _valorFinal = this.number -= 1;
    if (_valorFinal <= 0)
      this.number = 1;
      this.quantidadeAlterada.emit(this.number);
  }

}
