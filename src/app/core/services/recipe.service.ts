import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
// TODO: add custom paths for imports
import { Meal, MealResponse } from '../models/meal.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  httpClient = inject(HttpClient);

  constructor() {}

  getRecipes(): Observable<Meal[]> {
    return this.httpClient
      .get<MealResponse>('https://www.themealdb.com/api/json/v1/1/search.php?f=b')
      .pipe(
        map((res) => this.formatMealResponse(res))
      );
  }

  private formatMealResponse(mealResponse: MealResponse): Meal[] {
    return mealResponse.meals.map((meal) => ({
      ...meal,
      ingredientsCount: this.countIngredients(meal),
    }));
  }

  private countIngredients(recipe: Meal): number {
    return Object.keys(recipe).filter((key) => key.startsWith('strIngredient')).length;
  }
}
