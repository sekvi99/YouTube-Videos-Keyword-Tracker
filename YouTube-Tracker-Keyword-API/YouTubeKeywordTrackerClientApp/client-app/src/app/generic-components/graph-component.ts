import { AfterViewInit, Directive, Input, OnInit } from "@angular/core";

@Directive()
export abstract class GraphComponent<TDataType> implements AfterViewInit {
    @Input() data?: TDataType[];

    ngAfterViewInit(): void {
        this.createChart();
    }

    abstract createChart(): void;
}