import { Component } from '@angular/core';
import { Project } from 'src/app/interfaces/Project';

@Component({
  selector: 'app-projects',
  imports: [],
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
  ]

}
