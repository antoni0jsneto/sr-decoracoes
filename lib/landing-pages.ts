/**
 * Conteúdo das landing pages de campanha (/lp/[slug]).
 *
 * Regra editorial: só afirmações que a própria SR já publica no site
 * institucional (tipos atendidos, orçamento pelo WhatsApp, horário, região,
 * formas de pagamento). Nada de avaliações, prazos, garantias, certificações,
 * descontos ou números sem fonte. Fotos e depoimentos só entram em `proof`
 * quando forem reais e autorizados pelo cliente.
 */

export type ServiceId =
  | "lavagem-persianas"
  | "lavagem-cortinas"
  | "manutencao-persianas";

export type IconName =
  | "dust"
  | "allergy"
  | "odor"
  | "stain"
  | "wallet"
  | "home"
  | "ruler"
  | "wrench"
  | "cord"
  | "stuck"
  | "track"
  | "shield"
  | "camera"
  | "chat"
  | "calendar"
  | "sparkles";

export interface ProofPhoto {
  src: string;
  alt: string;
  caption: string;
}

export interface ProofTestimonial {
  text: string;
  author: string;
  context: string;
}

export interface LandingPage {
  slug: string;
  serviceId: ServiceId;
  /** Prefixo do código de referência enviado no WhatsApp (ex.: LAV-7K2MQ). */
  refPrefix: string;
  heroArt: "blinds" | "curtains" | "repair";
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  subtitle: string;
  ctaLabel: string;
  whatsappMessage: string;
  problemsTitle: string;
  problemsIntro: string;
  problems: { icon: IconName; title: string; text: string }[];
  benefitsTitle: string;
  benefits: { icon: IconName; title: string; text: string }[];
  typesTitle: string;
  types: string[];
  processTitle: string;
  process: { icon: IconName; title: string; text: string }[];
  faq: { question: string; answer: string }[];
  form: {
    itemLabel: string;
    itemOptions: string[];
    quantityLabel: string;
    serviceLabel: string;
  };
  /** Página institucional equivalente (para quem quer mais detalhes). */
  servicePage: { href: string; label: string };
  /** Só preencher com material real e autorizado. Vazio = seção oculta. */
  proof: { photos: ProofPhoto[]; testimonials: ProofTestimonial[] };
}

const QUANTITY_OPTIONS = ["1", "2 a 4", "5 a 10", "Mais de 10"];
export { QUANTITY_OPTIONS };

const PAYMENT_FAQ = {
  question: "Quais formas de pagamento vocês aceitam?",
  answer:
    "PIX, dinheiro, cartão de débito e cartão de crédito. As condições de parcelamento são informadas junto com o orçamento.",
};

const AREA_FAQ = {
  question: "Vocês atendem na minha região?",
  answer:
    "Atendemos residências e empresas na cidade de São Paulo e na Grande São Paulo. Envie o seu bairro e cidade pelo WhatsApp para confirmarmos o atendimento no seu endereço.",
};

export const landingPages: LandingPage[] = [
  {
    slug: "lavagem-de-persianas",
    serviceId: "lavagem-persianas",
    refPrefix: "LAV",
    heroArt: "blinds",
    metaTitle: "Lavagem de Persianas em São Paulo | SR Decorações",
    metaDescription:
      "Lavagem de persianas rolô, verticais, horizontais, romanas e double vision em São Paulo e Grande SP. Envie uma foto pelo WhatsApp e receba seu orçamento sem compromisso.",
    eyebrow: "Lavagem profissional de persianas",
    h1: "Lavagem de persianas em São Paulo e Grande SP",
    subtitle:
      "Persianas rolô, verticais, horizontais, romanas e double vision limpas de verdade, sem você precisar desmontar nada. Mande uma foto pelo WhatsApp e receba o orçamento sem compromisso.",
    ctaLabel: "Solicitar orçamento para lavagem",
    whatsappMessage:
      "Olá! Acessei o site da SR Decorações e gostaria de solicitar um orçamento para lavagem de persianas.",
    problemsTitle: "Sua persiana está pedindo uma lavagem?",
    problemsIntro:
      "Persianas acumulam poeira todos os dias e espanador nenhum tira a sujeira que fica presa no tecido e nas lâminas.",
    problems: [
      {
        icon: "dust",
        title: "Poeira que não sai",
        text: "Tecido acinzentado e lâminas com pó acumulado, mesmo depois de passar pano.",
      },
      {
        icon: "allergy",
        title: "Alergia e rinite em casa",
        text: "A poeira presa na persiana concentra ácaros e alérgenos bem ao lado de onde você dorme ou trabalha.",
      },
      {
        icon: "odor",
        title: "Cheiro de fumaça ou gordura",
        text: "Persianas de cozinha, sala e escritório absorvem odores com o tempo.",
      },
      {
        icon: "stain",
        title: "Manchas e tecido encardido",
        text: "Marcas de mão, respingos e o amarelado que deixa o ambiente com aparência de descuido.",
      },
    ],
    benefitsTitle: "Por que lavar com a SR Decorações",
    benefits: [
      {
        icon: "home",
        title: "Sem desmontar nem transportar",
        text: "A retirada e a recolocação ficam por nossa conta. Você não precisa mexer em suporte nem em mecanismo.",
      },
      {
        icon: "wallet",
        title: "Bem mais barato que trocar",
        text: "Lavar custa uma fração do preço de uma persiana nova e devolve a aparência da peça.",
      },
      {
        icon: "ruler",
        title: "Orçamento pelo tipo e tamanho",
        text: "O valor considera o modelo, o tecido e as medidas de cada persiana. Sem surpresa depois.",
      },
      {
        icon: "wrench",
        title: "Conserto no mesmo atendimento",
        text: "Cordão gasto, corrente solta ou mecanismo travando? Também fazemos a manutenção.",
      },
    ],
    typesTitle: "Modelos que lavamos",
    types: [
      "Persiana rolô",
      "Persiana vertical",
      "Persiana horizontal",
      "Persiana romana",
      "Double vision",
    ],
    processTitle: "Como funciona",
    process: [
      {
        icon: "camera",
        title: "Envie fotos pelo WhatsApp",
        text: "Uma foto de cada persiana e as medidas aproximadas já bastam para começar.",
      },
      {
        icon: "chat",
        title: "Receba o orçamento e agende",
        text: "Avaliamos o tipo, o tecido e a quantidade, passamos o valor e combinamos o melhor dia.",
      },
      {
        icon: "sparkles",
        title: "Persianas limpas e prontas para uso",
        text: "Fazemos a lavagem e entregamos suas persianas limpas, no prazo combinado no orçamento.",
      },
    ],
    faq: [
      {
        question: "Quais tipos de persiana vocês lavam?",
        answer:
          "Lavamos persianas rolô, verticais, horizontais, romanas e double vision. Se tiver dúvida sobre o seu modelo, envie uma foto pelo WhatsApp.",
      },
      {
        question: "Preciso desmontar a persiana?",
        answer:
          "Não. A retirada e a recolocação ficam por nossa conta. No orçamento explicamos como o serviço será feito no seu caso.",
      },
      {
        question: "Quanto custa a lavagem de persianas?",
        answer:
          "O valor depende do modelo, do tamanho e da quantidade de persianas. Envie fotos e medidas aproximadas pelo WhatsApp e passamos o orçamento sem compromisso.",
      },
      {
        question: "Quanto tempo demora?",
        answer:
          "Depende da quantidade e do tipo de persiana. O prazo é informado no orçamento, antes de você fechar o serviço.",
      },
      {
        question: "A lavagem tira manchas e mau cheiro?",
        answer:
          "Na maioria dos casos, sim. Manchas muito antigas ou intensas podem não sair por completo; pelas fotos avisamos antes o que esperar.",
      },
      AREA_FAQ,
      PAYMENT_FAQ,
    ],
    form: {
      itemLabel: "Tipo de persiana",
      itemOptions: [
        "Rolô",
        "Vertical",
        "Horizontal",
        "Romana",
        "Double vision",
        "Não sei / vários tipos",
      ],
      quantityLabel: "Quantas persianas?",
      serviceLabel: "lavagem de persianas",
    },
    servicePage: {
      href: "/servicos/persianas/lavagem",
      label: "Lavagem de persianas e cortinas",
    },
    proof: { photos: [], testimonials: [] },
  },
  {
    slug: "lavagem-de-cortinas",
    serviceId: "lavagem-cortinas",
    refPrefix: "COR",
    heroArt: "curtains",
    metaTitle: "Lavagem de Cortinas em São Paulo | SR Decorações",
    metaDescription:
      "Lavagem de cortinas de tecido em São Paulo e Grande SP, com retirada e recolocação. Envie uma foto pelo WhatsApp e receba seu orçamento sem compromisso.",
    eyebrow: "Lavagem profissional de cortinas",
    h1: "Lavagem de cortinas em São Paulo e Grande SP",
    subtitle:
      "Cortinas de tecido lavadas por especialistas em cortinas e persianas, com retirada e recolocação por nossa conta. Mande uma foto pelo WhatsApp e receba o orçamento sem compromisso.",
    ctaLabel: "Solicitar orçamento para lavagem",
    whatsappMessage:
      "Olá! Acessei o site da SR Decorações e gostaria de solicitar um orçamento para lavagem de cortinas.",
    problemsTitle: "Sua cortina está pedindo uma lavagem?",
    problemsIntro:
      "Cortina grande é difícil de tirar, não cabe na máquina de casa e encolhe ou amassa quando lavada do jeito errado.",
    problems: [
      {
        icon: "dust",
        title: "Tecido acinzentado",
        text: "A poeira impregna a trama e a cortina perde a cor original.",
      },
      {
        icon: "allergy",
        title: "Alergia e rinite em casa",
        text: "O tecido acumula poeira, ácaros e alérgenos no ambiente em que a família passa mais tempo.",
      },
      {
        icon: "odor",
        title: "Cheiro de fumaça, mofo ou gordura",
        text: "Cortinas absorvem odores da casa e da rua com o passar dos meses.",
      },
      {
        icon: "stain",
        title: "Peça grande demais para a máquina",
        text: "Tirar do varão ou do trilho, lavar e passar uma cortina grande dá trabalho e tem risco de estragar.",
      },
    ],
    benefitsTitle: "Por que lavar com a SR Decorações",
    benefits: [
      {
        icon: "home",
        title: "Retirada e recolocação inclusas",
        text: "Você não precisa subir em escada nem tirar a cortina do varão ou do trilho.",
      },
      {
        icon: "ruler",
        title: "Orçamento pelo tecido e tamanho",
        text: "O valor considera o tecido, as medidas e a quantidade de peças. Sem surpresa depois.",
      },
      {
        icon: "wallet",
        title: "Bem mais barato que trocar",
        text: "Lavar custa uma fração do preço de uma cortina nova e devolve a aparência do tecido.",
      },
      {
        icon: "sparkles",
        title: "Cortinas e persianas juntas",
        text: "Tem persiana na casa ou no escritório? Lavamos tudo no mesmo atendimento.",
      },
    ],
    typesTitle: "O que lavamos",
    types: [
      "Cortinas de tecido",
      "Cortinas de varão",
      "Cortinas de trilho",
      "Persianas de todos os modelos",
    ],
    processTitle: "Como funciona",
    process: [
      {
        icon: "camera",
        title: "Envie fotos pelo WhatsApp",
        text: "Uma foto de cada cortina e as medidas aproximadas já bastam para começar.",
      },
      {
        icon: "chat",
        title: "Receba o orçamento e agende",
        text: "Avaliamos o tecido e a quantidade, passamos o valor e combinamos o melhor dia.",
      },
      {
        icon: "sparkles",
        title: "Cortinas limpas e prontas para uso",
        text: "Fazemos a lavagem e entregamos suas cortinas limpas, no prazo combinado no orçamento.",
      },
    ],
    faq: [
      {
        question: "Vocês tiram e recolocam a cortina?",
        answer:
          "Sim. A retirada e a recolocação ficam por nossa conta. No orçamento explicamos como o serviço será feito no seu caso.",
      },
      {
        question: "Quanto custa a lavagem de cortinas?",
        answer:
          "O valor depende do tecido, do tamanho e da quantidade de peças. Envie fotos e medidas aproximadas pelo WhatsApp e passamos o orçamento sem compromisso.",
      },
      {
        question: "Quanto tempo demora?",
        answer:
          "Depende da quantidade e do tecido. O prazo é informado no orçamento, antes de você fechar o serviço.",
      },
      {
        question: "A lavagem tira manchas e mau cheiro?",
        answer:
          "Na maioria dos casos, sim. Manchas muito antigas ou intensas podem não sair por completo; pelas fotos avisamos antes o que esperar.",
      },
      AREA_FAQ,
      PAYMENT_FAQ,
    ],
    form: {
      itemLabel: "Tipo de peça",
      itemOptions: [
        "Cortina de tecido",
        "Cortina e persiana",
        "Não sei / vários tipos",
      ],
      quantityLabel: "Quantas peças?",
      serviceLabel: "lavagem de cortinas",
    },
    servicePage: {
      href: "/servicos/persianas/lavagem",
      label: "Lavagem de persianas e cortinas",
    },
    proof: { photos: [], testimonials: [] },
  },
  {
    slug: "manutencao-de-persianas",
    serviceId: "manutencao-persianas",
    refPrefix: "MAN",
    heroArt: "repair",
    metaTitle: "Conserto e Manutenção de Persianas em SP | SR Decorações",
    metaDescription:
      "Conserto e manutenção de persianas em São Paulo e Grande SP: troca de cordão, corrente, mecanismo, suporte e trilho. Envie um vídeo do defeito pelo WhatsApp e receba o orçamento.",
    eyebrow: "Conserto e manutenção de persianas",
    h1: "Conserto de persianas em São Paulo e Grande SP",
    subtitle:
      "Persiana que não sobe, não desce, enrola torta ou arrebentou o cordão? Trocamos cordas, mecanismos, suportes e trilhos. Envie um vídeo do defeito pelo WhatsApp e receba o orçamento sem compromisso.",
    ctaLabel: "Solicitar orçamento para conserto",
    whatsappMessage:
      "Olá! Gostaria de solicitar um orçamento para conserto ou manutenção de persianas.",
    problemsTitle: "Qual é o problema da sua persiana?",
    problemsIntro:
      "A maior parte dos defeitos está no cordão, na corrente, no mecanismo ou no suporte, e tem conserto.",
    problems: [
      {
        icon: "stuck",
        title: "Não sobe ou não desce",
        text: "Mecanismo travado, corrente patinando ou rolô que não recolhe.",
      },
      {
        icon: "cord",
        title: "Cordão ou corrente arrebentou",
        text: "Cordas gastas, puxador quebrado ou corrente solta.",
      },
      {
        icon: "track",
        title: "Trilho ou lâminas desalinhadas",
        text: "Persiana vertical com lâminas fora do lugar ou trilho com defeito.",
      },
      {
        icon: "shield",
        title: "Suporte solto",
        text: "Persiana caindo, torta ou presa só de um lado.",
      },
    ],
    benefitsTitle: "Por que consertar com a SR Decorações",
    benefits: [
      {
        icon: "wallet",
        title: "Consertar custa menos que trocar",
        text: "Na maioria dos casos, trocar a peça com defeito resolve por bem menos que uma persiana nova.",
      },
      {
        icon: "ruler",
        title: "Diagnóstico antes do orçamento",
        text: "Identificamos a causa do defeito e explicamos o que precisa ser trocado antes de você decidir.",
      },
      {
        icon: "wrench",
        title: "Cordas, mecanismos, suportes e trilhos",
        text: "Fazemos a troca das peças e os ajustes para a persiana voltar a funcionar.",
      },
      {
        icon: "sparkles",
        title: "Manutenção e lavagem juntas",
        text: "Se a persiana também estiver suja, a lavagem pode ser feita no mesmo atendimento.",
      },
    ],
    typesTitle: "Modelos que consertamos",
    types: [
      "Persiana rolô",
      "Persiana vertical",
      "Persiana horizontal",
      "Persiana romana",
      "Double vision",
      "Cortinas",
    ],
    processTitle: "Como funciona",
    process: [
      {
        icon: "camera",
        title: "Envie um vídeo do defeito",
        text: "Pelo WhatsApp, mostre a persiana funcionando (ou travando). Fotos do mecanismo ajudam.",
      },
      {
        icon: "chat",
        title: "Diagnóstico e orçamento",
        text: "Dizemos o que precisa ser feito, passamos o valor e combinamos o melhor dia.",
      },
      {
        icon: "wrench",
        title: "Conserto no local",
        text: "Trocamos as peças necessárias e deixamos a persiana funcionando.",
      },
    ],
    faq: [
      {
        question: "Vale mais a pena consertar ou trocar a persiana?",
        answer:
          "Quando o problema está no cordão, na corrente, no mecanismo, no suporte ou no trilho, o conserto costuma resolver por bem menos. Se não compensar, avisamos antes.",
      },
      {
        question: "Quais defeitos vocês consertam?",
        answer:
          "Troca de cordas e correntes, mecanismos, suportes e trilhos, além de ajustes em persianas que não sobem, não descem ou enrolam tortas.",
      },
      {
        question: "Quais modelos vocês consertam?",
        answer:
          "Persianas rolô, verticais, horizontais, romanas, double vision e cortinas. Envie um vídeo ou foto pelo WhatsApp para avaliarmos o seu caso.",
      },
      {
        question: "Como funciona o orçamento?",
        answer:
          "Envie pelo WhatsApp um vídeo curto do defeito e uma foto da persiana inteira. Com isso já conseguimos orientar e passar o orçamento sem compromisso.",
      },
      {
        question: "Vocês fazem manutenção preventiva?",
        answer:
          "Sim. Além do conserto, fazemos manutenção preventiva para evitar novos problemas e prolongar a vida útil das persianas.",
      },
      AREA_FAQ,
      PAYMENT_FAQ,
    ],
    form: {
      itemLabel: "Tipo de persiana",
      itemOptions: [
        "Rolô",
        "Vertical",
        "Horizontal",
        "Romana",
        "Double vision",
        "Não sei / outro",
      ],
      quantityLabel: "Quantas persianas com defeito?",
      serviceLabel: "conserto ou manutenção de persianas",
    },
    servicePage: {
      href: "/servicos/persianas/manutencao",
      label: "Manutenção de persianas e cortinas",
    },
    proof: { photos: [], testimonials: [] },
  },
];

export function getLandingPage(slug: string): LandingPage | undefined {
  return landingPages.find((page) => page.slug === slug);
}

/** Regiões citadas na seção "Área de atendimento" (confirmar com o cliente). */
export const SERVICE_AREA = {
  summary:
    "Atendemos residências e empresas na cidade de São Paulo e na Grande São Paulo.",
  places: [
    "São Paulo (capital)",
    "Santo André",
    "São Bernardo do Campo",
    "São Caetano do Sul",
    "Guarulhos",
    "Osasco",
  ],
};
