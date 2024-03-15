import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'urlFormat',
})
export class UrlFormatPipe implements PipeTransform {
  transform(url: string): string {
    return url;
  }
}
