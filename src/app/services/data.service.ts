import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class DataService {
  private idioma = new BehaviorSubject<string>('es');
  private text = new BehaviorSubject<boolean>(false);

  get idiomaG(){
    return this.idioma.asObservable();
  }

  get textG(){
    return this.text.asObservable();
  }

  setIdioma(idioma: string){
    this.idioma.next(idioma);
  }

  setText(text: boolean){
    this.text.next(text);
  }
}
