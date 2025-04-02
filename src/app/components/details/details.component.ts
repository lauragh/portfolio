import { Component, effect, inject, QueryList, Renderer2, ViewChildren, ElementRef, AfterViewInit, ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA, HostListener, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import * as english from '@en';
import { ProjectDetails, ProjectName } from 'src/app/interfaces/Project';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details',
  imports: [CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DetailsComponent implements AfterViewInit{
  private dataService = inject(DataService);
  private cdRef = inject(ChangeDetectorRef)
  public translate: any = english;
  public projectSelected!: ProjectDetails;
  public projectDetails: ProjectDetails[] = [
    {
      project: ProjectName.configurator,
      title: this.translate.projects.configurator.title,
      description: this.translate.configurator.description,
      challenge: this.translate.configurator.challenge,
      solution: this.translate.configurator.solution,
      technologies: this.translate.configurator.technologies,
      languages: this.translate.configurator.languages,
      images: [
        'assets/img/projects/configurator/config1.png',
        'assets/img/projects/configurator/config2.png',
        'assets/img/projects/configurator/config3.png',
        'assets/img/projects/configurator/config4.png',
        'assets/img/projects/configurator/config5.png',
        'assets/img/projects/configurator/config6.png',
        'assets/img/projects/configurator/config7.png',
      ],
      video: 'assets/video/configurator.mp4'
    },
    {
      project: ProjectName.digitalTwin,
      title: this.translate.projects.digitalTwin.title,
      description: this.translate.digitalTwin.description,
      challenge: this.translate.digitalTwin.challenge,
      solution: this.translate.digitalTwin.solution,
      technologies: this.translate.digitalTwin.technologies,
      languages: this.translate.digitalTwin.languages,
      images: [
        'assets/img/projects/digitalTwin/digitalTwin.png',
      ],
      video: 'assets/video/digitalTwin.mp4'

    },
    {
      project: ProjectName.teleassistance,
      title: this.translate.projects.teleassistance.title,
      description: this.translate.teleassistance.description,
      challenge: this.translate.teleassistance.challenge,
      solution: this.translate.teleassistance.solution,
      technologies: this.translate.teleassistance.technologies,
      languages: this.translate.teleassistance.languages,
      images: [
        'assets/img/projects/teleassistance/teleassistance0.png',
        'assets/img/projects/teleassistance/teleassistance1.png',
        'assets/img/projects/teleassistance/teleassistance2.png',
        'assets/img/projects/teleassistance/teleassistance3.png',
        'assets/img/projects/teleassistance/teleassistance4.png',
      ]
    },
    {
      project: ProjectName.catalog,
      title: this.translate.projects.catalog.title,
      description: this.translate.catalog.description,
      challenge: this.translate.catalog.challenge,
      solution: this.translate.catalog.solution,
      technologies: this.translate.catalog.technologies,
      languages: this.translate.catalog.languages,
      images: [
        'assets/img/projects/catalog/catalog0.png',
        'assets/img/projects/catalog/catalog1.png',
        'assets/img/projects/catalog/catalog2.png',
        'assets/img/projects/catalog/catalog3.png',
      ],
    },
    {
      project: ProjectName.game,
      title: this.translate.projects.game.title,
      description: this.translate.game.description,
      tasks: this.translate.game.tasks,
      technologies: this.translate.game.technologies,
      languages: this.translate.game.languages,
      images: [
        'assets/img/projects/game/game.png',
        'assets/img/projects/game/game2.png',
      ],
      videoYoutube: this.translate.game.videoYoutube,
    },
    {
      project: ProjectName.mobbler,
      title: this.translate.projects.mobbler.title,
      caption: this.translate.projects.mobbler.caption,
      description: this.translate.mobbler.description,
      tasks: this.translate.mobbler.tasks,
      technologies: this.translate.mobbler.technologies,
      languages: this.translate.mobbler.languages,
      images: [
        'assets/img/projects/mobbler/mobbler.png',
        'assets/img/projects/mobbler/mobbler1.JPG',
        'assets/img/projects/mobbler/mobbler2.JPG',
        'assets/img/projects/mobbler/mobbler3.JPG',
        'assets/img/projects/mobbler/mobbler4.JPG',
      ],
      videoYoutube: this.translate.mobbler.videoYoutube,
    },
    {
      project: ProjectName.weather,
      title: this.translate.projects.weather.title,
      description: this.translate.weather.description,
      technologies: this.translate.weather.technologies,
      languages: this.translate.weather.languages,
      images: [
        'assets/img/projects/weather/tiempo.png',
        'assets/img/projects/weather/pc.png',
        'assets/img/projects/weather/pc2.png',
        'assets/img/projects/weather/pc3.png',
        'assets/img/projects/weather/pc-modo-noche.png',
        'assets/img/projects/weather/mobile.png',
        'assets/img/projects/weather/movil1.jpg',
        'assets/img/projects/weather/movil2.jpg',
        'assets/img/projects/weather/movil3.jpg',
      ]
    },
    {
      project: ProjectName.cobli,
      title: this.translate.projects.cobli.title,
      description: this.translate.cobli.description,
      technologies: this.translate.cobli.technologies,
      languages: this.translate.cobli.languages,
      images: [
        'assets/img/projects/cobli/cobli.png',
        'assets/img/projects/cobli/cobli_page0.png',
        'assets/img/projects/cobli/cobli_page1.png',
        'assets/img/projects/cobli/cobli_page2.png',
        'assets/img/projects/cobli/cobli_page3.png',
        'assets/img/projects/cobli/cobli_page4.png',
      ],
      videoYoutube: this.translate.cobli.videoYoutube,
    },
  ];

  public lastImageZoomedIn: number = -1;
  public imgSrcZoomedIn: string = '';
  public currentIndex: number = 0;

  @ViewChildren('images') images: QueryList<ElementRef> | undefined;
  @ViewChild('detailsContent', { static: false }) detailsContent: ElementRef | undefined;

  constructor(
  ){
    effect(() => {
      this.translate = this.dataService.translate();
      const projectSelected =  this.dataService.isProjectSelected();
      this.projectSelected = this.projectDetails.find((project: ProjectDetails) => project.project === projectSelected)!;

    });
  }

  ngAfterViewInit(){
    this.selectImage(0);
    this.cdRef.detectChanges();
  }

  @HostListener('document:click', ['$event'])
  onClick(event: Event): void {
    const target = event.target as HTMLElement;
    if(this.detailsContent?.nativeElement && !this.detailsContent.nativeElement.contains(target)) {
      this.dataService.isProjectSelected.set('');
    }
  }

  selectImage(index: number){
    const image = this.images?.get(index)?.nativeElement;
    if(image){
      this.imgSrcZoomedIn = image.src;
    }
    this.currentIndex = index;
  }

  zoomImage(){

  }

  prevImage() {
    if(this.currentIndex > 0){
      this.currentIndex--;
    }
    else {
      this.currentIndex = this.projectSelected.images.length - 1;
    }
    this.imgSrcZoomedIn = this.projectSelected.images[this.currentIndex];
    this.scrollToSelectedImage();
  }

  nextImage() {
    if(this.currentIndex < this.projectSelected.images.length - 1){
      this.currentIndex++;
      this.imgSrcZoomedIn = this.projectSelected.images[this.currentIndex];
    }
    else {
      this.currentIndex = 0;
      this.imgSrcZoomedIn = this.projectSelected.images[0];
    }

    this.scrollToSelectedImage();
  }

  scrollToSelectedImage() {
    setTimeout(() => {
      const selectedImg = this.images?.get(this.currentIndex);
      if(selectedImg){
        selectedImg.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }, 100);
  }
}
