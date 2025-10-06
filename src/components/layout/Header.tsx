import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle"; // Importando o novo componente

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <Link to="/" className="text-lg font-bold">
          Meu Portfólio de Fotografia
        </Link>
        <nav className="flex items-center space-x-4">
          <Button variant="ghost" asChild>
            <Link to="/">Galeria</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/about">Sobre Mim</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/contact">Contato</Link>
          </Button>
          <ThemeToggle /> {/* Adicionando o alternador de tema aqui */}
        </nav>
      </div>
    </header>
  );
};

export default Header;