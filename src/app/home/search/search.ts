import { Component, EventEmitter, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  imports: [FormsModule],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {
  @Output() searchEvent = new EventEmitter<string | null>();
  inputSearch: string = ''

  protected search() {
    this.searchEvent.emit(this.inputSearch);
  }
}
