-- Create photos table
CREATE TABLE public.photos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  category TEXT,
  photo_date TEXT,
  camera TEXT,
  lens TEXT,
  settings TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS (REQUIRED for security)
ALTER TABLE public.photos ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow public read access
CREATE POLICY "Public read access" ON public.photos
FOR SELECT USING (true);

-- Insert existing photo data into the new table
INSERT INTO public.photos (id, title, description, image_url, category, photo_date, camera, lens, settings)
VALUES
  ('a1b2c3d4-e5f6-7890-1234-567890abcdef', 'Auditório Vazio', 'Uma visão serena de um auditório com assentos de madeira e estofamento claro, destacando a arquitetura e a iluminação suave. A fotografia busca capturar a quietude e a grandiosidade do espaço antes de um evento.', '/4db98347864763.560817ee40587.jpg', 'Arquitetura', '20 de Abril de 2024', 'Canon EOS R6', 'RF 24-70mm f/2.8L IS USM', 'ISO 400, f/8, 1/100s'),
  ('b2c3d4e5-f6a7-8901-2345-67890abcdef1', 'Motorista Misterioso', 'Um retrato enigmático de um motorista com óculos de sol, iluminado por uma luz vermelha dentro de um carro, criando uma atmosfera de suspense. A imagem explora o contraste de cores e a narrativa implícita.', '/4e6766b26a4cd8ee4199a44ac7fb191c.png', 'Retrato Urbano', '10 de Março de 2024', 'Sony Alpha a7S III', 'FE 50mm f/1.2 GM', 'ISO 800, f/1.8, 1/160s'),
  ('c3d4e5f6-a7b8-9012-3456-7890abcdef12', 'Estrada Nebulosa na Floresta', 'Uma estrada sinuosa e úmida atravessando uma floresta densa e nebulosa, com a luz do sol filtrando-se pelas árvores. A foto evoca uma sensação de mistério e a beleza intocada da natureza.', '/6b7707af8cd714a4625def782faab85a.png', 'Paisagem', '05 de Fevereiro de 2024', 'Nikon Z7 II', 'NIKKOR Z 14-30mm f/4 S', 'ISO 200, f/11, 1/80s'),
  ('d4e5f6a7-b8c9-0123-4567-890abcdef123', 'Noite em Tóquio', 'Uma rua movimentada em Tóquio à noite, com letreiros neon vibrantes e a luz vermelha refletindo no chão molhado. A imagem captura a energia e a estética única das cidades asiáticas à noite.', '/6c4efaeab0c1419038633b803a47cc59.png', 'Urbano', '12 de Janeiro de 2024', 'Fujifilm X-T4', 'XF 23mm f/1.4 R LM WR', 'ISO 640, f/2.0, 1/100s'),
  ('e5f6a7b8-c9d0-1234-5678-90abcdef1234', 'Carro Antigo na Neve', 'Um carro clássico estacionado em uma rua nevada e nebulosa, com luzes de Natal brilhando em uma casa ao fundo. A cena combina nostalgia com a atmosfera fria e festiva do inverno.', '/7c5f389c5c4f01544eb9fcbbb946d39f.png', 'Inverno', '25 de Dezembro de 2023', 'Leica Q2', 'Summilux 28mm f/1.7 ASPH.', 'ISO 1600, f/2.8, 1/60s'),
  ('f6a7b8c9-d0e1-2345-6789-0abcdef12345', 'Loja de Peças à Noite', 'Uma loja de peças automotivas iluminada à noite, com uma viatura policial estacionada do lado de fora, criando uma cena noturna intrigante. A composição sugere uma história não contada.', '/7ff67a97a930f500cc2e46a34cc130ce.png', 'Noturno', '01 de Novembro de 2023', 'Hasselblad X1D II 50C', 'XCD 45mm f/3.5', 'ISO 200, f/5.6, 1/30s'),
  ('a7b8c9d0-e1f2-3456-7890-abcdef123456', 'Carrinho de Hot Dog Noturno', 'Um carrinho de hot dog solitário e iluminado em uma noite escura, com uma pessoa esperando por seu pedido. A luz quente do carrinho contrasta com a escuridão ao redor, criando um ponto focal.', '/1a907db3a9688b11cd46ca23db78223c.png', 'Comida de Rua', '18 de Outubro de 2023', 'Google Pixel 8 Pro', 'Principal', 'ISO 1000, f/1.8, 1/40s'),
  ('b8c9d0e1-f2a3-4567-8901-bcdef1234567', 'Lanchonete Tarde da Noite', 'Uma lanchonete com grandes janelas, onde clientes são vistos desfrutando de suas refeições tarde da noite, sob uma iluminação verde. A cena transmite uma sensação de aconchego e rotina noturna.', '/1b8af3d8c12d097fbedc20d271a07d8e.png', 'Noturno', '07 de Setembro de 2023', 'iPhone 15 Pro Max', 'Principal', 'ISO 1200, f/1.78, 1/50s'),
  ('c9d0e1f2-a3b4-5678-9012-cdef12345678', 'Posto de Gasolina Chuvoso', 'Um posto de gasolina e café em uma noite chuvosa, com poças d''água refletindo as luzes e o céu nublado. A imagem captura a atmosfera melancólica e reflexiva de uma noite de chuva na estrada.', '/1b926a6634ee9bb5f41280651b0cb606.png', 'Paisagem Urbana', '29 de Agosto de 2023', 'Canon EOS 5D Mark IV', 'EF 24-70mm f/2.8L II USM', 'ISO 800, f/4.0, 1/60s'),
  ('d0e1f2a3-b4c5-6789-0123-def123456789', 'Rua Molhada na Cidade', 'Uma perspectiva de baixo ângulo de uma rua da cidade molhada pela chuva, com reflexos de luzes e um guarda-chuva ao fundo. A fotografia brinca com a profundidade de campo e as cores vibrantes dos reflexos.', '/4c37ac927c6f32b220810bdc911d32ef.png', 'Urbano', '14 de Julho de 2023', 'Sony Alpha a7 III', 'FE 35mm f/1.4 GM', 'ISO 640, f/2.8, 1/125s');