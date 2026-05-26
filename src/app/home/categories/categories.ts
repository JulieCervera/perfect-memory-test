import { Component, EventEmitter, inject, Output } from '@angular/core';
import { RecipeService } from '../../core/services/recipe.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgClass, TitleCasePipe } from '@angular/common';
import { Category } from '../../core/models/category.model';

@Component({
  selector: 'app-categories',
  imports: [ TitleCasePipe, NgClass],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories {
  @Output() categoryEvent = new EventEmitter<string | null>();
  recipeService = inject(RecipeService);
  categories: Category[] = [];
  selectedCategory: string | null = null;

  constructor() {
    this.recipeService
      .getAllCategories()
      .pipe(takeUntilDestroyed())
      .subscribe((categories) => (this.categories = categories));
  }

  protected selectCategory(category: string) {
    if (this.selectedCategory === category) {
      this.selectedCategory = null;
      this.categoryEvent.emit(null);
    } else {
      this.selectedCategory = category;
      this.categoryEvent.emit(category);
    }

  }
}
