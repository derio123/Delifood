import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Camera, CameraOptions } from "@ionic-native/camera";

@Injectable()
export class CameraProvider {

  constructor(public camera: Camera, private platform: Platform) { }

  private _getPicture(source: number, callback): void {
    if (this.platform.is('android')) {
      this.platform.ready().then(() => {
        try {
          let options: CameraOptions = {
            quality: 70,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: source,
            allowEdit: true,
            encodingType: this.camera.EncodingType.JPEG,
            saveToPhotoAlbum: false,
            correctOrientation: true,
          }

          this.camera.getPicture(options).then((imgData) => {
            let base64Image = `data:image/jpeg;base64,${imgData}`;
            callback(base64Image);
          }, err => {
            console.error("problema ao captura a foto", err);
          })
        } catch (error) {
          console.error("Problema ao tira a foto", error);
        }
      })
    } else {
      alert('Somente no smartphone!!');
    }
  }


  public getPictureFromGallery(callback) {
    this._getPicture(this.camera.PictureSourceType.PHOTOLIBRARY,
      photo => { callback(photo) }
    );
  }

  public takePicture(callback) {
    this._getPicture(this.camera.PictureSourceType.CAMERA,
      photo => { callback(photo) }
    );
  }

}
