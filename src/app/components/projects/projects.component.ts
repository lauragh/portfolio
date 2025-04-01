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
  public projectSelected: string = '';
  public translate: any = english;
  private dataService = inject(DataService);

  constructor(){
    effect(() => {
      this.translate = this.dataService.translate();
      this.projectSelected = this.dataService.isProjectSelected();
    });
  }

  openProject(project: string){
    this.projectSelected = project;
    this.dataService.isProjectSelected.set(project);
  }

}
