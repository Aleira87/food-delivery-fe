import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ratingpipe',
  standalone: true,
})
export class RatingpipePipe implements PipeTransform {
  transform(value: number): string {
    if (value >= 4.5) {
      return 'Eccellente';
    } else if (value >= 4.0) {
      return 'Molto buono';
    } else if (value >= 3.0) {
      return 'Buono';
    } else if (value >= 2.0) {
      return 'Sufficiente';
    } else if (value >= 1.0) {
      return 'Scarso';
    } else {
      return 'Insufficiente';
    }
  }
}
