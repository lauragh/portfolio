import { Component, OnInit } from '@angular/core';
import * as english from '../../../../assets/traduccion/en.json';
import * as spanish from '../../../../assets/traduccion/es.json';
import { DataService } from 'src/app/services/data.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-mobbler',
  templateUrl: './mobbler.component.html',
  styleUrls: ['./mobbler.component.css']
})
export class MobblerComponent implements OnInit {

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
