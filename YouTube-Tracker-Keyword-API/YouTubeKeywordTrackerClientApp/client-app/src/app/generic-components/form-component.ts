import { Directive, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IState } from '../state';
import { ToastService } from '../services/toast.service';

@Directive()
export abstract class FormComponent implements OnInit {

    @Input() editMode?: boolean;
    @Input() data?: any;
    @Input() entityType?: string;

    @Output('onFormSuccessfull') onFormSuccessfullEvent = new EventEmitter<any>(); 

    constructor(
        protected formBuilder: FormBuilder,
        protected store: Store<IState>,
        protected toastService: ToastService
    ) { }

    ngOnInit(): void { }

    abstract onSubmit(): Promise<void>;

    // abstract loadDataFromValues(item: TDataType): void;
}