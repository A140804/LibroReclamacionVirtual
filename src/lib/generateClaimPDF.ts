import jsPDF from "jspdf";

interface ClaimData {
  claimNumber: string;
  date: string;
  consumer: {
    fullName: string;
    address: string;
    documentNumber: string;
    phone: string;
    email: string;
    isMinor: boolean;
    parentName: string;
  };
  product: {
    type: "product" | "service";
    amount: string;
    description: string;
  };
  claim: {
    claimType: "reclamo" | "queja";
    facts: string;
    request: string;
  };
}

export function generateClaimPDF(data: ClaimData): void {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let yPos = 20;

  // Header
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("LIBRO DE RECLAMACIONES", pageWidth / 2, yPos, { align: "center" });
  yPos += 8;
  
  doc.setFontSize(14);
  doc.text("HOJA DE RECLAMACIÓN", pageWidth / 2, yPos, { align: "center" });
  yPos += 10;

  // Company name and claim info
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Razón Social: PIZZA NOSTRA S.A.C.", margin, yPos);
  yPos += 6;
  doc.text(`Nro. de Reclamo: ${data.claimNumber}`, margin, yPos);
  doc.text(`Fecha: ${data.date}`, pageWidth - margin - 50, yPos);
  yPos += 12;

  // Section 1: Consumer Info
  doc.setFillColor(240, 240, 240);
  doc.rect(margin, yPos - 4, contentWidth, 8, "F");
  doc.setFont("helvetica", "bold");
  doc.text("1. IDENTIFICACIÓN DEL CONSUMIDOR RECLAMANTE", margin + 2, yPos + 2);
  yPos += 12;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  const consumerFields = [
    ["Nombre completo:", data.consumer.fullName],
    ["Domicilio:", data.consumer.address],
    ["DNI/CE:", data.consumer.documentNumber],
    ["Teléfono:", data.consumer.phone],
    ["Email:", data.consumer.email],
  ];

  if (data.consumer.isMinor && data.consumer.parentName) {
    consumerFields.push(["Padre/Madre:", data.consumer.parentName]);
  }

  consumerFields.forEach(([label, value]) => {
    doc.setFont("helvetica", "bold");
    doc.text(label, margin, yPos);
    doc.setFont("helvetica", "normal");
    doc.text(value || "-", margin + 35, yPos);
    yPos += 6;
  });
  yPos += 6;

  // Section 2: Product/Service Info
  doc.setFillColor(240, 240, 240);
  doc.rect(margin, yPos - 4, contentWidth, 8, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("2. IDENTIFICACIÓN DEL BIEN CONTRATADO", margin + 2, yPos + 2);
  yPos += 12;

  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text("Tipo:", margin, yPos);
  doc.setFont("helvetica", "normal");
  doc.text(data.product.type === "product" ? "Producto" : "Servicio", margin + 35, yPos);
  yPos += 6;

  doc.setFont("helvetica", "bold");
  doc.text("Monto reclamado:", margin, yPos);
  doc.setFont("helvetica", "normal");
  doc.text(data.product.amount ? `S/ ${data.product.amount}` : "-", margin + 35, yPos);
  yPos += 6;

  doc.setFont("helvetica", "bold");
  doc.text("Descripción:", margin, yPos);
  yPos += 5;
  doc.setFont("helvetica", "normal");
  const descLines = doc.splitTextToSize(data.product.description || "-", contentWidth - 5);
  doc.text(descLines, margin + 2, yPos);
  yPos += descLines.length * 5 + 8;

  // Section 3: Claim Details
  doc.setFillColor(240, 240, 240);
  doc.rect(margin, yPos - 4, contentWidth, 8, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("3. DETALLE DE LA RECLAMACIÓN Y PEDIDO", margin + 2, yPos + 2);
  yPos += 12;

  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text("Tipo de reclamación:", margin, yPos);
  doc.setFont("helvetica", "normal");
  const claimTypeText = data.claim.claimType === "reclamo" 
    ? "RECLAMO - Disconformidad relacionada a los productos o servicios"
    : "QUEJA - Malestar o descontento respecto a la atención al público";
  doc.text(claimTypeText, margin + 40, yPos);
  yPos += 10;

  doc.setFont("helvetica", "bold");
  doc.text("Detalle de los hechos:", margin, yPos);
  yPos += 5;
  doc.setFont("helvetica", "normal");
  const factsLines = doc.splitTextToSize(data.claim.facts || "-", contentWidth - 5);
  doc.text(factsLines, margin + 2, yPos);
  yPos += factsLines.length * 5 + 8;

  // Check if we need a new page
  if (yPos > 250) {
    doc.addPage();
    yPos = 20;
  }

  doc.setFont("helvetica", "bold");
  doc.text("Pedido del consumidor:", margin, yPos);
  yPos += 5;
  doc.setFont("helvetica", "normal");
  const requestLines = doc.splitTextToSize(data.claim.request || "-", contentWidth - 5);
  doc.text(requestLines, margin + 2, yPos);
  yPos += requestLines.length * 5 + 15;

  // Legal footer
  doc.setFontSize(8);
  doc.setFont("helvetica", "italic");
  const legalText = "Conforme al Código de Protección y Defensa del Consumidor (Ley N° 29571), el proveedor deberá dar respuesta al reclamo en un plazo no mayor a quince (15) días hábiles.";
  const legalLines = doc.splitTextToSize(legalText, contentWidth);
  doc.text(legalLines, margin, yPos);
  yPos += 15;

  // Signature line
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.line(margin, yPos + 10, margin + 60, yPos + 10);
  doc.text("Firma del Consumidor", margin, yPos + 16);

  // Save
  doc.save(`reclamo-${data.claimNumber}.pdf`);
}
