import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RecipeService } from '../core/services/recipe.service';
import { Observable } from 'rxjs';
import { Meal } from '../core/models/meal.model';
import { Card } from './card/card';
import { Search } from './search/search';
import { Categories } from './categories/categories';

@Component({
  selector: 'app-home',
  imports: [AsyncPipe, Card, Search, Categories],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private readonly recipeService = inject(RecipeService);
  protected recipes$?: Observable<Meal[]>;

  ngOnInit(): void {
    this.recipes$ = this.recipeService.searchRecipes('');
  }

  protected search(searchTerm: string | null) {
    this.recipes$ = this.recipeService.searchRecipes(searchTerm ?? '');
  }

  protected searchByCategory(name: string) {
    this.recipes$ = this.recipeService.getRecipesByCategory(name);
  }
}
