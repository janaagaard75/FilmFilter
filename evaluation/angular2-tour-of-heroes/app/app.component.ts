import { Component } from '@angular/core'

@Component({
  selector: 'my-app',
  styleUrls: [
    './main.scss',
    './app.component.css'
  ],
  template:`
    <div class="container">
      <h1>{{title}}</h1>
      <nav>
        <a routerLink="/" routerLinkActive="active">Dashboard</a>
        <a routerLink="/heroes" routerLinkActive="active">Heroes</a>
      </nav>
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {
  title = 'Tour of Heroes'
}