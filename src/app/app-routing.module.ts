import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { CobliComponent } from './pages/projects/cobli/cobli.component';
import { GameComponent } from './pages/projects/game/game.component';
import { MobblerComponent } from './pages/projects/mobbler/mobbler.component';
import { ProjectsComponent } from './pages/projects/projects.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'projects/cobli', component: CobliComponent },
  { path: 'projects/rains-of-rhodianur', component: GameComponent },
  { path: 'projects/cobli', component: CobliComponent },
  { path: 'projects/mobbler', component: MobblerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
