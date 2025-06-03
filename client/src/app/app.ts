import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <main class="container">
      <header>
        <h2>Employee management system</h2>
      </header>
      <section>
        <router-outlet />
      </section>
    </main>
  `,
  styles: `
  .container {
    max-width: 80%;
    margin: auto;
  }
  `,
})
export class App {}
