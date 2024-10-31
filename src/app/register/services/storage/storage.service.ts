/*import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import { Injectable } from '@angular/core';
import { enableProdMode } from '@angular/core';
import { environment } from '../../../../environments/environment';

if (environment.production) {
  enableProdMode();
}

firebase.initializeApp(environment.firebaseConfig);

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  storageRef = firebase.storage().ref();
  constructor() { }

  async uploadImage(archiver_name: string, name: string, imgBase64: any) {
    try {
      let response = await this.storageRef.child(archiver_name + "/" + name).putString(imgBase64, 'data_url');
      console.log(response);
      return await response.ref.getDownloadURL();
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}*/
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private baseUrl: string = environment.serverBasePath || 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  async uploadImage(archiver_name: string, name: string, imgBase64: string) {
    const image = {
      archiver_name,
      name,
      imgBase64
    };

    try {
      const response = await this.http.post(`${this.baseUrl}/images`, image).toPromise();
      console.log(response);
      return response;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}
