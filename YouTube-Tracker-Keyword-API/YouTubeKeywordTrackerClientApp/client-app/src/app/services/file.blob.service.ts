import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class FileBlobService {

    public createPdfUrl(fileBytes: any): string {
        const blob = this.dataToBlob(fileBytes);
        return URL.createObjectURL(blob);
    }

    private dataToBlob(fileBytes: any): Blob {
        const byteString = window.atob(fileBytes);
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const int8Array = new Uint8Array(arrayBuffer);
    
        for(let i = 0; i < byteString.length; i++) {
         int8Array[i] = byteString.charCodeAt(i);
        }
    
        const blob = new Blob([int8Array], { type: 'application/pdf' });
        return blob;
    }
}