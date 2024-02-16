import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit{
  @Input() translate: any;
  isMobile: boolean = false;
  
  ngOnInit(): void {
    this.checkDevice()
  }

  constructor(
  ){ }

  checkDevice(){
    if (window.innerWidth <= 768) {
      this.isMobile = true;
      console.log('soy movil')
    }
  }
}
