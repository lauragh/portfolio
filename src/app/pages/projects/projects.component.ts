import { Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  page: string | undefined;
  idioma!: string;
  translate: any = spanish;
  isMobile: boolean = false;

  ngOnInit(): void {
    this.checkDevice();
    this.getLanguage();
    this.loadContent();
  }

  @ViewChild('menu') menu!: ElementRef;
  @ViewChildren('op') op!: QueryList<any>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private renderer2: Renderer2,
    private dataService: DataService,
  ){}


  loadContent(){
    this.route.queryParams.subscribe(params => {
      if(params['project']){
          this.page = params['project'];
      }
    });
  }                              

  openContent(page: string){
    this.page = page;

    // if(!this.isMobile){
    //   this.renderer2.addClass(this.menu.nativeElement, 'menu');
    //   setTimeout(() => {
    //     for(let op of this.op){
    //       this.renderer2.addClass(op.nativeElement, 'op');
    //     }
    //   }, 500);
    // }

    this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { project: page },
        queryParamsHandling: 'merge'
    });
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
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { project: null },
        queryParamsHandling: 'merge'
    });
    }
    else{
      this.router.navigate(['']);
    }
  }

  closePage(event: MouseEvent) {
    if(event.target === event.currentTarget){
      this.page = '';
    }
  }

}
