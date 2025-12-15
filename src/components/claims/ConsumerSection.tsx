import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { SectionTitle } from "./SectionTitle";

interface ConsumerSectionProps {
  formData: {
    fullName: string;
    address: string;
    documentNumber: string;
    phone: string;
    email: string;
    isMinor: boolean;
    parentName: string;
  };
  onChange: (field: string, value: string | boolean) => void;
  errors?: Record<string, string>;
}

export function ConsumerSection({ formData, onChange, errors }: ConsumerSectionProps) {
  return (
    <div className="border border-border rounded-md overflow-hidden bg-card">
      <SectionTitle number={1} title="IDENTIFICACIÓN DEL CONSUMIDOR RECLAMANTE" />
      
      <div className="p-4 md:p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-sm font-medium">
              Nombre Completo <span className="text-destructive">*</span>
            </Label>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={(e) => onChange("fullName", e.target.value)}
              placeholder="Ingrese su nombre completo"
              className={errors?.fullName ? "border-destructive" : ""}
            />
            {errors?.fullName && (
              <p className="text-xs text-destructive">{errors.fullName}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="documentNumber" className="text-sm font-medium">
              DNI / CE <span className="text-destructive">*</span>
            </Label>
            <Input
              id="documentNumber"
              value={formData.documentNumber}
              onChange={(e) => onChange("documentNumber", e.target.value.replace(/\D/g, ""))}
              placeholder="Número de documento"
              maxLength={12}
              className={errors?.documentNumber ? "border-destructive" : ""}
            />
            {errors?.documentNumber && (
              <p className="text-xs text-destructive">{errors.documentNumber}</p>
            )}
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="address" className="text-sm font-medium">
            Domicilio <span className="text-destructive">*</span>
          </Label>
          <Input
            id="address"
            value={formData.address}
            onChange={(e) => onChange("address", e.target.value)}
            placeholder="Ingrese su dirección completa"
            className={errors?.address ? "border-destructive" : ""}
          />
          {errors?.address && (
            <p className="text-xs text-destructive">{errors.address}</p>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium">
              Teléfono <span className="text-destructive">*</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => onChange("phone", e.target.value.replace(/\D/g, ""))}
              placeholder="Número de teléfono"
              maxLength={15}
              className={errors?.phone ? "border-destructive" : ""}
            />
            {errors?.phone && (
              <p className="text-xs text-destructive">{errors.phone}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Correo Electrónico <span className="text-destructive">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => onChange("email", e.target.value)}
              placeholder="correo@ejemplo.com"
              className={errors?.email ? "border-destructive" : ""}
            />
            {errors?.email && (
              <p className="text-xs text-destructive">{errors.email}</p>
            )}
          </div>
        </div>
        
        <div className="pt-2">
          <div className="flex items-center gap-2">
            <Checkbox
              id="isMinor"
              checked={formData.isMinor}
              onCheckedChange={(checked) => onChange("isMinor", checked === true)}
            />
            <Label htmlFor="isMinor" className="text-sm cursor-pointer">
              Soy menor de edad
            </Label>
          </div>
          
          {formData.isMinor && (
            <div className="mt-4 p-4 bg-muted rounded-md space-y-2">
              <Label htmlFor="parentName" className="text-sm font-medium">
                Nombre del Padre o Madre <span className="text-destructive">*</span>
              </Label>
              <Input
                id="parentName"
                value={formData.parentName}
                onChange={(e) => onChange("parentName", e.target.value)}
                placeholder="Nombre del padre o madre/tutor"
                className={errors?.parentName ? "border-destructive" : ""}
              />
              {errors?.parentName && (
                <p className="text-xs text-destructive">{errors.parentName}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
