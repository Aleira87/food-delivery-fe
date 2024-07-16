import { Component, effect, EventEmitter, Output, signal } from '@angular/core';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.css',
})
export class SearchInputComponent {
  private searchTerm = signal<string>('');
  @Output() searchChange = new EventEmitter<string>();

  constructor() {
    effect(() => {
      this.searchChange.emit(this.searchTerm());
    });
  }

  updateSearchTerm(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
  }

  getSearchTerm(): string {
    return this.searchTerm();
  }
}
