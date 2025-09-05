import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import QRCode from 'qrcode';

@Component({
  selector: 'app-qrmodal',
  templateUrl: './qrmodal.html',
  styleUrls: ['./qrmodal.scss']
})
export class Qrmodal {
  @ViewChild('qrCodeCanvas') qrCodeCanvas!: ElementRef<HTMLCanvasElement>;

  @Input() idMascota: string = '';   // ID de la mascota
  @Input() nombre: string = '';      // Nombre de la mascota

  // Genera el link completo a la ruta de la app
  get linkCompleto(): string {
    return `${window.location.origin}/vermascota/${this.idMascota}`;
  }

  // Genera el QR usando la URL completa
  generateQrCode(): void {
    if (this.qrCodeCanvas?.nativeElement && this.linkCompleto) {
      QRCode.toCanvas(this.qrCodeCanvas.nativeElement, this.linkCompleto, {
        errorCorrectionLevel: 'H',
        margin: 1,
        width: 200
      })
      .then(() => console.log('QR Code generado con éxito!'))
      .catch(err => console.error('Error al generar QR Code:', err));
    }
  }

  // Copia el link completo al portapapeles
  copyLink(): void {
    if (!this.linkCompleto) return;
    navigator.clipboard.writeText(this.linkCompleto)
      .then(() => alert('Enlace copiado al portapapeles'))
      .catch(err => console.error('Error al copiar enlace:', err));
  }
}
