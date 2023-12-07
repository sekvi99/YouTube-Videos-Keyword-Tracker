import { Store } from '@ngrx/store';
import { IState } from '../state';
import { ViewChild, Directive } from '@angular/core';
import { DataDialogComponentComponent } from '../common/data-dialog-component/data-dialog-component.component';

@Directive()
export abstract class ListComponent<TDataType> {

    // TODO Think about rxjs-compat
    // isFormSubmitting$ = new BehaviorSubject<boolean>(false);
    // isDeleting$ = new BehaviorSubject<boolean>(false);

    @ViewChild(DataDialogComponentComponent, { static: true }) dialog!: DataDialogComponentComponent;

    constructor(
        private store: Store<IState>,
    ) { }

    abstract editDataClick(data: TDataType): void;
    abstract deleteDataClick(data: TDataType): void;
}