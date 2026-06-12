const { Document, Packer, Paragraph, TextRun, AlignmentType, PageBreak } = require('docx');
const fs = require('fs');

const doc = new Document({
  sections: [{
    properties: {
      page: {
        size: { width: 11906, height: 16838 },
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
      }
    },
    children: [
      // Espaciado superior
      new Paragraph({ spacing: { before: 0, after: 0 }, children: [new TextRun("")] }),
      new Paragraph({ spacing: { before: 0, after: 0 }, children: [new TextRun("")] }),
      new Paragraph({ spacing: { before: 0, after: 0 }, children: [new TextRun("")] }),
      new Paragraph({ spacing: { before: 0, after: 0 }, children: [new TextRun("")] }),

      // Centro educativo
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 400, after: 200 },
        children: [new TextRun({ text: "IES Iliberis", font: "Arial", size: 28, bold: true })]
      }),

      // Ciclo formativo
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 100, after: 600 },
        children: [new TextRun({ text: "Ciclo Formativo de Grado Superior en Desarrollo de Aplicaciones Web", font: "Arial", size: 24 })]
      }),

      // Espaciado
      new Paragraph({ spacing: { before: 0, after: 0 }, children: [new TextRun("")] }),
      new Paragraph({ spacing: { before: 0, after: 0 }, children: [new TextRun("")] }),
      new Paragraph({ spacing: { before: 0, after: 0 }, children: [new TextRun("")] }),

      // Título principal
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 800, after: 300 },
        children: [new TextRun({ text: "AN-K9: Detección y Búsqueda", font: "Arial", size: 56, bold: true })]
      }),

      // Subtítulo
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 200, after: 800 },
        children: [new TextRun({ text: "Documentación Técnica", font: "Arial", size: 32, italics: true })]
      }),

      // Espaciado
      new Paragraph({ spacing: { before: 0, after: 0 }, children: [new TextRun("")] }),
      new Paragraph({ spacing: { before: 0, after: 0 }, children: [new TextRun("")] }),
      new Paragraph({ spacing: { before: 0, after: 0 }, children: [new TextRun("")] }),
      new Paragraph({ spacing: { before: 0, after: 0 }, children: [new TextRun("")] }),
      new Paragraph({ spacing: { before: 0, after: 0 }, children: [new TextRun("")] }),

      // Autora
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 1200, after: 100 },
        children: [new TextRun({ text: "Autora: Begoña Cabo Martínez", font: "Arial", size: 24 })]
      }),
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("portada_tfg.docx", buffer);
  console.log("Portada creada: portada_tfg.docx");
});
