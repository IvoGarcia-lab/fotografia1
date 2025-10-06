import React from "react";
import Layout from "@/components/layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

// Dados de exemplo (os mesmos da PortfolioPage para consistência)
const samplePhotos = [
  {
    id: "1",
    title: "Pôr do Sol na Praia",
    description: "Uma vista deslumbrante do pôr do sol sobre o oceano, com cores vibrantes no céu. Esta fotografia foi tirada durante uma viagem inesquecível à costa do Pacífico, capturando a serenidade e a beleza natural do momento. Usei uma lente grande angular para abranger a vastidão do cenário e realçar as cores quentes do entardecer.",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961dde?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Paisagem",
    date: "15 de Março de 2023",
    camera: "Canon EOS R5",
    lens: "RF 15-35mm f/2.8L IS USM",
    settings: "ISO 100, f/11, 1/60s",
  },
  {
    id: "2",
    title: "Retrato Urbano",
    description: "Um retrato cativante de uma pessoa em um ambiente urbano movimentado. A ideia era capturar a essência da vida na cidade, com o sujeito em foco e o fundo desfocado para criar profundidade. A iluminação natural do final da tarde ajudou a criar um clima suave e convidativo.",
    imageUrl: "https://images.unsplash.com/photo-1529629767072-bf287236530f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Retrato",
    date: "22 de Fevereiro de 2024",
    camera: "Sony Alpha a7 III",
    lens: "FE 85mm f/1.4 GM",
    settings: "ISO 200, f/1.8, 1/250s",
  },
  {
    id: "3",
    title: "Natureza Selvagem",
    description: "A beleza intocada da vida selvagem em seu habitat natural. Esta imagem foi feita durante uma expedição fotográfica na Amazônia, onde tive a oportunidade de observar a fauna local de perto. A paciência foi fundamental para conseguir este clique, esperando o momento certo para o animal se posicionar.",
    imageUrl: "https://images.unsplash.com/photo-1501854140801-50d00698a7ee?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Natureza",
    date: "10 de Janeiro de 2024",
    camera: "Nikon D850",
    lens: "AF-S NIKKOR 200-500mm f/5.6E ED VR",
    settings: "ISO 400, f/6.3, 1/800s",
  },
  {
    id: "4",
    title: "Arquitetura Moderna",
    description: "Linhas limpas e design inovador de um edifício contemporâneo. A fotografia de arquitetura me fascina pela forma como a luz interage com as formas e texturas. Este edifício em particular, com suas curvas e reflexos, ofereceu um desafio interessante para capturar sua grandiosidade e detalhes.",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a9dc549b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Arquitetura",
    date: "05 de Dezembro de 2023",
    camera: "Fujifilm GFX 100S",
    lens: "GF 32-64mm f/4 R LM WR",
    settings: "ISO 100, f/16, 1/30s",
  },
  {
    id: "5",
    title: "Comida Gourmet",
    description: "Uma apresentação artística de um prato delicioso e colorido. A fotografia de alimentos exige atenção aos detalhes, cores e texturas para tornar o prato o mais apetitoso possível. Trabalhei com um chef para garantir que a composição e a iluminação realçassem cada ingrediente.",
    imageUrl: "https://images.unsplash.com/photo-1504674900247-087700ff89c6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Comida",
    date: "18 de Novembro de 2023",
    camera: "Canon EOS 5D Mark IV",
    lens: "EF 100mm f/2.8L Macro IS USM",
    settings: "ISO 160, f/4.0, 1/125s",
  },
  {
    id: "6",
    title: "Esportes Radicais",
    description: "Ação e adrenalina capturadas em um momento de esporte extremo. A fotografia de esportes é desafiadora, pois exige velocidade e precisão. Este salto de mountain bike foi capturado com uma alta velocidade do obturador para congelar o movimento e transmitir a energia do momento.",
    imageUrl: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Esportes",
    date: "01 de Outubro de 2023",
    camera: "Nikon Z9",
    lens: "NIKKOR Z 70-200mm f/2.8 VR S",
    settings: "ISO 320, f/4.0, 1/1600s",
  },
];

const PhotoDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const photo = samplePhotos.find((p) => p.id === id);

  if (!photo) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h1 className="text-3xl font-bold mb-4">Fotografia não encontrada</h1>
          <Button onClick={() => navigate("/")}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para a Galeria
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <Button onClick={() => navigate(-1)} variant="outline" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
        </Button>
        <h1 className="text-4xl font-bold text-center mb-8">{photo.title}</h1>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-2/3">
            <img src={photo.imageUrl} alt={photo.title} className="w-full h-auto object-cover rounded-lg shadow-lg" />
          </div>
          <div className="md:w-1/3 space-y-4">
            <h2 className="text-2xl font-semibold">Detalhes</h2>
            <p className="text-muted-foreground">{photo.description}</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <p className="font-medium">Categoria:</p>
              <p>{photo.category}</p>
              <p className="font-medium">Data:</p>
              <p>{photo.date}</p>
              <p className="font-medium">Câmera:</p>
              <p>{photo.camera}</p>
              <p className="font-medium">Lente:</p>
              <p>{photo.lens}</p>
              <p className="font-medium">Configurações:</p>
              <p>{photo.settings}</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PhotoDetailPage;