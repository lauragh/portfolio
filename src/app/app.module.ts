import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/shared/nav-bar/nav-bar.component';
import { AboutComponent } from './pages/about/about.component';
import { MobblerComponent } from './pages/projects/mobbler/mobbler.component';
import { CobliComponent } from './pages/projects/cobli/cobli.component';
import { GameComponent } from './pages/projects/game/game.component';
import { HomeComponent } from './pages/home/home.component';
import { DataService } from './services/data.service';
import { ResumeComponent } from './pages/resume/resume.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    AboutComponent,
    MobblerComponent,
    CobliComponent,
    GameComponent,
    HomeComponent,
    ResumeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
