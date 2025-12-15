import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SectionTitle } from "./SectionTitle";

interface ProductServiceSectionProps {
  formData: {
    type: "product" | "service";
    amount: string;
    description: string;
  };
  onChange: (field: string, value: string) => void;
  errors?: Record<string, string>;
}

export function ProductServiceSection({ formData, onChange, errors }: ProductServiceSectionProps) {
  return (
    <div className="border border-border rounded-md overflow-hidden bg-card">
      <SectionTitle number={2} title="IDENTIFICACIÓN DEL BIEN CONTRATADO" />
      
      <div className="p-4 md:p-6 space-y-4">
        <div className="space-y-3">
          <Label className="text-sm font-medium">
            Tipo de Bien <span className="text-destructive">*</span>
          </Label>
          <RadioGroup
            value={formData.type}
            onValueChange={(value) => onChange("type", value)}
            className="flex gap-6"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="product" id="product" />
              <Label htmlFor="product" className="cursor-pointer font-normal">
                Producto
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="service" id="service" />
              <Label htmlFor="service" className="cursor-pointer font-normal">
                Servicio
              </Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-sm font-medium">
              Monto Reclamado (S/)
            </Label>
            <Input
              id="amount"
              type="text"
              value={formData.amount}
              onChange={(e) => {
                const value = e.target.value.replace(/[^\d.]/g, "");
                onChange("amount", value);
              }}
              placeholder="0.00"
              className="font-mono"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="productDescription" className="text-sm font-medium">
            Descripción del Bien <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="productDescription"
            value={formData.description}
            onChange={(e) => onChange("description", e.target.value)}
            placeholder="Describa brevemente el producto o servicio contratado"
            rows={3}
            className={errors?.description ? "border-destructive" : ""}
          />
          {errors?.description && (
            <p className="text-xs text-destructive">{errors.description}</p>
          )}
        </div>
      </div>
    </div>
  );
}
