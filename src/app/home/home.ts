import { Component, inject, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild(Categories) categoriesComponent!: Categories;
  @ViewChild(Search) searchComponent!: Search;
  private readonly recipeService = inject(RecipeService);
  protected recipes$?: Observable<Meal[]>;

  ngOnInit(): void {
    this.recipes$ = this.recipeService.searchRecipes('');
  }

  protected search(searchTerm: string | null) {
    // reset selected category on input search
    this.categoriesComponent.selectedCategory = null;
    this.recipes$ = this.recipeService.searchRecipes(searchTerm ?? '');
  }

  protected searchByCategory(categoryName: string | null ) {
    if (categoryName) {
      // reset input search on category filtering
      this.searchComponent.inputSearch = '';
      this.recipes$ = this.recipeService.getRecipesByCategory(categoryName);
    } else {
      this.search(null);
    }

  }
}
