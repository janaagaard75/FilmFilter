import { Injectable } from '@angular/core';

import { Hero } from './hero'
import { HEROES } from './mock-heroes'

@Injectable()
export class HeroService {
  getHeroes(): Promise<Array<Hero>> {
    return Promise.resolve(HEROES);
  }

  getHeroesSlowly(): Promise<Array<Hero>> {
    return new Promise<Array<Hero>>(
        resolve => setTimeout(resolve, 2000)
      )
      .then(() => this.getHeroes());
  }
}