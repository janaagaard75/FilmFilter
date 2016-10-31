import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { NgModule } from '@angular/core'
import './rxjs-extensions'

import { AppRoutingModule } from './app-routing.module'

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api'
import { InMemoryDataService }  from './in-memory-data.service'

import { AppComponent } from './app.component'
import { DashboardComponent } from './dashboard.component'
import { HeroDetailComponent } from './hero-detail.component'
import { HeroesComponent } from './heroes.component'
import { HeroSearchComponent } from './hero-search.component'
import { HeroService } from './hero.service'

@NgModule({
  bootstrap: [
    AppComponent
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroDetailComponent,
    HeroSearchComponent,
    HeroesComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService)
  ],
  providers: [
    HeroService
  ]
})
export class AppModule { }