import { Component, Input } from '@angular/core';
import { Meal } from '../../core/models/meal.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card',
  imports: [RouterLink],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  @Input() recipe!: Meal;
}
