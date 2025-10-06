import Layout from "@/components/layout/Layout";

const AboutPage = () => {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">Sobre Mim</h1>
        <p className="text-lg text-muted-foreground mb-4">
          Olá! Sou um fotógrafo apaixonado por capturar a beleza do mundo através das minhas lentes.
          Minha jornada na fotografia começou há muitos anos, e desde então, tenho me dedicado a
          explorar diferentes estilos e técnicas para criar imagens que contam histórias e evocam emoções.
        </p>
        <p className="text-lg text-muted-foreground mb-4">
          Especializo-me em fotografia de paisagem, retratos e eventos, sempre buscando a luz perfeita
          e o momento decisivo. Acredito que cada fotografia é uma oportunidade de congelar um instante
          único e transformá-lo em uma memória duradoura.
        </p>
        <p className="text-lg text-muted-foreground">
          Fique à vontade para explorar minha galeria e entrar em contato se tiver alguma pergunta
          ou se quiser discutir um projeto.
        </p>
      </div>
    </Layout>
  );
};

export default AboutPage;