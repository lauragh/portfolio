import { Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit{
  page!: string;

  ngOnInit(): void {
  }

  @ViewChild('menu') menu!: ElementRef;
  @ViewChildren('op') op!: QueryList<any>;

  constructor(
    private router: Router,
    private renderer2: Renderer2
  ){}

  goTo(page: string){
    this.page = page;
    // this.router.navigate(['/projects/'+page]);
    this.renderer2.addClass(this.menu.nativeElement, 'menu');
    setTimeout(() => {
      for(let op of this.op){
        console.log(op);
        this.renderer2.addClass(op.nativeElement, 'op');
      }
    }, 500);
  }

}
