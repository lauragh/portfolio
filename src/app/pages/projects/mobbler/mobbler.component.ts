import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-mobbler',
  templateUrl: './mobbler.component.html',
  styleUrls: ['./mobbler.component.css']
})
export class MobblerComponent implements OnInit {
  @Input() translate: any;
  isMobile: boolean = false;
  
  ngOnInit(): void {
    this.checkDevice()
  }

  constructor(
  ){}

  checkDevice(){
    if (window.innerWidth <= 768) {
      this.isMobile = true;
      console.log('soy movil')
    }
  }
}
