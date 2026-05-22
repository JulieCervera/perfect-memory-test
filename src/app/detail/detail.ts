import { Component, inject, OnInit, signal } from '@angular/core';
import { RecipeService } from '../core/services/recipe.service';
import { Observable } from 'rxjs';
import { Meal } from '../core/models/meal.model';
import { Router } from '@angular/router';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-detail',
  imports: [AsyncPipe, JsonPipe],
  templateUrl: './detail.html',
  styleUrl: './detail.css',
})
export class Detail implements OnInit {
  recipeService = inject(RecipeService);
  router = inject(Router);
  recipe$: Observable<Meal> | undefined;
  recipeId: string | undefined;
  error = signal<string | null>(null);

  constructor() {
    // TODO better way to extract id from url
    this.recipeId = this.router.url.split('/').pop();
  }

  ngOnInit(): void {
    if (this.recipeId) {
      this.recipe$ = this.recipeService.getRecipeById(this.recipeId);
    } else {
      this.error.set('Recipe not found');
    }
    if (!this.recipe$) {
      this.error.set('Recipe not found');
    }
  }
}
