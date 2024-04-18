import { MatPaginatorIntl } from '@angular/material/paginator';
import { Injectable } from '@angular/core';

@Injectable()
export class TranslatedPaginatorIntl extends MatPaginatorIntl {
  override itemsPerPageLabel: string = 'Pozycje na stronę: ';
  override nextPageLabel: string = 'Następna strona';
  override previousPageLabel: string = 'Poprzednia strona';
  override firstPageLabel: string = 'Pierwsza strona';
  override lastPageLabel: string = 'Ostatnia strona';

  override getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return `0 z ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex =
      startIndex < length
        ? Math.min(startIndex + pageSize, length)
        : startIndex + pageSize;

    return `${startIndex + 1} - ${endIndex} z ${length}`;
  };
}
