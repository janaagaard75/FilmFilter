import { Component } from '@angular/core'
import { OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { Hero } from './hero'
import { HeroService } from './hero.service'

@Component({
  selector: 'my-dashboard',
  styleUrls: [ './dashboard.component.css' ],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  constructor(
    private heroService: HeroService,
    private router: Router
  ) { }

  heroes: Array<Hero> = []

  ngOnInit(): void {
    this.heroService.getHeroes()
      .then(heroes => this.heroes = heroes.slice(1, 5))
  }

  gotoDetail(hero: Hero): void {
    let link = ['/hero', hero.id]
    this.router.navigate(link)
  }
}

// TODO: Use Bootstrap components. See https://ng-bootstrap.github.io/#/home.