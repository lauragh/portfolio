import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutComponent } from './about/about.component';
import { MobblerComponent } from './projects/mobbler/mobbler.component';
import { CobliComponent } from './projects/cobli/cobli.component';
import { GameComponent } from './projects/game/game.component';
import { HomeComponent } from './home/home.component';
import { ProjectsComponent } from './projects/projects.component';
import { WeatherComponent } from './projects/weather/weather.component';


@NgModule({
  declarations: [
    AboutComponent,
    MobblerComponent,
    CobliComponent,
    GameComponent,
    HomeComponent,
    ProjectsComponent,
    WeatherComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AboutComponent,
    MobblerComponent,
    CobliComponent,
    GameComponent,
    HomeComponent,
    ProjectsComponent,
    WeatherComponent,
  ]
})
export class PagesModule { }
