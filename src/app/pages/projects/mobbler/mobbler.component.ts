import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mobbler',
  templateUrl: './mobbler.component.html',
  styleUrls: ['./mobbler.component.css']
})
export class MobblerComponent implements OnInit {
  @Input() translate: any;
    
  ngOnInit(): void {
  }

  constructor(
  ){}



}
