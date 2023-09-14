import { Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import * as english from '../../../assets/traduccion/en.json';
import * as spanish from '../../../assets/traduccion/es.json';
import { DataService } from 'src/app/services/data.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit{
  page: string = '';
  idioma!: string;
  translate: any = spanish;
  isMobile: boolean = false;

  ngOnInit(): void {
    this.getLanguage();
  }

  @ViewChild('menu') menu!: ElementRef;
  @ViewChildren('op') op!: QueryList<any>;

  constructor(
    private router: Router,
    private renderer2: Renderer2,
    private dataService: DataService,
  ){}

  openContent(page: string){
    this.page = page;
    this.renderer2.addClass(this.menu.nativeElement, 'menu');
    setTimeout(() => {
      for(let op of this.op){
        this.renderer2.addClass(op.nativeElement, 'op');
      }
    }, 500);
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

  goBack(){
    if(this.page){
      this.page = '';
      this.renderer2.removeClass(this.menu.nativeElement, 'menu');
    }
    else{
      this.router.navigate(['']);
    }

  }

}
