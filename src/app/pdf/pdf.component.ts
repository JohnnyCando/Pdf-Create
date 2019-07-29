import { Component, OnInit } from '@angular/core';
import * as jsPDF from 'jspdf';
@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})
export class PdfComponent implements OnInit {
  texto: any;
  lines: any;
  rows: any;
  format: any;
  fontsiZe: any;
  dimtext: any;
  ht: any
  wt: any
  wtline: any
  x: any = 25;
  y: any = 25;
  count: any;
  dimensionArray: any;
  constructor() { }

  ngOnInit() {
    this.crearPDF();
  }
 crearPDF() {
    this.texto = prompt('Ingrese el texto que desea visualizar en el pdf');
    this.rows = prompt('Ingrese el numero de columnas que desea visualizar en el pdf');
    this.format = prompt('Ingrese el formato que desea el pdf, entre: \na0-a1-a2-a3-a4-a5-a6-a7-a8-a9-a10');
    this.fontsiZe = prompt('Ingrese el tamaño del texto que desea visualizar en el pdf');
    const doc = new jsPDF({
      orientation:  'p',
      unit: 'mm',
      format: this.format
    });
    doc.setFontSize(this.fontsiZe)
    this.ht = doc.internal.pageSize.height;
    this.wt = doc.internal.pageSize.width;
    console.log(this.ht)
    console.log(this.wt)
    this.lines = doc.splitTextToSize(this.texto, 50);
    this.dimtext = doc.getTextDimensions(this.texto)
    this.wtline = (this.wt / this.rows) + (this.dimtext.h + 2);
    for (let i = 0; i < this.lines.length; i++) {
      this.count += 1;
      this.dimensionArray = this.dimtext.h * this.count;
      if (this.dimensionArray < this.ht) {
        doc.text(this.lines[i], this.x, this.y)
        this.y += this.y + this.dimtext.h;
      } else {
        // tslint:disable-next-line:no-conditional-assignment
        if ( this.rows <= 1) {
          doc.addPage();
          doc.text(this.lines[i], 25, 25);
          this.count = 1;
          continue;
        } else {
          this.x += this.wtline;
          doc.text(this.lines[i], this.x, this.y);
        }
      }
   }
    doc.save('pdfprueba.pdf');
 }
}
