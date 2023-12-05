import { Directive, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IState } from '../state';

@Directive()
export abstract class FormComponent implements OnInit {

    constructor(
        protected formBuilder: FormBuilder,
        protected store: Store<IState>,
        // TODO Add toast service
    ) { }

    ngOnInit(): void { }

    abstract onSubmit(): Promise<void>;

    abstract loadDataFromValues(): void;
}