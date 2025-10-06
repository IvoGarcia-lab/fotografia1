import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from '@/components/layout/Layout';

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        navigate('/'); // Redireciona para a página inicial se o usuário estiver logado
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <Layout>
      <div className="max-w-md mx-auto mt-8">
        <h1 className="text-3xl font-bold text-center mb-6">Login / Cadastro</h1>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={[]}
          theme="light"
          localization={{
            variables: {
              sign_up: {
                email_label: 'Endereço de email',
                password_label: 'Crie uma senha',
                email_input_placeholder: 'Seu endereço de email',
                password_input_placeholder: 'Sua senha',
                button_label: 'Cadastrar',
                social_provider_text: 'Entrar com {{provider}}',
                link_text: 'Não tem uma conta? Cadastre-se',
              },
              sign_in: {
                email_label: 'Endereço de email',
                password_label: 'Sua senha',
                email_input_placeholder: 'Seu endereço de email',
                password_input_placeholder: 'Sua senha',
                button_label: 'Entrar',
                social_provider_text: 'Entrar com {{provider}}',
                link_text: 'Já tem uma conta? Entre',
              },
              forgotten_password: {
                email_label: 'Endereço de email',
                email_input_placeholder: 'Seu endereço de email',
                button_label: 'Enviar instruções de recuperação',
                link_text: 'Esqueceu sua senha?',
              },
            },
          }}
        />
      </div>
    </Layout>
  );
};

export default LoginPage;