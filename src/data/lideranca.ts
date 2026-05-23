export interface Lider {
  id: number;
  nome: string;
  cargo: string;
  descricao: string;
  imagem: string;
}

export const lideres: Lider[] = [
  {
    id: 1,
    nome: "Jorge Pallone",
    cargo: "Pastor Presidente",
    descricao:
      "Fundador e visionário da Igreja Palavra e Avivamento. Há mais de 5 anos ministrando a palavra de Deus com unção, autoridade e profundo amor pela sua comunidade.",
    imagem: "/lideranca/pastor-jorge.png",
  },
  {
    id: 2,
    nome: "Romenique Pallone",
    cargo: "Pastor · Líder da Mocidade",
    descricao:
      "Apaixonado por jovens e pelo mover do Espírito Santo. Conduz a mocidade com fé, propósito e um coração voltado para o avivamento.",
    imagem: "/lideranca/pastor-romonique.png",
  },
  {
    id: 3,
    nome: "Milena Pallone",
    cargo: "Pastora · Líder das Varoas",
    descricao:
      "Serva do Senhor dedicada ao crescimento espiritual da congregação, conduzindo a família da igreja com amor, fé e compromisso com a palavra de Deus.",
    imagem: "/lideranca/pastora-milena.png",
  },
  {
    id: 4,
    nome: "Miriam",
    cargo: "Pastora · Líder da Mocidade",
    descricao:
      "Comprometida com a geração jovem, serve com dedicação e amor. Sua liderança inspira e fortalece cada jovem a viver o propósito de Deus.",
    imagem: "/lideranca/miriam.png",
  },
];
