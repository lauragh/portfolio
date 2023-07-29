import { Component,  OnInit, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { tap } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import * as english from '../../../assets/traduccion/en.json';
import * as spanish from '../../../assets/traduccion/es.json';
import { Location } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  words: string = 'Hola, me llamo Laura. Actualmente estoy trabajando como Programadora FullStack en BeXReal';
  idioma!: string;
  translate: any = spanish;
  hiddenIcons: boolean = false;

  @ViewChildren('title') title!: QueryList<any>;

  ngOnInit(): void {
    this.getLanguage();
    setTimeout(() => {
      this.typingEffect();
    }, 1000);
  }

  constructor(
    private dataService: DataService,
    private renderer2: Renderer2,
    private location: Location
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
      console.log('entro');
      this.translate = spanish;
    }
    console.log('Data', this.translate.languages);

  }


  typingEffect() {
    const div = document.getElementById("word")!;
    console.log(this.translate.avatarText);
    const phrases = this.translate.avatarText.split('.');
    const delay = 50;
    let currentPhraseIndex = 0;
    let currentLetterIndex = 0;
  
    const addLetter = () => {
      if (currentPhraseIndex < phrases.length) {
        const currentPhrase = phrases[currentPhraseIndex];

        if (currentLetterIndex < currentPhrase.length) {
          div.textContent += currentPhrase.charAt(currentLetterIndex);
          currentLetterIndex++;
          setTimeout(addLetter, delay);
        }
        else {
          setTimeout(() => {
            console.log(currentLetterIndex);
            if(currentLetterIndex === 20){
              div.textContent = '';
            }
            currentPhraseIndex++;
            currentLetterIndex = 0;
            setTimeout(addLetter, delay);
          }, 1000);
        }
      }
      else {
        const div = document.getElementById("wordSection")!;
        div.classList.add('fadeOutAnimation');
        
        setTimeout(() => {
          this.pauseGif();
        }, 1000);
      }
    }  
    addLetter();
  }


  pauseGif(){
    const gifImage = document.getElementById("avatar") as HTMLImageElement;
    gifImage.src = 'assets/img/avatar.png';
  }

  show(position: number){
    this.renderer2.removeClass(this.title.get(position).nativeElement, 'hidden');
    this.renderer2.addClass(this.title.get(position).nativeElement, 'visible');
  }

  hide(position: number){
    this.renderer2.removeClass(this.title.get(position).nativeElement, 'visible');
    this.renderer2.addClass(this.title.get(position).nativeElement, 'hidden');
  }
  
  hideIcons(){
    this.hiddenIcons = true;
  }


}
