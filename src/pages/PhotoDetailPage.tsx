import Layout from "@/components/layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

// Dados de exemplo (os mesmos da PortfolioPage para consistência)
const samplePhotos = [
  {
    id: "1",
    title: "Auditório Vazio",
    description: "Uma visão serena de um auditório com assentos de madeira e estofamento claro, destacando a arquitetura e a iluminação suave. A fotografia busca capturar a quietude e a grandiosidade do espaço antes de um evento.",
    imageUrl: "/4db98347864763.560817ee40587.jpg",
    category: "Arquitetura",
    date: "20 de Abril de 2024",
    camera: "Canon EOS R6",
    lens: "RF 24-70mm f/2.8L IS USM",
    settings: "ISO 400, f/8, 1/100s",
  },
  {
    id: "2",
    title: "Motorista Misterioso",
    description: "Um retrato enigmático de um motorista com óculos de sol, iluminado por uma luz vermelha dentro de um carro, criando uma atmosfera de suspense. A imagem explora o contraste de cores e a narrativa implícita.",
    imageUrl: "/4e6766b26a4cd8ee4199a44ac7fb191c.png",
    category: "Retrato Urbano",
    date: "10 de Março de 2024",
    camera: "Sony Alpha a7S III",
    lens: "FE 50mm f/1.2 GM",
    settings: "ISO 800, f/1.8, 1/160s",
  },
  {
    id: "3",
    title: "Estrada Nebulosa na Floresta",
    description: "Uma estrada sinuosa e úmida atravessando uma floresta densa e nebulosa, com a luz do sol filtrando-se pelas árvores. A foto evoca uma sensação de mistério e a beleza intocada da natureza.",
    imageUrl: "/6b7707af8cd714a4625def782faab85a.png",
    category: "Paisagem",
    date: "05 de Fevereiro de 2024",
    camera: "Nikon Z7 II",
    lens: "NIKKOR Z 14-30mm f/4 S",
    settings: "ISO 200, f/11, 1/80s",
  },
  {
    id: "4",
    title: "Noite em Tóquio",
    description: "Uma rua movimentada em Tóquio à noite, com letreiros neon vibrantes e a luz vermelha refletindo no chão molhado. A imagem captura a energia e a estética única das cidades asiáticas à noite.",
    imageUrl: "/6c4efaeab0c1419038633b803a47cc59.png",
    category: "Urbano",
    date: "12 de Janeiro de 2024",
    camera: "Fujifilm X-T4",
    lens: "XF 23mm f/1.4 R LM WR",
    settings: "ISO 640, f/2.0, 1/100s",
  },
  {
    id: "5",
    title: "Carro Antigo na Neve",
    description: "Um carro clássico estacionado em uma rua nevada e nebulosa, com luzes de Natal brilhando em uma casa ao fundo. A cena combina nostalgia com a atmosfera fria e festiva do inverno.",
    imageUrl: "/7c5f389c5c4f01544eb9fcbbb946d39f.png",
    category: "Inverno",
    date: "25 de Dezembro de 2023",
    camera: "Leica Q2",
    lens: "Summilux 28mm f/1.7 ASPH.",
    settings: "ISO 1600, f/2.8, 1/60s",
  },
  {
    id: "6",
    title: "Loja de Peças à Noite",
    description: "Uma loja de peças automotivas iluminada à noite, com uma viatura policial estacionada do lado de fora, criando uma cena noturna intrigante. A composição sugere uma história não contada.",
    imageUrl: "/7ff67a97a930f500cc2e46a34cc130ce.png",
    category: "Noturno",
    date: "01 de Novembro de 2023",
    camera: "Hasselblad X1D II 50C",
    lens: "XCD 45mm f/3.5",
    settings: "ISO 200, f/5.6, 1/30s",
  },
  {
    id: "7",
    title: "Carrinho de Hot Dog Noturno",
    description: "Um carrinho de hot dog solitário e iluminado em uma noite escura, com uma pessoa esperando por seu pedido. A luz quente do carrinho contrasta com a escuridão ao redor, criando um ponto focal.",
    imageUrl: "/1a907db3a9688b11cd46ca23db78223c.png",
    category: "Comida de Rua",
    date: "18 de Outubro de 2023",
    camera: "Google Pixel 8 Pro",
    lens: "Principal",
    settings: "ISO 1000, f/1.8, 1/40s",
  },
  {
    id: "8",
    title: "Lanchonete Tarde da Noite",
    description: "Uma lanchonete com grandes janelas, onde clientes são vistos desfrutando de suas refeições tarde da noite, sob uma iluminação verde. A cena transmite uma sensação de aconchego e rotina noturna.",
    imageUrl: "/1b8af3d8c12d097fbedc20d271a07d8e.png",
    category: "Noturno",
    date: "07 de Setembro de 2023",
    camera: "iPhone 15 Pro Max",
    lens: "Principal",
    settings: "ISO 1200, f/1.78, 1/50s",
  },
  {
    id: "9",
    title: "Posto de Gasolina Chuvoso",
    description: "Um posto de gasolina e café em uma noite chuvosa, com poças d'água refletindo as luzes e o céu nublado. A imagem captura a atmosfera melancólica e reflexiva de uma noite de chuva na estrada.",
    imageUrl: "/1b926a6634ee9bb5f41280651b0cb606.png",
    category: "Paisagem Urbana",
    date: "29 de Agosto de 2023",
    camera: "Canon EOS 5D Mark IV",
    lens: "EF 24-70mm f/2.8L II USM",
    settings: "ISO 800, f/4.0, 1/60s",
  },
  {
    id: "10",
    title: "Rua Molhada na Cidade",
    description: "Uma perspectiva de baixo ângulo de uma rua da cidade molhada pela chuva, com reflexos de luzes e um guarda-chuva ao fundo. A fotografia brinca com a profundidade de campo e as cores vibrantes dos reflexos.",
    imageUrl: "/4c37ac927c6f32b220810bdc911d32ef.png",
    category: "Urbano",
    date: "14 de Julho de 2023",
    camera: "Sony Alpha a7 III",
    lens: "FE 35mm f/1.4 GM",
    settings: "ISO 640, f/2.8, 1/125s",
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