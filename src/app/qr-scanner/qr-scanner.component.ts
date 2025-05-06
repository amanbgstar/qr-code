import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import QRCode from 'qrcode';

@Component({
  selector: 'app-qr-scanner',
  imports: [ZXingScannerModule, CommonModule, MatButtonModule, MatCardModule, MatIconModule, FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './qr-scanner.component.html',
  styleUrl: './qr-scanner.component.css'
})
export class QrScannerComponent {
  scannerEnabled = false;
  qrResult: string | null = null;
  generatedQRCode: string | null = null;
  qrText: string = '';
  scannerMode = false;
  generatorMode = false;

  toggleScanner(): void {
    this.scannerEnabled = !this.scannerEnabled;
    if (!this.scannerEnabled) {
      this.qrResult = null;
    }
  }

  handleQrCodeResult(result: string): void {
    this.qrResult = result;
    this.scannerEnabled = false; // auto-close scanner after success
  }

  copyResult() {
    if (this.qrResult) {
      navigator.clipboard.writeText(this.qrResult);
      alert('Copied to clipboard!');
    }
  }

  generateQRCode() {
    if (this.qrText) {
      QRCode.toDataURL(this.qrText)
        .then((url):any => {
          this.generatedQRCode = url;
        })
        .catch((err) => {
          console.error('Error generating QR Code:', err);
        });
    } else {
      alert('Please enter text to generate a QR Code');
    }
  }
  
  showScanner() {
    this.reset();
    this.scannerMode = true;
  }
  
  showGenerator() {
    this.reset();
    this.generatorMode = true;
  }
  
  reset() {
    this.scannerMode = false;
    this.generatorMode = false;
    this.qrResult = null;
    this.generatedQRCode = null;
    this.qrText = '';
  }
  
  downloadQRCode() {
    const link = document.createElement('a');
    link.href = this.generatedQRCode!;
    link.download = 'qr-code.png';
    link.click();
  }

  closeSection() {
    this.generatorMode = false;
    this.scannerMode = false;
    this.qrText = '';
    this.generatedQRCode = null;
    this.qrResult = '';
  }
}