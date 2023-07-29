import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class DataService {
  private idioma = new BehaviorSubject<string>('es');

  get idiomaG(){
    return this.idioma.asObservable();
  }

  setIdioma(idioma: string){
    this.idioma.next(idioma);
  }
}
