import { Routes } from '@angular/router';
import { QrScannerComponent } from './qr-scanner/qr-scanner.component';

export const routes: Routes = [
    { path: '', component: QrScannerComponent },
    { path: '**', redirectTo: '' }
];
