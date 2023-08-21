import { Component } from '@angular/core';
import * as english from '../../../../assets/traduccion/en.json';
import * as spanish from '../../../../assets/traduccion/es.json';
import { DataService } from 'src/app/services/data.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  
  idioma!: string;
  translate: any = spanish;
  
  ngOnInit(): void {
    this.getLanguage();
  }

    constructor(
    private dataService: DataService,
  ){
  }

  getLanguage(){
    this.dataService.idiomaG.pipe(
      tap(idioma => {
      })
    ).subscribe(idioma => {
      this.idioma = idioma;
      this.translateText(idioma);
    });
  }

   translateText(idioma: string){
    if(idioma === 'en'){
      this.translate = english;
    }
    else {
      this.translate = spanish;
    }
  }

}
