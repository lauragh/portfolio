import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cobli',
  templateUrl: './cobli.component.html',
  styleUrls: ['./cobli.component.css']
})
export class CobliComponent implements OnInit {
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
