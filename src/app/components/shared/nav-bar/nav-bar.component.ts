import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  @ViewChild('idioma', { static: true }) idioma!: ElementRef;

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
      const isHomePage = this.router.url === '/';

      if(isHomePage){
        location.reload();
      }
    }

    this.dataService.setIdioma(selectedLanguage);
  }


}
