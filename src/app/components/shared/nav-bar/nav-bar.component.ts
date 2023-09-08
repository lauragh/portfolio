import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import * as english from '../../../../assets/traduccion/en.json';
import * as spanish from '../../../../assets/traduccion/es.json';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  @ViewChild('idioma', { static: true }) idioma!: ElementRef;
  translate: any = spanish;

  ngOnInit(): void {
    const storedLanguage = localStorage.getItem('idioma');

    if (storedLanguage) {
      this.idioma.nativeElement.value = storedLanguage;
    }
    this.cambioIdioma();

  }

  constructor(
    private dataService: DataService,
    private router: Router
  ){}


  cambioIdioma(){
    const selectedLanguage = this.idioma.nativeElement.value;
    const storedLanguage = localStorage.getItem('idioma');

    if (!storedLanguage || storedLanguage !== selectedLanguage) {
      localStorage.setItem('idioma', selectedLanguage);
      selectedLanguage === 'en' ? this.translate = english : this.translate = spanish;
      const isHomePage = this.router.url === '/';
      
      this.dataService.textG
      .subscribe(text => {  
        if(!text && isHomePage){
          location.reload();
        }
      });
    }

    this.dataService.setIdioma(selectedLanguage);
  }


}
