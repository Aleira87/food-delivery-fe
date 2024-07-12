import {
  Component,
  effect,
  EventEmitter,
  Output,
  signal,
  Signal,
} from '@angular/core';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.css',
})
export class SearchInputComponent {
  searchTerm: Signal<string> = signal('');
  @Output() searchChange = new EventEmitter<string>();

  constructor() {
    effect(() => {
      this.searchChange.emit(this.searchTerm());
    });
  }

  updateSearchTerm(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchChange.emit(input.value);
  }
}
