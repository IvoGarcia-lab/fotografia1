import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";

const Header = () => {
  const [session, setSession] = useState<Session | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/'); // Redireciona para a página inicial após o logout
  };

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
          {session ? (
            <Button variant="ghost" onClick={handleLogout}>
              Sair
            </Button>
          ) : (
            <Button variant="ghost" asChild>
              <Link to="/login">Login</Link>
            </Button>
          )}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
};

export default Header;