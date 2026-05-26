import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export enum StorageKeys {
  FAVORITES = 'favorites',
  TODO = 'todo'
}

@Injectable({
  providedIn: 'root',
})

export class StorageService {
  $favoritesRecipes = new BehaviorSubject<string[]>([]);
  $toDoRecipes = new BehaviorSubject<string[]>([]);

  constructor() {
    this.initializeStorage();
  }

  initializeStorage() {
    console.log('initializeStorage');
    this.$favoritesRecipes.next(this.getFromLocalStorage(StorageKeys.FAVORITES));
    this.$toDoRecipes.next(this.getFromLocalStorage(StorageKeys.TODO));
  }

  addToLocalStorage(key: string, value: any) {
    let itemsUpdated: string[] = [];
    if (key === StorageKeys.FAVORITES) {
      this.$favoritesRecipes.next([...this.$favoritesRecipes.value, value]);
      itemsUpdated = [...this.$favoritesRecipes.value];
    } else if (key === StorageKeys.TODO) {
      this.$toDoRecipes.next([...this.$toDoRecipes.value, value]);
      itemsUpdated = [...this.$toDoRecipes.value];
    }
    console.log(itemsUpdated);
    localStorage.setItem(key, JSON.stringify(itemsUpdated));
  }

  getFromLocalStorage(key: string): [] {
    const items = localStorage.getItem(key);
    if(items && items.length > 0) {
      return JSON.parse(items);
    } else {
      return [];
    }
  }

  removeItemFromLocalStorage(key: string, idMeal: string) {
    let itemsUpdated: string[] = [];
    if (key === StorageKeys.FAVORITES) {
      this.$favoritesRecipes.next(this.$favoritesRecipes.value.filter((item: string) => item !== idMeal));
      itemsUpdated = [...this.$favoritesRecipes.value];
    } else if (key === StorageKeys.TODO) {
      this.$toDoRecipes.next(this.$toDoRecipes.value.filter((item: string) => item !== idMeal));
      itemsUpdated = [...this.$toDoRecipes.value];
    }
    localStorage.setItem(key, JSON.stringify(itemsUpdated));
  }
}
