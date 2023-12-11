import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'UsernameLabel'
})

export class UsernamePipe implements PipeTransform {
    transform(value: string | null | undefined): string {
        if (value === null || value === undefined) {
          return '';
        }
        const replacedValue = value.replace(/"/g, '');
        const capitalizedValue = replacedValue.charAt(0).toUpperCase() + replacedValue.slice(1);
    
        return capitalizedValue;
      }
}