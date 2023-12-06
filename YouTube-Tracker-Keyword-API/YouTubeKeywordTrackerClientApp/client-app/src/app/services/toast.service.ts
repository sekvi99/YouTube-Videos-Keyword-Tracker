import { ToastrService } from "ngx-toastr";
import { Injectable } from '@angular/core';
import { ToastMessageTitle } from "../models/toast/toast-message-title";

@Injectable({
    providedIn: 'root'
})
export class ToastService {
    constructor(private toastr: ToastrService) { }

    public success(message: string): void {
        this.toastr.success(message, ToastMessageTitle.Success);
    }

    public error(message: string): void {
        this.toastr.error(message, ToastMessageTitle.Error);
    }

    public warning(message: string): void {
        this.toastr.warning(message, ToastMessageTitle.Warning);
    }

    public info(message: string): void {
        this.toastr.info(message);
    }
}