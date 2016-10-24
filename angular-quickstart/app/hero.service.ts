import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

import { Hero } from './hero'
import { InMemoryDataService } from './in-memory-data.service'

@Injectable()
export class HeroService {
  constructor(
    private http: Http
  ) { }

  private heroesUrl = 'app/heroes';

  getHero(id: number): Promise<Hero> {
    return this.getHeroes().then(heroes => heroes.find(hero => hero.id === id));
  }

  getHeroes(): Promise<Array<Hero>> {
    return this.http.get(this.heroesUrl)
      .toPromise()
      .then(response => response.json().data as Array<Hero>)
      .catch(this.handleError);
  }

  getHeroesSlowly(): Promise<Array<Hero>> {
    return new Promise<Array<Hero>>(
      resolve => setTimeout(resolve, 2000)
    )
      .then(() => this.getHeroes());
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred.', error); // For demo purposes only.
    return Promise.reject(error.message || error);
  }
}