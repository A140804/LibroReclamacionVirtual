import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Send, FileText } from "lucide-react";

interface LegalFooterProps {
  accepted: boolean;
  onAcceptChange: (value: boolean) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  hasErrors: boolean;
}

export function LegalFooter({ 
  accepted, 
  onAcceptChange, 
  onSubmit, 
  isSubmitting,
  hasErrors 
}: LegalFooterProps) {
  return (
    <div className="border border-border rounded-md overflow-hidden bg-card">
      <div className="p-4 md:p-6 space-y-6">
        <div className="flex items-start gap-3 p-4 bg-muted rounded-md">
          <Checkbox
            id="declaration"
            checked={accepted}
            onCheckedChange={(checked) => onAcceptChange(checked === true)}
            className="mt-0.5"
          />
          <Label htmlFor="declaration" className="text-sm cursor-pointer leading-relaxed">
            <span className="font-semibold">Declaración Jurada:</span> Declaro que los datos 
            consignados en el presente formulario son verdaderos y que tengo conocimiento 
            de las responsabilidades civiles y penales que podrían derivarse de cualquier 
            falsedad o inexactitud en los mismos.
          </Label>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <Button
            onClick={onSubmit}
            disabled={!accepted || isSubmitting || hasErrors}
            size="lg"
            className="w-full sm:w-auto gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Enviando...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Enviar Reclamo
              </>
            )}
          </Button>
          
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <FileText className="h-4 w-4" />
            <span>Se generará un comprobante de su reclamo</span>
          </div>
        </div>
        
        <div className="pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground leading-relaxed">
            <strong>Nota Legal:</strong> Conforme al Código de Protección y Defensa del 
            Consumidor (Ley N° 29571) y el D.S. N° 011-2011-PCM, el proveedor deberá dar 
            respuesta al reclamo en un plazo no mayor a <strong>quince (15) días hábiles</strong>, 
            contados desde la fecha de su presentación. El plazo puede extenderse hasta por 
            quince (15) días hábiles adicionales en casos justificados.
          </p>
        </div>
      </div>
    </div>
  );
}
