import { Store } from '@ngrx/store';
import { IState } from '../state';
import { ViewChild, Directive } from '@angular/core';
import { DataDialogComponentComponent } from '../common/data-dialog-component/data-dialog-component.component';
import { Router } from '@angular/router';

@Directive()
export abstract class ListComponent<TDataType> {

    @ViewChild(DataDialogComponentComponent, { static: true }) dialog!: DataDialogComponentComponent;

    constructor(
        protected store: Store<IState>,
        protected router: Router
    ) { }

    abstract editDataClick(data: TDataType): void;
    abstract deleteDataClick(data: TDataType): void;
}