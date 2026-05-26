import { Component, inject, OnInit, signal } from '@angular/core';
import { RecipeService } from '../core/services/recipe.service';
import { Observable } from 'rxjs';
import { Meal } from '../core/models/meal.model';
import { Router } from '@angular/router';
import { AsyncPipe, Location, NgClass } from '@angular/common';
import { StorageKeys, StorageService } from '../core/services/storage.service';

@Component({
  selector: 'app-detail',
  imports: [AsyncPipe, NgClass],
  templateUrl: './detail.html',
  styleUrl: './detail.css',
})
export class Detail implements OnInit {
  recipeService = inject(RecipeService);
  storageService = inject(StorageService);
  location = inject(Location);
  router = inject(Router);
  recipe$: Observable<Meal> | undefined;
  recipeId: string | undefined;
  error = signal<string | null>(null);
  isFavorite = signal(false);
  isToDo = signal(false);

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

  back(): void {
    this.location.back();
  }

  addToFavorites() {
    this.isFavorite.set(!this.isFavorite());
    if (this.isFavorite()) {
      this.storageService.addToLocalStorage(StorageKeys.FAVORITES, this.recipeId);
    } else {
      this.storageService.removeItemFromLocalStorage(StorageKeys.FAVORITES, this.recipeId!);
    }
  }

  addToDo() {
    this.isToDo.set(!this.isToDo());
    if (this.isToDo()) {
      this.storageService.addToLocalStorage(StorageKeys.TODO, this.recipeId);
    } else {
      this.storageService.removeItemFromLocalStorage(StorageKeys.TODO, this.recipeId!);
    }
  }
}
