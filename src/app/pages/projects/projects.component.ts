import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit{
  ngOnInit(): void {
  }

  constructor(
    private router: Router
  ){}

  goTo(page: string){
    this.router.navigate(['/projects/'+page]);
  }
  
}
