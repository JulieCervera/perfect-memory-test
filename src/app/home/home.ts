import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RecipeService } from '../core/services/recipe.service';
import { Observable } from 'rxjs';
import { Meal } from '../core/models/meal.model';
import { Card } from './card/card';
import { Search } from './search/search';

@Component({
  selector: 'app-home',
  imports: [AsyncPipe, Card, Search],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private readonly recipeService = inject(RecipeService);
  protected recipes$?: Observable<Meal[]>;

  ngOnInit(): void {
    this.recipes$ = this.recipeService.getRecipes();
  }

  protected search(searchTerm: string | null) {
    // TODO add debounce
    this.recipeService.searchRecipes(searchTerm ?? '').subscribe();
  }
}
