import { format } from "date-fns";
import { es } from "date-fns/locale";
import logoImage from "@/assets/logo-pizza-nostra.png";

interface ClaimHeaderProps {
  claimNumber: string;
  companyName?: string;
}

export function ClaimHeader({ claimNumber, companyName = "PIZZA NOSTRA S.A.C." }: ClaimHeaderProps) {
  const today = new Date();
  
  return (
    <div className="border-2 border-border bg-card p-6 rounded-lg shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4 flex-1">
          <img 
            src={logoImage} 
            alt="Pizza Nostra Logo" 
            className="h-16 w-16 object-contain rounded-md"
          />
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-primary tracking-tight">
              LIBRO DE RECLAMACIONES
            </h1>
            <p className="text-lg font-semibold text-foreground mt-1">
              HOJA DE RECLAMACIÓN
            </p>
          </div>
        </div>
        
        <div className="flex flex-col items-start md:items-end gap-2 text-sm">
          <div className="flex items-center gap-2 bg-accent px-4 py-2 rounded-md">
            <span className="font-medium text-muted-foreground">Nro. de Reclamo:</span>
            <span className="font-bold text-accent-foreground">{claimNumber}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="font-medium">Fecha:</span>
            <span className="capitalize font-semibold text-foreground">
              {format(today, "dd 'de' MMMM 'de' yyyy", { locale: es })}
            </span>
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-sm text-muted-foreground">Razón Social:</p>
        <p className="font-semibold text-foreground">{companyName}</p>
      </div>
    </div>
  );
}
