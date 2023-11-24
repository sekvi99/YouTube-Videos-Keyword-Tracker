import { Directive, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Directive()
export abstract class FormComponent implements OnInit {

    constructor(
        protected formBuilder: FormBuilder
    ) { }

    ngOnInit(): void { }

    abstract onSubmit(): void;
}