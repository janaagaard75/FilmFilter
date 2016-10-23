import { Component, Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from './hero';
import { HeroService } from './hero.service'

@Component({
  moduleId: module.id,
  selector: 'my-hero-detail',
  templateUrl: 'hero-detail.component.html'
})
export class HeroDetailComponent implements OnInit {
  constructor(
    private heroSerice: HeroService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  @Input()
  hero: Hero;

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let id = parseInt(params['id'], 10);
      this.heroSerice.getHero(id)
        .then(hero => this.hero = hero)
    });
  }

  goBack(): void {
    this.location.back();
  }
}