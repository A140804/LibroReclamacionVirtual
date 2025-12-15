import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SectionTitle } from "./SectionTitle";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ClaimDetailsSectionProps {
  formData: {
    claimType: "reclamo" | "queja";
    facts: string;
    request: string;
  };
  onChange: (field: string, value: string) => void;
  errors?: Record<string, string>;
}

export function ClaimDetailsSection({ formData, onChange, errors }: ClaimDetailsSectionProps) {
  return (
    <div className="border border-border rounded-md overflow-hidden bg-card">
      <SectionTitle number={3} title="DETALLE DE LA RECLAMACIÓN Y PEDIDO DEL CONSUMIDOR" />
      
      <div className="p-4 md:p-6 space-y-6">
        <div className="space-y-3">
          <Label className="text-sm font-medium">
            Tipo <span className="text-destructive">*</span>
          </Label>
          <RadioGroup
            value={formData.claimType}
            onValueChange={(value) => onChange("claimType", value)}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="flex items-start space-x-3 p-4 border border-border rounded-md hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="reclamo" id="reclamo" className="mt-0.5" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Label htmlFor="reclamo" className="cursor-pointer font-medium">
                    Reclamo
                  </Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-xs">
                      <p>Disconformidad relacionada a los productos o servicios adquiridos.</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Disconformidad relacionada a los productos o servicios
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-4 border border-border rounded-md hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="queja" id="queja" className="mt-0.5" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Label htmlFor="queja" className="cursor-pointer font-medium">
                    Queja
                  </Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-xs">
                      <p>Malestar o descontento respecto a la atención al público.</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Malestar o descontento respecto a la atención al público
                </p>
              </div>
            </div>
          </RadioGroup>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="facts" className="text-sm font-medium">
            Detalle de los Hechos <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="facts"
            value={formData.facts}
            onChange={(e) => onChange("facts", e.target.value)}
            placeholder="Describa detalladamente los hechos que motivan su reclamo o queja..."
            rows={5}
            className={errors?.facts ? "border-destructive" : ""}
          />
          {errors?.facts && (
            <p className="text-xs text-destructive">{errors.facts}</p>
          )}
          <p className="text-xs text-muted-foreground">
            Mínimo 20 caracteres
          </p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="request" className="text-sm font-medium">
            Pedido del Consumidor <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="request"
            value={formData.request}
            onChange={(e) => onChange("request", e.target.value)}
            placeholder="Indique cuál es su solicitud o pedido respecto al reclamo o queja..."
            rows={4}
            className={errors?.request ? "border-destructive" : ""}
          />
          {errors?.request && (
            <p className="text-xs text-destructive">{errors.request}</p>
          )}
        </div>
      </div>
    </div>
  );
}
