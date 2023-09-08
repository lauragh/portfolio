import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cobli',
  templateUrl: './cobli.component.html',
  styleUrls: ['./cobli.component.css']
})
export class CobliComponent implements OnInit {
  @Input() translate: any;
  
  ngOnInit(): void {
  }

  constructor(
  ){}

}
