import { MatPaginatorIntl } from "@angular/material/paginator";
import { Injectable } from "@angular/core";

@Injectable()
export class TranslatedPaginatorIntl extends MatPaginatorIntl {
    override itemsPerPageLabel: string = 'Pozycje na stronę: ';
}