import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { map, finalize } from "rxjs/operators";
import { Observable } from 'rxjs';

declare var moment:any;


@Injectable({
  providedIn: 'root'
})
export class FirebaseStorageService {

  constructor(
    private storage: AngularFireStorage
  ) { }

  //Tarea para subir archivo
  public tareaCloudStorage(nombreArchivo: string, datos: any) {
    return this.storage.upload(nombreArchivo, datos);
  }

  //Referencia del archivo
  public referenciaCloudStorage(nombreArchivo: string) {
    return this.storage.ref(nombreArchivo);
  }

  fb;
  downloadURL: Observable<string>;

 async subirArchivo (directorio, nombreArchivo, archivo) {


  return new Promise((resolve, reject) => {
    const file = archivo;
    const filePath = `${directorio}/${nombreArchivo}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    task.then(()=>{
      fileRef.getDownloadURL().subscribe(url => {
        
        resolve(url);
        
      });
    });

    
  });

    
      
  }

}
