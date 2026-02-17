import { Component, signal, inject } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { LowerCasePipe, DecimalPipe, DatePipe, CurrencyPipe } from '@angular/common';
import { User } from './user';
import { Child } from './child';
import { Comments } from './comments';
import { CarService } from './car.service';

// ============================================
// BASIC COMPONENTS (Define these FIRST)
// ============================================

@Component({
  selector: 'app-first',
  standalone: true,
  template: `<h2>Hello {{ city }}, {{ 1 + 1 }}</h2>`,
  styles: `:host { color: blue; }`
})
export class CityComponent {
  city = 'San Francisco';
}

@Component({
  selector: 'app-user',
  standalone: true,
  template: `<p>Username: {{ username }}</p>`
})
export class UserComponent {
  username = 'youngTech';
}

@Component({
  selector: 'app-if',
  standalone: true,
  template: `
    @if (isServerRunning) {
      <span>Yes, the server is running</span>
    } @else {
      <span>No, the server is not running</span>
    }
  `
})
export class IfComponent {
  isServerRunning = true;
}

@Component({
  selector: 'app-for',
  standalone: true,
  template: `
    <h3>User List:</h3>
    @for (user of users; track user.id) {
      <p>{{ user.name }}</p>
    }
  `
})
export class ForLoopComponent {
  users = [
    {id: 0, name: 'Sarah'},
    {id: 1, name: 'Amy'},
    {id: 2, name: 'Rachel'},
    {id: 3, name: 'Jessica'},
    {id: 4, name: 'Poornima'}
  ];
}

@Component({
  selector: 'app-binding',
  standalone: true,
  template: `
    <div [contentEditable]="isEditable">Edit me!</div>
    <img alt="photo" [src]="imageUrl" style="max-width: 200px;" />
  `
})
export class BindingComponent {
  isEditable = true;
  imageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReLB-RgeY2xVvMCeCPkrWR20gjpxIvncVvqQ&s';
}

@Component({
  selector: 'app-button',
  standalone: true,
  template: `<button (click)="greet()">Click Me!</button>`
})
export class ButtonComponent {
  greet() {
    console.log('Hello, there 👋');
  }
}

// ============================================
// INPUT/OUTPUT COMPONENTS
// ============================================

@Component({
  selector: 'app-username',
  standalone: true,
  template: '<app-user name="Simran" />',
  imports: [User]
})
export class UsernameComponent {}

@Component({
  selector: 'app-items',
  standalone: true,
  template: `
    <h3>Add Items:</h3>
    <app-child (addItemEvent)="addItem($event)" />
    <p>🐢 all the way down {{ items.length }}</p>
  `,
  imports: [Child]
})
export class ItemsComponent {
  items: string[] = [];

  addItem(item: string) {
    this.items.push(item);
  }
}

// ============================================
// DEFER COMPONENT
// ============================================

@Component({
  selector: 'app-defer',
  standalone: true,
  template: `
    <div>
      <h2>How I feel about Angular</h2>
      <article>
        <p>
          Angular is my favorite framework, and this is why. Angular has the coolest deferrable view
          feature that makes defer loading content the easiest and most ergonomic it could possibly be.
          The Angular community is also filled with amazing contributors and experts that create excellent
          content. The community is welcoming and friendly, and it really is the best community out there.
        </p>
        <p>
          I can't express enough how much I enjoy working with Angular. It offers the best developer
          experience I've ever had. I love that the Angular team puts their developers first and takes
          care to make us very happy. They genuinely want Angular to be the best framework it can be, and
          they're doing such an amazing job at it, too. This statement comes from my heart and is not at
          all copied and pasted. In fact, I think I'll say these exact same things again a few times.
        </p>
        <p>
          Angular is my favorite framework, and this is why. Angular has the coolest deferrable view
          feature that makes defer loading content the easiest and most ergonomic it could possibly be.
          The Angular community is also filled with amazing contributors and experts that create excellent
          content. The community is welcoming and friendly, and it really is the best community out there.
        </p>
        <p>
          I can't express enough how much I enjoy working with Angular. It offers the best developer
          experience I've ever had. I love that the Angular team puts their developers first and takes
          care to make us very happy. They genuinely want Angular to be the best framework it can be, and
          they're doing such an amazing job at it, too. This statement comes from my heart and is not at
          all copied and pasted. In fact, I think I'll say these exact same things again a few times.
        </p>
        <p>
          Angular is my favorite framework, and this is why. Angular has the coolest deferrable view
          feature that makes defer loading content the easiest and most ergonomic it could possibly be.
          The Angular community is also filled with amazing contributors and experts that create excellent
          content. The community is welcoming and friendly, and it really is the best community out there.
        </p>
        <p>
          I can't express enough how much I enjoy working with Angular. It offers the best developer
          experience I've ever had. I love that the Angular team puts their developers first and takes
          care to make us very happy. They genuinely want Angular to be the best framework it can be, and
          they're doing such an amazing job at it, too. This statement comes from my heart and is not at
          all copied and pasted.
        </p>
      </article>

      @defer (on viewport) {
        <comments />
      } @placeholder {
        <p>Future comments</p>
      } @loading (minimum 2s) {
        <p>Loading comments...</p>
      }
    </div>
  `,
  imports: [Comments]
})
export class DeferComponent {}

// ============================================
// ROUTING COMPONENT
// ============================================

@Component({
  selector: 'app-route',
  standalone: true,
  template: `
    <h3>Navigation:</h3>
    <nav>
      <a routerLink="/">Home</a> |
      <a routerLink="/user">User</a>
    </nav>
    <router-outlet />
  `,
  imports: [RouterOutlet, RouterLink]
})
export class RouteComponent {}

// ============================================
// FORMS COMPONENTS
// ============================================

@Component({
  selector: 'app-form',
  standalone: true,
  template: `
    <h3>Profile Form:</h3>
    <form [formGroup]="profileForm" (ngSubmit)="handleSubmit()">
      <input type="text" formControlName="name" placeholder="Name" />
      <input type="email" formControlName="email" placeholder="Email" />
      <button type="submit">Submit</button>
    </form>

    <div>
      <p>Name: {{ profileForm.value.name }}</p>
      <p>Email: {{ profileForm.value.email }}</p>
    </div>
  `,
  imports: [ReactiveFormsModule]
})
export class FormComponent {
  profileForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl('')
  });

  handleSubmit() {
    alert(this.profileForm.value.name + ' | ' + this.profileForm.value.email);
  }
}

@Component({
  selector: 'app-validation',
  standalone: true,
  template: `
    <h3>Form with Validation:</h3>
    <form [formGroup]="profileForm">
      <input type="text" formControlName="name" placeholder="Name (required)" />
      <input type="email" formControlName="email" placeholder="Email (required)" />
      <button type="submit" [disabled]="!profileForm.valid">Submit</button>
    </form>
    <p>Form Status: {{ profileForm.valid ? '✅ Valid' : '❌ Invalid' }}</p>
  `,
  imports: [ReactiveFormsModule]
})
export class ValidationComponent {
  profileForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email])
  });
}

// ============================================
// SERVICE COMPONENT
// ============================================

@Component({
  selector: 'app-service',
  standalone: true,
  template: `
    <h3>Car Listing:</h3>
    <p>{{ display }}</p>
  `
})
export class ServiceComponent {
  carService = inject(CarService);
  display = this.carService.getCars().join(' ⭐️ ');
}

// ============================================
// PIPES COMPONENTS
// ============================================

@Component({
  selector: 'app-pipes',
  standalone: true,
  template: `
    <h3>Pipes Demo:</h3>
    <p>Lowercase: {{ username | lowercase }}</p>
    <ul>
      <li>Number: {{ num | number: '3.2-2' }}</li>
      <li>Date: {{ birthday | date: 'medium' }}</li>
      <li>Currency: {{ cost | currency }}</li>
    </ul>
  `,
  imports: [LowerCasePipe, DecimalPipe, DatePipe, CurrencyPipe]
})
export class PipesComponent {
  username = 'yOunGTECh';
  num = 103.1234;
  birthday = new Date(2023, 3, 2);
  cost = 4560.34;
}

@Component({
  selector: 'app-reverse',
  standalone: true,
  template: `
    <h3>Reverse Machine:</h3>
    <p>Original: {{ word }}</p>
    <p>Reversed: {{ reversedWord }}</p>
  `
})
export class ReverseComponent {
  word = 'You are a champion';
  reversedWord = this.word.split('').reverse().join('');
}

// ============================================
// MAIN ROOT COMPONENT (MUST BE LAST!)
// ============================================

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <h1>My Angular App</h1>

    <hr>
    <app-first></app-first>

    <hr>
    <app-user></app-user>

    <hr>
    <app-if></app-if>

    <hr>
    <app-for></app-for>

    <hr>
    <app-username></app-username>

    <hr>
    <app-items></app-items>

    <hr>
    <app-defer></app-defer>

    <hr>
    <app-route></app-route>

    <hr>
    <app-form></app-form>

    <hr>
    <app-validation></app-validation>

    <hr>
    <app-service></app-service>

    <hr>
    <app-pipes></app-pipes>

    <hr>
    <app-reverse></app-reverse>
  `,
  imports: [
    CityComponent,
    UserComponent,
    IfComponent,
    ForLoopComponent,
    UsernameComponent,
    ItemsComponent,
    DeferComponent,
    RouteComponent,
    FormComponent,
    ValidationComponent,
    ServiceComponent,
    PipesComponent,
    ReverseComponent
  ],
  styles: `
    :host {
      color: #333;
    }
    hr {
      margin: 20px 0;
      border: 1px solid #ddd;
    }
  `
})
export class AppComponent {
  protected readonly title = signal('task1');
}
