import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

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
        </nav>
      </div>
    </header>
  );
};

export default Header;