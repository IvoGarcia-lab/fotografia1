import React from "react";
import Layout from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const ContactPage = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para enviar o formulário
    // Por enquanto, vamos apenas mostrar um toast de sucesso
    toast.success("Mensagem enviada com sucesso! Em breve entrarei em contato.");
    // Limpar o formulário se necessário
    (e.target as HTMLFormElement).reset();
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Entre em Contato</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="name">Nome</Label>
            <Input id="name" type="text" placeholder="Seu nome" required />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="seu@email.com" required />
          </div>
          <div>
            <Label htmlFor="subject">Assunto</Label>
            <Input id="subject" type="text" placeholder="Assunto da mensagem" required />
          </div>
          <div>
            <Label htmlFor="message">Mensagem</Label>
            <Textarea id="message" placeholder="Sua mensagem..." rows={5} required />
          </div>
          <Button type="submit" className="w-full">
            Enviar Mensagem
          </Button>
        </form>
        <div className="mt-8 text-center text-muted-foreground">
          <p>Você também pode me encontrar em:</p>
          <p className="mt-2">
            Email: <a href="mailto:seuemail@example.com" className="text-primary hover:underline">seuemail@example.com</a>
          </p>
          <p>
            Telefone: <a href="tel:+5511999999999" className="text-primary hover:underline">(11) 99999-9999</a>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;