import { Component, effect, HostListener, inject } from '@angular/core';
import * as english from '@en';
import * as spanish from '@es';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  public isResumeOptionsOpen: boolean = false;
  public translate: any = english;
  private dataService = inject(DataService);

  constructor(){
    effect(() => {
      this.translate = this.dataService.translate();
    });
  }

  async ngOnInit(): Promise<void> {
  }

  openResumeOptions(){
    this.isResumeOptionsOpen = true;
  }

  downloadResume(value: string){
    if(value === 'es'){
      window.open('assets/cv_lauragh.pdf', '_blank');
    }
    else{
      window.open('assets/cv_lauragh_en.pdf', '_blank');
    }
    this.isResumeOptionsOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const resumeElement = document.getElementById('resume');

    if(resumeElement && !resumeElement.contains(event.target as Node)){
      this.isResumeOptionsOpen = false;
    }
  }
}
