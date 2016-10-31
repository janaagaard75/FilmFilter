import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'

import { HeroSearchService } from './hero-search.service'
import { Hero } from './hero'

@Component({
  selector: 'hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css'],
  providers: [HeroSearchService]
})
export class HeroSearchComponent implements OnInit {
  constructor(
    private heroSearchService: HeroSearchService,
    private router: Router
  ) { }

  heroes: Observable<Array<Hero>>
  private searchTerms = new Subject<string>()

  ngOnInit(): void {
    this.heroes = this.searchTerms
      .debounceTime(300) // Wait for 300ms pause in events.
      .distinctUntilChanged() // Ignore if next search term is same as previous.
      .switchMap(term => {
        if (!term) {
          return Observable.of<Array<Hero>>([])
        }

        return this.heroSearchService.search(term)
      })
      .catch(error => {
        // TODO: real error handling.
        console.log(error)
        return Observable.of<Array<Hero>>([])
      })
  }

  gotoDetail(hero: Hero): void {
    let link = ['/hero', hero.id]
    this.router.navigate(link)
  }

  /** Push a search term into the observable stream. */
  search(term: string): void {
    this.searchTerms.next(term)
  }
}