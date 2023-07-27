import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  words: string = 'Hola, me llamo Laura. Actualmente estoy trabajando como Programadora FullStack en BeXReal';
  
  ngOnInit(): void {
    setTimeout(() => {
      this.typingEffect();
    }, 1000);
  }

  constructor(){
  }


  typingEffect() {
    const div = document.getElementById("word")!;
    const phrases = this.words.split('.');
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
  


}
