import React from "react"; // Re-adicionando importação de React para useState e useMemo
import Layout from "@/components/layout/Layout";
import Gallery from "@/components/Gallery";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Importando componentes Select

// Dados de exemplo para as fotos
const samplePhotos = [
  {
    id: "1",
    title: "Auditório Vazio",
    description: "Uma visão serena de um auditório com assentos de madeira e estofamento claro, destacando a arquitetura e a iluminação suave.",
    imageUrl: "/4db98347864763.560817ee40587.jpg",
    category: "Arquitetura",
  },
  {
    id: "2",
    title: "Motorista Misterioso",
    description: "Um retrato enigmático de um motorista com óculos de sol, iluminado por uma luz vermelha dentro de um carro, criando uma atmosfera de suspense.",
    imageUrl: "/4e6766b26a4cd8ee4199a44ac7fb191c.png",
    category: "Retrato Urbano",
  },
  {
    id: "3",
    title: "Estrada Nebulosa na Floresta",
    description: "Uma estrada sinuosa e úmida atravessando uma floresta densa e nebulosa, com a luz do sol filtrando-se pelas árvores.",
    imageUrl: "/6b7707af8cd714a4625def782faab85a.png",
    category: "Paisagem",
  },
  {
    id: "4",
    title: "Noite em Tóquio",
    description: "Uma rua movimentada em Tóquio à noite, com letreiros neon vibrantes e a luz vermelha refletindo no chão molhado.",
    imageUrl: "/6c4efaeab0c1419038633b803a47cc59.png",
    category: "Urbano",
  },
  {
    id: "5",
    title: "Carro Antigo na Neve",
    description: "Um carro clássico estacionado em uma rua nevada e nebulosa, com luzes de Natal brilhando em uma casa ao fundo.",
    imageUrl: "/7c5f389c5c4f01544eb9fcbbb946d39f.png",
    category: "Inverno",
  },
  {
    id: "6",
    title: "Loja de Peças à Noite",
    description: "Uma loja de peças automotivas iluminada à noite, com uma viatura policial estacionada do lado de fora, criando uma cena noturna intrigante.",
    imageUrl: "/7ff67a97a930f500cc2e46a34cc130ce.png",
    category: "Noturno",
  },
  {
    id: "7",
    title: "Carrinho de Hot Dog Noturno",
    description: "Um carrinho de hot dog solitário e iluminado em uma noite escura, com uma pessoa esperando por seu pedido.",
    imageUrl: "/1a907db3a9688b11cd46ca23db78223c.png",
    category: "Comida de Rua",
  },
  {
    id: "8",
    title: "Lanchonete Tarde da Noite",
    description: "Uma lanchonete com grandes janelas, onde clientes são vistos desfrutando de suas refeições tarde da noite, sob uma iluminação verde.",
    imageUrl: "/1b8af3d8c12d097fbedc20d271a07d8e.png",
    category: "Noturno",
  },
  {
    id: "9",
    title: "Posto de Gasolina Chuvoso",
    description: "Um posto de gasolina e café em uma noite chuvosa, com poças d'água refletindo as luzes e o céu nublado.",
    imageUrl: "/1b926a6634ee9bb5f41280651b0cb606.png",
    category: "Paisagem Urbana",
  },
  {
    id: "10",
    title: "Rua Molhada na Cidade",
    description: "Uma perspectiva de baixo ângulo de uma rua da cidade molhada pela chuva, com reflexos de luzes e um guarda-chuva ao fundo.",
    imageUrl: "/4c37ac927c6f32b220810bdc911d32ef.png",
    category: "Urbano",
  },
];

const PortfolioPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");

  const categories = React.useMemo(() => {
    const uniqueCategories = new Set(samplePhotos.map((photo) => photo.category));
    return ["all", ...Array.from(uniqueCategories)];
  }, []);

  const filteredPhotos = React.useMemo(() => {
    if (selectedCategory === "all") {
      return samplePhotos;
    }
    return samplePhotos.filter((photo) => photo.category === selectedCategory);
  }, [selectedCategory]);

  const handleViewDetails = (id: string) => {
    navigate(`/photo/${id}`);
  };

  return (
    <Layout>
      <h1 className="text-4xl font-bold text-center mb-8">Minha Galeria de Fotografias</h1>
      <div className="flex justify-center mb-8">
        <Select onValueChange={setSelectedCategory} defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por Categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as Categorias</SelectItem>
            {categories.filter(cat => cat !== "all").map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Gallery photos={filteredPhotos} onViewDetails={handleViewDetails} />
    </Layout>
  );
};

export default PortfolioPage;