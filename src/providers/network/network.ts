import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';

declare var navigator: any;
declare var Connection: any;

@Injectable()
export class NetworkProvider {

  constructor(public plat: Platform) { }

  getIsOnline(): boolean {
    if (this.plat.is('cordova')) {
      if (navigator.connection && navigator.connection.type) {
        return (navigator.connection.type != Connection.UNKONW && navigator.connection.type != Connection.NONE);
      } else {
        return true;
      }
    } else {
      navigator.onLine;
    }
  }
}
