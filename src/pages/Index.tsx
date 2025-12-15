import { ClaimsForm } from "@/components/claims/ClaimsForm";
import { FileText } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border py-4 px-4 md:px-6 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <div className="p-2 rounded-md bg-primary/10">
            <FileText className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">Sistema de Atención al Consumidor</h1>
            <p className="text-sm text-muted-foreground">Libro de Reclamaciones Virtual</p>
          </div>
        </div>
      </header>
      
      <main className="pb-12">
        <ClaimsForm />
      </main>
      
      <footer className="bg-card border-t border-border py-6 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Libro de Reclamaciones Virtual. 
            Conforme a la Ley N° 29571, Código de Protección y Defensa del Consumidor.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
