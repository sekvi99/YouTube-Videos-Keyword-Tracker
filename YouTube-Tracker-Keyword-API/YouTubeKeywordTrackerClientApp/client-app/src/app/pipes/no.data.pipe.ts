import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'noDataLabel'
})
export class NoDataPipe implements PipeTransform {
    transform(value: undefined | string): string {
        return value ?? 'Brak danych';
    }
}