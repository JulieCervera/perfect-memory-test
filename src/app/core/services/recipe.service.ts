import { inject, Injectable } from '@angular/core';
import { debounceTime, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
// TODO: add custom paths for imports
import { Ingredient, Meal, MealResponse } from '../models/meal.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  httpClient = inject(HttpClient);

  constructor() {}

  searchRecipes(input: string): Observable<Meal[]> {
    return this.httpClient
      .get<MealResponse>(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`)
      .pipe(map((res) => this.formatMealResponse(res)));
  }

  getRecipeById(id: string): Observable<Meal> {
    return this.httpClient
      .get<MealResponse>(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .pipe(map((res) => this.formatMealResponse(res)[0]));
  }

  private formatMealResponse(mealResponse: MealResponse): Meal[] {
    if (!mealResponse.meals || typeof mealResponse.meals === "string") { return [];}
    return mealResponse.meals.map((meal) => ({
      ...meal,
      ingredients: this.formatIngredients(meal),
    })).slice(0,10);
  }

  // TODO: real type for recipe
  private formatIngredients(recipe: any): Ingredient[] {
    const ingredientsList = Object.keys(recipe).filter((key) => key.startsWith('strIngredient'));
    return ingredientsList
      .map((key) => ({
        value: recipe[key],
        measure: recipe[`strMeasure${key.split('strIngredient')[1]}`],
      }))
      .filter((item) => item.value);
  }
}
