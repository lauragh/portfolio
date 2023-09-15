import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-mobbler',
  templateUrl: './mobbler.component.html',
  styleUrls: ['./mobbler.component.css']
})
export class MobblerComponent implements OnInit {
  initialPinchDistance: number = 0;
  currentPinchDistance: number = 0;
  currentScale: number = 1;
  @Input() translate: any;
  @ViewChild('picZoom') picZoom!: ElementRef;

  ngOnInit(): void {
  }

  constructor(
  ){}


  // zoom(){
  //   const zoomImage = document.getElementById('zoom-image')!;

  //   zoomImage.addEventListener('touchstart', (e) => {
  //       if (e.touches.length === 2) {
  //           this.initialPinchDistance = Math.hypot(
  //               e.touches[0].pageX - e.touches[1].pageX,
  //               e.touches[0].pageY - e.touches[1].pageY
  //           );
  //       }
  //   });

  //   zoomImage.addEventListener('touchmove', (e) => {
  //       if (e.touches.length === 2) {
  //           this.currentPinchDistance = Math.hypot(
  //               e.touches[0].pageX - e.touches[1].pageX,
  //               e.touches[0].pageY - e.touches[1].pageY
  //           );
            
  //           const scaleChange = this.currentPinchDistance / this.initialPinchDistance;
  //           const newScale = this.currentScale * scaleChange;
            
  //           if (newScale >= 1) {
  //               this.currentScale = newScale;
  //               zoomImage.style.transform = `scale(${this.currentScale})`;
  //           }
  //       }
  //   });

  //   zoomImage.addEventListener('touchend', () => {
  //       this.initialPinchDistance = 0;
  //   });
  // }

  // zoomInPic(pic: string){
  //   console.log('llamo', pic);
  //   this.picZoom.nativeElement.src = `assets/img/projects/${pic}.JPG`
  // }


}
