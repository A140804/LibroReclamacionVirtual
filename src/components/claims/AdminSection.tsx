import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { SectionTitle } from "./SectionTitle";
import { Lock } from "lucide-react";

export function AdminSection() {
  return (
    <div className="border border-border rounded-md overflow-hidden bg-[hsl(var(--admin-bg))]">
      <SectionTitle 
        number={4} 
        title="OBSERVACIONES Y ACCIONES ADOPTADAS POR EL PROVEEDOR" 
        className="bg-secondary text-secondary-foreground"
      />
      
      <div className="p-4 md:p-6 space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-card p-3 rounded-md border border-border">
          <Lock className="h-4 w-4" />
          <span>Sección reservada para uso administrativo</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 opacity-60">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-muted-foreground">
              Fecha de comunicación de respuesta
            </Label>
            <Input
              type="date"
              disabled
              className="bg-card"
            />
          </div>
        </div>
        
        <div className="space-y-2 opacity-60">
          <Label className="text-sm font-medium text-muted-foreground">
            Detalle de acciones adoptadas por el proveedor
          </Label>
          <Textarea
            disabled
            placeholder="A ser completado por el proveedor..."
            rows={3}
            className="bg-card"
          />
        </div>
      </div>
    </div>
  );
}
