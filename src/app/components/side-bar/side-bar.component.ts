import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css',
})
export class SideBarComponent {
  isOpen: boolean = false;

  toggleMenu() {
    this.isOpen = !this.isOpen;
    console.log(this.isOpen);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    if (target.tagName === 'A') {
      this.toggleMenu();
    }
  }
}
