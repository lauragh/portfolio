import { Component, effect, inject } from '@angular/core';
import { Project } from 'src/app/interfaces/Project';
import { DetailsComponent } from "../details/details.component";
import { DataService } from 'src/app/services/data.service';
import * as english from '@en';

@Component({
  selector: 'app-projects',
  imports: [DetailsComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  public listProjects: Project[] = [
    {
      title: 'Configurador Silos',
      tags: ['forms', 'threejs'],
      imgSrc: ['assets/img/projects/tiempo.png']
    },
    {
      title: 'Bexflow',
      tags: ['Teleasistencia', 'threejs'],
      imgSrc: ['assets/img/projects/tiempo.png']
    },
    {
      title: 'Polígonos industriales',
      tags: ['forms', 'threejs'],
      imgSrc: ['assets/img/projects/tiempo.png']
    },
    {
      title: 'Catálogo 3d',
      tags: ['forms', 'threejs'],
      imgSrc: ['assets/img/projects/tiempo.png']
    },
    {
      title: 'El tiempo',
      tags: ['forms', 'threejs'],
      imgSrc: ['assets/img/projects/tiempo.png']
    },
    {
      title: 'Cobli',
      tags: ['forms', 'threejs'],
      imgSrc: ['assets/img/projects/cobli_bento0.png', 'assets/img/projects/cobli_bento1.png']
    },
    {
      title: 'Mobbler',
      tags: ['forms', 'threejs'],
      imgSrc: ['assets/img/projects/cobli_bento0.png', 'assets/img/projects/cobli_bento1.png']
    },
    {
      title: 'Videojuegos',
      tags: ['forms', 'threejs'],
      imgSrc: ['assets/img/projects/cobli_bento0.png', 'assets/img/projects/cobli_bento1.png']
    },
  ];
  public projectSelected: string = '';
  private dataService = inject(DataService);
  public translate: any = english;

  constructor(){
    effect(() => {
      this.translate = this.dataService._translate();
    });
  }

  openProject(project: string){
    this.projectSelected = project;
  }
}
