import { Routes } from '@angular/router';
import { QrScannerComponent } from './qr-scanner/qr-scanner.component';

export const routes: Routes = [
    { path: 'qr', component: QrScannerComponent },
    { path: '**', redirectTo: 'qr' }
];
