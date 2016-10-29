import { Headers, Http } from '@angular/http'
import { Injectable } from '@angular/core'

import 'rxjs/add/operator/toPromise'

import { Hero } from './hero'
import { InMemoryDataService } from './in-memory-data.service'

@Injectable()
export class HeroService {
  constructor(
    private http: Http
  ) { }

  private headers = new Headers({ 'Content-Type': 'application/json' })
  private heroesUrl = 'app/heroes'

  create(name: String): Promise<Hero> {
    return this.http
      .post(this.heroesUrl, JSON.stringify({ name: name }), { headers: this.headers })
      .toPromise()
      .then(result => result.json().data)
      .catch(this.handleError)
  }

  getHero(id: number): Promise<Hero> {
    return this.getHeroes().then(heroes => heroes.find(hero => hero.id === id))
  }

  getHeroes(): Promise<Array<Hero>> {
    return this.http.get(this.heroesUrl)
      .toPromise()
      .then(response => response.json().data as Array<Hero>)
      .catch(this.handleError)
  }

  getHeroesSlowly(): Promise<Array<Hero>> {
    return new Promise<Array<Hero>>(
      resolve => setTimeout(resolve, 2000)
    )
      .then(() => this.getHeroes())
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred.', error) // For demo purposes only.
    return Promise.reject(error.message || error)
  }

  remove(hero: Hero): Promise<void> {
    const url = `${this.heroesUrl}/${hero.id}`
    return this.http.delete(url, { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch(this.handleError)
  }

  update(hero: Hero): Promise<Hero> {
    const url = `${this.heroesUrl}/${hero.id}`
    return this.http
      .put(url, JSON.stringify(hero), { headers: this.headers })
      .toPromise()
      .then(() => hero)
      .catch(this.handleError)
  }
}