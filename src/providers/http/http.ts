import { NetworkProvider } from './../network/network';
import { httpResultModel } from './../../app/models/httpResultModel';
import { SpinnerProvider } from './../spinner/spinner';
import { AlertProvider } from './../alert/alert';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpProvider {

  constructor(private http: HttpClient,
    private alertSRV: AlertProvider,
    private netSRV: NetworkProvider,
    private spinnerSRV: SpinnerProvider) { }


  public get(url: string): Promise<httpResultModel> {
    this.spinnerSRV.show("Carregando");
    return new Promise((resolve) => {
      if (this.netSRV.getIsOnline) {
        this.http.get(url).subscribe(_res => {
          this.spinnerSRV.hide();
          resolve({ sucess: true, data: _res, error: undefined });
        }, err => {
          this.spinnerSRV.hide();
          this.alertSRV.toast('Erro de conexão, tente novamente', 'bottom');
          resolve({ sucess: false, data: undefined, error: err });
        });
      } else {
        this.alertSRV.toast('Você está offine e não pode carregar os dados!', 'bottom');
        resolve({ sucess: true, data: [], error: undefined });
      }
    })
  }

  public post(url: string, model: any): Promise<httpResultModel> {
    this.spinnerSRV.show("Carregando");
    return new Promise((resolve) => {
      if (this.netSRV.getIsOnline) {
        this.http.post(url, model).subscribe(_res => {
          this.spinnerSRV.hide();
          resolve({ sucess: true, data: _res, error: undefined });
        }, err => {
          this.spinnerSRV.hide();
          console.log(err);
          if (err.status == 400) {
            let msg = '';
            err.error.validation.forEach(_err => {
              msg += `<li>${_err.message}</li>`;
            });
            this.alertSRV.alert(err.error.message, msg);
          } else if(err.status == 404) {
            this.alertSRV.alert('Informação', err.error.message);
          } 
          else {
            this.alertSRV.toast('Não foi possivel acessar, erro na conexão e tente novamente', 'bottom');
          resolve({ sucess: false, data: undefined, error: err });
          }
          
        });
      } else {
        this.alertSRV.toast('Você está offine e não pode carregar os dados!', 'bottom');
        resolve({ sucess: true, data: [], error: undefined });
      }
    })
  }

  public put(url: string, model: any): Promise<httpResultModel> {
    this.spinnerSRV.show("Carregando");
    return new Promise((resolve) => {
      if (this.netSRV.getIsOnline) {
        this.http.put(url, model)
          .subscribe(_res => {
            this.spinnerSRV.hide();
            resolve({ sucess: true, data: _res, error: undefined });
          }, err => {
            this.spinnerSRV.hide();
            this.alertSRV.toast('Erro de conexão, tente novamente', 'bottom');
            resolve({ sucess: false, data: undefined, error: err });
          });
      } else {
        this.alertSRV.toast('Você está offine e não pode carregar os dados!', 'bottom');
        resolve({ sucess: true, data: [], error: undefined });
      }
    })
  }

  public delete(url: string): Promise<httpResultModel> {
    this.spinnerSRV.show("Carregando");
    return new Promise((resolve) => {
      if (this.netSRV.getIsOnline) {
        this.http.delete(url)
          .subscribe(_res => {
            this.spinnerSRV.hide();
            resolve({ sucess: true, data: _res, error: undefined });
          }, err => {
            this.spinnerSRV.hide();
            this.alertSRV.toast('Erro de conexão, tente novamente', 'bottom');
            resolve({ sucess: false, data: undefined, error: err });
          });
      } else {
        this.alertSRV.toast('Você está offine e não pode carregar os dados!', 'bottom');
        resolve({ sucess: true, data: [], error: undefined });
      }
    })
  }
}
