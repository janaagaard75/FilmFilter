import { Component } from '@angular/core'
import { OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { Hero } from './hero'
import { HeroService } from './hero.service'

@Component({
  selector: 'my-heroes',
  styleUrls: [ './heroes.component.css' ],
  templateUrl: './heroes.component.html'
})
export class HeroesComponent implements OnInit {
  constructor(
    private heroService: HeroService,
    private router: Router
  ) { }

  heroes: Array<Hero>
  selectedHero: Hero

  add(name: string) {
    name = name.trim()
    if (!name) {
      return
    }

    this.heroService.create(name)
      .then(hero => {
        this.heroes.push(hero)
        this.selectedHero = null
      })
  }

  delete(hero: Hero) {
    this.heroService.remove(hero)
      .then(() => {
        this.heroes = this.heroes.filter(h => h !== hero)
        if (this.selectedHero === hero) {
          this.selectedHero = null
        }
      })
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .then(heroes => this.heroes = heroes)
  }

  // TODO: Should this be some kind of globally accessible method? 'hero' is repeated quite a few times in the app.
  gotoDetail(): void {
    this.router.navigate(['/hero', this.selectedHero.id])
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero
  }

  ngOnInit(): void {
    this.getHeroes()
  }
}