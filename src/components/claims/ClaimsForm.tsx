import { useState, useMemo } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { ClaimHeader } from "./ClaimHeader";
import { ConsumerSection } from "./ConsumerSection";
import { ProductServiceSection } from "./ProductServiceSection";
import { ClaimDetailsSection } from "./ClaimDetailsSection";
import { AdminSection } from "./AdminSection";
import { LegalFooter } from "./LegalFooter";
import { toast } from "@/hooks/use-toast";
import { generateClaimPDF } from "@/lib/generateClaimPDF";

interface FormData {
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

function generateClaimNumber(): string {
  const year = new Date().getFullYear();
  const randomNum = Math.floor(Math.random() * 99999) + 1;
  return `${String(randomNum).padStart(5, "0")}-${year}`;
}

export function ClaimsForm() {
  const [claimNumber] = useState(() => generateClaimNumber());
  const [accepted, setAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    consumer: {
      fullName: "",
      address: "",
      documentNumber: "",
      phone: "",
      email: "",
      isMinor: false,
      parentName: "",
    },
    product: {
      type: "product",
      amount: "",
      description: "",
    },
    claim: {
      claimType: "reclamo",
      facts: "",
      request: "",
    },
  });

  const errors = useMemo(() => {
    const errs: Record<string, string> = {};
    
    if (!formData.consumer.fullName.trim()) {
      errs.fullName = "El nombre es requerido";
    }
    if (!formData.consumer.address.trim()) {
      errs.address = "El domicilio es requerido";
    }
    if (!formData.consumer.documentNumber.trim() || formData.consumer.documentNumber.length < 8) {
      errs.documentNumber = "Ingrese un documento válido (mínimo 8 dígitos)";
    }
    if (!formData.consumer.phone.trim() || formData.consumer.phone.length < 9) {
      errs.phone = "Ingrese un teléfono válido (mínimo 9 dígitos)";
    }
    if (!formData.consumer.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.consumer.email)) {
      errs.email = "Ingrese un correo electrónico válido";
    }
    if (formData.consumer.isMinor && !formData.consumer.parentName.trim()) {
      errs.parentName = "El nombre del padre/madre es requerido para menores";
    }
    if (!formData.product.description.trim()) {
      errs.description = "La descripción del bien es requerida";
    }
    if (!formData.claim.facts.trim() || formData.claim.facts.length < 20) {
      errs.facts = "Describa los hechos (mínimo 20 caracteres)";
    }
    if (!formData.claim.request.trim()) {
      errs.request = "Indique su pedido";
    }
    
    return errs;
  }, [formData]);

  const handleConsumerChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      consumer: { ...prev.consumer, [field]: value },
    }));
  };

  const handleProductChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      product: { ...prev.product, [field]: value },
    }));
  };

  const handleClaimChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      claim: { ...prev.claim, [field]: value },
    }));
  };

  const handleSubmit = async () => {
    if (Object.keys(errors).length > 0) {
      toast({
        title: "Formulario incompleto",
        description: "Por favor, complete todos los campos requeridos correctamente.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    const today = new Date();
    const dateFormatted = format(today, "dd 'de' MMMM 'de' yyyy", { locale: es });
    
    try {
      // Send data to Google Sheets
      const sheetData = {
        "Fecha": dateFormatted,
        "Nombre Completo": formData.consumer.fullName,
        "DNI / RUC": formData.consumer.documentNumber,
        "Domicilio": formData.consumer.address,
        "Teléfono / Email": `${formData.consumer.phone} / ${formData.consumer.email}`,
        "Tipo Bien": `${formData.product.type === "product" ? "Producto" : "Servicio"} - ${formData.product.description}`,
        "Monto (S/)": formData.product.amount,
        "Tipo (Reclamo/Queja)": formData.claim.claimType === "reclamo" ? "Reclamo" : "Queja",
        "Detalle del Reclamo": formData.claim.facts,
        "Pedido del Cliente": formData.claim.request,
        "Firma (Link/Base64)": "",
        "Estado (Interno)": "Pendiente",
        "Respuesta (Interno)": "",
      };

      await fetch(
        "https://script.google.com/macros/s/AKfycbwIlg618xeK9thFrBenNqXdXT2UQBK32anY5_mB7qTGMd8dLS-hIKnGVqH47z6MS-kPPg/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(sheetData),
        }
      );

      // Generate PDF
      generateClaimPDF({
        claimNumber,
        date: dateFormatted,
        consumer: formData.consumer,
        product: formData.product,
        claim: formData.claim,
      });

      toast({
        title: "¡Reclamo enviado exitosamente!",
        description: `Su reclamo N° ${claimNumber} ha sido registrado y guardado. Se ha descargado el comprobante en PDF.`,
      });
    } catch (error) {
      console.error("Error al enviar:", error);
      toast({
        title: "Error",
        description: "Hubo un problema al enviar el reclamo. Intente nuevamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 lg:p-8 space-y-6">
      <ClaimHeader claimNumber={claimNumber} />
      
      <ConsumerSection
        formData={formData.consumer}
        onChange={handleConsumerChange}
        errors={errors}
      />
      
      <ProductServiceSection
        formData={formData.product}
        onChange={handleProductChange}
        errors={errors}
      />
      
      <ClaimDetailsSection
        formData={formData.claim}
        onChange={handleClaimChange}
        errors={errors}
      />
      
      <AdminSection />
      
      <LegalFooter
        accepted={accepted}
        onAcceptChange={setAccepted}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        hasErrors={hasErrors}
      />
    </div>
  );
}
