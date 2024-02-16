import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit{
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
