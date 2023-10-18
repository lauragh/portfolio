import { Component,  ElementRef,  OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { tap } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import * as english from '../../../assets/traduccion/en.json';
import * as spanish from '../../../assets/traduccion/es.json';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  idioma!: string;
  translate: any = spanish;
  hiddenIcons: boolean = false;
  about: boolean = true;
  opVisible: any;
  isMobile: boolean = false;

  @ViewChildren('title') title!: QueryList<any>;
  @ViewChild('email') email!: ElementRef;
  @ViewChild('options') options!: ElementRef;

  ngOnInit(): void {
    this.checkDevice();
    this.getLanguage();
    setTimeout(() => {
      this.typingEffect();
    }, 1000);
  }

  constructor(
    private dataService: DataService,
    private renderer2: Renderer2,
    private location: Location,
    private router: Router
  ){
  }

  checkDevice(){
    if (window.innerWidth <= 768) {
      this.isMobile = true;
    }
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

  setText(action: boolean){
    this.dataService.setText(action);
  }


  typingEffect() {
    const div = document.getElementById("word")!;
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
            // console.log(currentLetterIndex);
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
    if(!this.isMobile){
      this.renderer2.removeClass(this.title.get(position).nativeElement, 'hidden');
      this.renderer2.addClass(this.title.get(position).nativeElement, 'visible');
    }
  }

  hide(position: number){
    if(!this.isMobile){
      this.renderer2.removeClass(this.title.get(position).nativeElement, 'visible');
      this.renderer2.addClass(this.title.get(position).nativeElement, 'hidden');
    }
  }
  
  hideIcons(element: string, hide: boolean){
    if(element === 'projects'){
      if(hide){

      }
    }
    else{
      if(hide){
        this.about = false;
        this.hiddenIcons = true;
        console.log(this.hiddenIcons, this.isMobile);
      }
      else {
        this.about = true;
        this.hiddenIcons = false;
      }
    }
  }

  openResume(language: string){
    if(language === 'es'){
      window.open('assets/cv_lauragh.pdf', '_blank');
    }
    else{
      window.open('assets/cv_lauragh_en.pdf', '_blank');
    }
  }

  openCode(){
    window.open('https://github.com/lauragh/portfolio', '_blank');
  }

  openLinkedin(){
    window.open('https://www.linkedin.com/in/laura-garc%C3%ADa-hern%C3%A1ndez-4922251b0/', '_blank');
  }

  copyEmail(){
    navigator.clipboard.writeText('garcia.hdez.laura@gmail.com');

    const mensaje = document.createElement("div");
    const elemento = this.email.nativeElement;

    if(this.idioma === 'es'){
      mensaje.innerText = "Email copiado!";
    }
    else{
      mensaje.innerText = "Email copied!";

    }
    mensaje.style.position = "absolute";
    if(this.isMobile){
      mensaje.style.top = `${elemento.getBoundingClientRect().top + 70}px`;
      mensaje.style.left = `${elemento.getBoundingClientRect().left}px`;
    }
    else{
      mensaje.style.top = `${elemento.getBoundingClientRect().top - 50}px`;
      mensaje.style.left = `${elemento.getBoundingClientRect().left}px`;
    }
    mensaje.style.padding = "5px 10px";
    mensaje.style.background = "rgba(0, 0, 0, 0.8)";
    mensaje.style.color = "#fff";
    mensaje.style.borderRadius = "5px";
    mensaje.style.zIndex = "9999";
    document.body.appendChild(mensaje);
    setTimeout(() => {
      mensaje.remove();
    }, 2000);
  }

  goTo(){
    this.router.navigate(['/projects']);
  }

  showOptions(){
    this.renderer2.removeClass(this.options.nativeElement, 'esconder');
    this.renderer2.addClass(this.options.nativeElement, 'ver');

    setTimeout(() =>{
      this.checkInOut();
    }, 200);
  }

  listenerFn!: () => void;

  checkInOut(){
    this.listenerFn = this.renderer2.listen('document', 'click', (e: Event) =>{
      if (e.target === this.options.nativeElement.firstElementChild) {
        this.openResume('en');
      }
      else if(e.target === this.options.nativeElement.children[2]){
        this.openResume('es');
      }

      this.renderer2.removeClass(this.options.nativeElement, 'ver');
      this.renderer2.addClass(this.options.nativeElement, 'esconder');
      this.listenerFn();
    });
  }


}
