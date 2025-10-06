import React from "react";
import Layout from "@/components/layout/Layout";
import Gallery from "@/components/Gallery";
import { useNavigate } from "react-router-dom";

// Dados de exemplo para as fotos
const samplePhotos = [
  {
    id: "1",
    title: "Pôr do Sol na Praia",
    description: "Uma vista deslumbrante do pôr do sol sobre o oceano, com cores vibrantes no céu.",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961dde?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Paisagem",
  },
  {
    id: "2",
    title: "Retrato Urbano",
    description: "Um retrato cativante de uma pessoa em um ambiente urbano movimentado.",
    imageUrl: "https://images.unsplash.com/photo-1529629767072-bf287236530f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Retrato",
  },
  {
    id: "3",
    title: "Natureza Selvagem",
    description: "A beleza intocada da vida selvagem em seu habitat natural.",
    imageUrl: "https://images.unsplash.com/photo-1501854140801-50d00698a7ee?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Natureza",
  },
  {
    id: "4",
    title: "Arquitetura Moderna",
    description: "Linhas limpas e design inovador de um edifício contemporâneo.",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a9dc549b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Arquitetura",
  },
  {
    id: "5",
    title: "Comida Gourmet",
    description: "Uma apresentação artística de um prato delicioso e colorido.",
    imageUrl: "https://images.unsplash.com/photo-1504674900247-087700ff89c6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Comida",
  },
  {
    id: "6",
    title: "Esportes Radicais",
    description: "Ação e adrenalina capturadas em um momento de esporte extremo.",
    imageUrl: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Esportes",
  },
];

const PortfolioPage = () => {
  const navigate = useNavigate();

  const handleViewDetails = (id: string) => {
    navigate(`/photo/${id}`);
  };

  return (
    <Layout>
      <h1 className="text-4xl font-bold text-center mb-8">Minha Galeria de Fotografias</h1>
      <Gallery photos={samplePhotos} onViewDetails={handleViewDetails} />
    </Layout>
  );
};

export default PortfolioPage;