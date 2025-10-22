export interface Service {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  icon: string;
  category: 'motor' | 'suspensao' | 'freios' | 'eletrica' | 'pneus' | 'ar' | 'diagnostico' | 'oleo';
  metaTitle: string;
  metaDescription: string;
  introduction: string;
  whatIs: string;
  whatInvolves: string[];
  whyDo: string[];
  whenToDo: string;
  howWeDo: string;
  whyChooseUs: string;
  faqs: {
    question: string;
    answer: string;
  }[];
  relatedServices: string[];
}

export const mockServices: Service[] = [
  {
    id: '1',
    name: 'Troca de Óleo e Filtros',
    slug: 'troca-de-oleo',
    shortDescription: 'Manutenção essencial para o coração do seu veículo',
    icon: 'Droplet',
    category: 'oleo',
    metaTitle: 'Troca de Óleo Automotiva em Porteirinha/MG - APARBS',
    metaDescription: 'Troca de óleo profissional em Porteirinha. Peças de qualidade, mão de obra especializada e cuidado com seu veículo. Agende na APARBS.',
    introduction: 'A troca de óleo é como o check-up do coração do seu carro. É através dele que o motor recebe a proteção necessária para funcionar com suavidade, eficiência e longevidade. Na APARBS, cada troca de óleo é feita com atenção aos detalhes e produtos de qualidade.',
    whatIs: 'É a substituição periódica do óleo lubrificante e dos filtros do motor, garantindo que todas as peças internas trabalhem sem atrito excessivo e acúmulo de impurezas.',
    whatInvolves: [
      'Drenagem completa do óleo usado',
      'Substituição do filtro de óleo',
      'Verificação do filtro de ar',
      'Reabastecimento com óleo novo especificado pelo fabricante',
      'Inspeção visual de possíveis vazamentos'
    ],
    whyDo: [
      'Aumenta a vida útil do motor',
      'Melhora o desempenho e economia de combustível',
      'Previne superaquecimento',
      'Reduz emissões poluentes',
      'Evita desgaste prematuro das peças'
    ],
    whenToDo: 'Recomendamos seguir o manual do fabricante, geralmente entre 5.000 km e 10.000 km. Se você perceber o óleo escuro, motor fazendo barulho estranho ou a luz de óleo acesa, procure a APARBS imediatamente.',
    howWeDo: 'Primeiro, elevamos o veículo com segurança e realizamos a drenagem completa do óleo antigo. Trocamos o filtro por um novo e de qualidade certificada. Depois, reabastecemos com o óleo especificado para o seu modelo. Por fim, fazemos uma inspeção visual completa e registramos o serviço para seu controle.',
    whyChooseUs: 'Na APARBS, usamos apenas óleos e filtros de marcas reconhecidas. Nossa equipe é treinada e experiente. Além disso, mantemos um registro detalhado de cada serviço, para que você sempre saiba quando fazer a próxima manutenção.',
    faqs: [
      {
        question: 'Com que frequência devo trocar o óleo?',
        answer: 'Depende do seu veículo e do tipo de uso. Em geral, recomendamos entre 5.000 km e 10.000 km. Consulte o manual ou fale conosco.'
      },
      {
        question: 'Posso usar qualquer tipo de óleo?',
        answer: 'Não. Cada motor tem uma especificação técnica. Usamos sempre o óleo recomendado pelo fabricante para garantir máxima proteção.'
      },
      {
        question: 'Quanto tempo leva o serviço?',
        answer: 'Em média, entre 30 e 45 minutos. Fazemos com agilidade, mas sem pressa, para garantir qualidade.'
      }
    ],
    relatedServices: ['2', '7']
  },
  {
    id: '2',
    name: 'Revisão Completa',
    slug: 'revisao-completa',
    shortDescription: 'Check-up geral para manter tudo funcionando perfeitamente',
    icon: 'ClipboardCheck',
    category: 'diagnostico',
    metaTitle: 'Revisão Completa de Veículos em Porteirinha/MG - APARBS',
    metaDescription: 'Revisão automotiva completa em Porteirinha. Diagnóstico detalhado, manutenção preventiva e relatório transparente. Confie na APARBS.',
    introduction: 'Uma revisão completa vai muito além de trocar óleo. É um check-up minucioso que identifica problemas antes que eles virem dor de cabeça. Na APARBS, cada revisão é feita com método e transparência total.',
    whatIs: 'É uma verificação detalhada de todos os sistemas do veículo, incluindo motor, freios, suspensão, elétrica, pneus e muito mais. O objetivo é prevenir falhas e garantir segurança.',
    whatInvolves: [
      'Verificação do sistema de freios',
      'Inspeção da suspensão e direção',
      'Análise do sistema elétrico',
      'Checagem de fluidos (óleo, água, freio)',
      'Verificação de pneus e alinhamento',
      'Teste de bateria e alternador',
      'Inspeção visual geral'
    ],
    whyDo: [
      'Previne quebras inesperadas',
      'Aumenta a segurança de motorista e passageiros',
      'Economiza dinheiro ao evitar reparos caros',
      'Mantém o valor de revenda do veículo',
      'Garante eficiência e desempenho'
    ],
    whenToDo: 'Recomendamos a cada 6 meses ou 10.000 km. Se o carro está com comportamento estranho, barulhos, vibrações ou luzes acesas no painel, agende uma revisão o quanto antes.',
    howWeDo: 'Nossa equipe segue um checklist rigoroso. Cada sistema é testado e inspecionado. Ao final, você recebe um relatório completo com o que foi verificado, o que está em ordem e o que precisa de atenção. Sem surpresas, com total transparência.',
    whyChooseUs: 'Somos conhecidos pela honestidade. Se algo não precisa ser trocado, a gente fala. Se precisa, explicamos o porquê. Nosso compromisso é com a sua segurança e confiança.',
    faqs: [
      {
        question: 'Quanto tempo demora uma revisão completa?',
        answer: 'Depende do estado do veículo, mas em média leva de 2 a 3 horas.'
      },
      {
        question: 'Vocês fazem revisão em qualquer marca?',
        answer: 'Sim! Atendemos todas as marcas e modelos de veículos.'
      },
      {
        question: 'Preciso agendar?',
        answer: 'Recomendamos, para garantir que teremos tempo dedicado ao seu carro sem correria.'
      }
    ],
    relatedServices: ['1', '7']
  },
  {
    id: '3',
    name: 'Alinhamento e Balanceamento',
    slug: 'alinhamento-balanceamento',
    shortDescription: 'Direção estável, pneus durando mais e conforto na estrada',
    icon: 'Gauge',
    category: 'pneus',
    metaTitle: 'Alinhamento e Balanceamento 3D em Porteirinha/MG - APARBS',
    metaDescription: 'Alinhamento 3D e balanceamento de precisão em Porteirinha. Tecnologia avançada, equipe especializada. Agende na APARBS.',
    introduction: 'Quando o carro puxa para o lado ou o volante vibra, é sinal de que o alinhamento e balanceamento precisam de atenção. Esses serviços garantem que seu veículo ande reto, seguro e economize pneus.',
    whatIs: 'Alinhamento é o ajuste dos ângulos das rodas para que fiquem na posição correta. Balanceamento é a distribuição uniforme do peso das rodas e pneus, eliminando vibrações.',
    whatInvolves: [
      'Análise computadorizada dos ângulos das rodas',
      'Ajuste de cambagem, cáster e convergência',
      'Balanceamento das quatro rodas',
      'Verificação de desgaste dos pneus',
      'Inspeção da suspensão'
    ],
    whyDo: [
      'Aumenta a vida útil dos pneus',
      'Melhora a estabilidade e segurança',
      'Reduz o desgaste irregular',
      'Economiza combustível',
      'Proporciona conforto na direção'
    ],
    whenToDo: 'Recomendamos a cada 10.000 km ou quando perceber o carro puxando para um lado, volante torto, ou vibrações. Sempre após trocar pneus ou bater em buracos.',
    howWeDo: 'Utilizamos equipamento 3D de última geração para medir os ângulos com precisão milimétrica. Depois, ajustamos cada roda conforme as especificações do fabricante. O balanceamento é feito com pesos de alta qualidade, garantindo suavidade total.',
    whyChooseUs: 'Nosso equipamento 3D é referência em precisão. Além disso, nossa equipe tem anos de experiência e faz cada ajuste com atenção aos detalhes.',
    faqs: [
      {
        question: 'Qual a diferença entre alinhamento e balanceamento?',
        answer: 'Alinhamento ajusta os ângulos das rodas. Balanceamento distribui o peso uniformemente. Ambos são importantes e complementares.'
      },
      {
        question: 'Quanto tempo dura o serviço?',
        answer: 'Entre 40 minutos e 1 hora para fazer os dois serviços.'
      },
      {
        question: 'Preciso fazer sempre os dois juntos?',
        answer: 'Não necessariamente, mas é recomendado. Se tiver dúvida, nossos técnicos avaliam e orientam.'
      }
    ],
    relatedServices: ['4', '5']
  },
  {
    id: '4',
    name: 'Suspensão',
    slug: 'suspensao',
    shortDescription: 'Conforto, estabilidade e segurança em cada curva',
    icon: 'CarFront',
    category: 'suspensao',
    metaTitle: 'Serviço de Suspensão Automotiva em Porteirinha/MG - APARBS',
    metaDescription: 'Manutenção e reparo de suspensão em Porteirinha. Diagnóstico preciso, peças de qualidade. Agende na APARBS.',
    introduction: 'A suspensão é responsável pelo conforto, estabilidade e segurança do seu veículo. Quando ela está comprometida, você sente na pele: trancos, barulhos e direção instável. Na APARBS, cuidamos de cada componente com precisão.',
    whatIs: 'É o sistema que absorve impactos do solo, mantém as rodas no chão e garante estabilidade. Inclui amortecedores, molas, bandejas, buchas e outros componentes.',
    whatInvolves: [
      'Diagnóstico completo da suspensão',
      'Troca de amortecedores',
      'Substituição de buchas e pivôs',
      'Troca de bandejas e terminais',
      'Verificação de molas e barra estabilizadora'
    ],
    whyDo: [
      'Aumenta o conforto na direção',
      'Melhora a estabilidade em curvas',
      'Previne desgaste irregular dos pneus',
      'Garante segurança de motorista e passageiros',
      'Evita danos em outros componentes'
    ],
    whenToDo: 'Se o carro está quicando demais, fazendo barulho ao passar em lombadas, ou a direção está instável, procure a APARBS. Também recomendamos revisão periódica a cada 40.000 km.',
    howWeDo: 'Primeiro, fazemos um teste de estrada e inspeção visual. Depois, elevamos o veículo e verificamos cada componente. Substituímos apenas o que está comprometido, usando peças de qualidade e originais quando possível.',
    whyChooseUs: 'Temos experiência e equipamentos adequados. Não fazemos reparos desnecessários. Se está bom, a gente fala. Nossa prioridade é sua segurança.',
    faqs: [
      {
        question: 'Como sei se minha suspensão está ruim?',
        answer: 'Barulhos ao passar em lombadas, carro quicando demais, direção instável e desgaste irregular dos pneus são sinais clássicos.'
      },
      {
        question: 'Quanto tempo dura o reparo?',
        answer: 'Depende do que precisa ser trocado. Em média, de 2 a 4 horas.'
      },
      {
        question: 'Posso continuar dirigindo com a suspensão ruim?',
        answer: 'Não é recomendado. Além de desconforto, compromete a segurança e pode danificar outros componentes.'
      }
    ],
    relatedServices: ['3', '5']
  },
  {
    id: '5',
    name: 'Freios',
    slug: 'freios',
    shortDescription: 'Segurança em primeiro lugar, sempre',
    icon: 'AlertTriangle',
    category: 'freios',
    metaTitle: 'Manutenção de Freios Automotivos em Porteirinha/MG - APARBS',
    metaDescription: 'Revisão e reparo de freios em Porteirinha. Pastilhas, discos, fluido e mais. Segurança garantida na APARBS.',
    introduction: 'Freio é segurança. Não tem negociação. Quando você pisa no freio, espera que o carro pare. Na APARBS, tratamos o sistema de freios com a seriedade que ele merece.',
    whatIs: 'É o sistema responsável por desacelerar e parar o veículo. Inclui pastilhas, discos, pinças, cilindros, fluido e tubulações.',
    whatInvolves: [
      'Troca de pastilhas de freio',
      'Substituição de discos',
      'Revisão de pinças e cilindros',
      'Troca do fluido de freio',
      'Sangria do sistema',
      'Verificação de tubulações e mangueiras'
    ],
    whyDo: [
      'Garante frenagem segura e eficiente',
      'Previne acidentes',
      'Evita danos maiores no sistema',
      'Mantém a dirigibilidade',
      'Reduz distância de frenagem'
    ],
    whenToDo: 'Se o pedal está macio, barulho ao frear, vibração no volante, ou a luz de freio acesa, venha imediatamente. Também recomendamos revisão a cada 20.000 km.',
    howWeDo: 'Inspecionamos visualmente e medimos a espessura das pastilhas e discos. Testamos o fluido e verificamos vazamentos. Substituímos o que está fora das especificações e fazemos testes rigorosos antes de devolver o veículo.',
    whyChooseUs: 'Usamos peças de qualidade reconhecida. Não cortamos caminho quando se trata de segurança. Cada serviço é testado e aprovado antes de você sair daqui.',
    faqs: [
      {
        question: 'Como sei que preciso trocar as pastilhas?',
        answer: 'Barulho metálico ao frear, pedal mais fundo, ou luz de freio acesa são sinais claros.'
      },
      {
        question: 'Quanto tempo dura o serviço?',
        answer: 'Troca de pastilhas leva cerca de 1 hora. Se precisar trocar discos, pode levar até 2 horas.'
      },
      {
        question: 'Vocês usam peças originais?',
        answer: 'Usamos peças de qualidade certificada. Se você preferir originais, providenciamos.'
      }
    ],
    relatedServices: ['4', '2']
  },
  {
    id: '6',
    name: 'Ar-Condicionado',
    slug: 'ar-condicionado',
    shortDescription: 'Conforto térmico em qualquer estação',
    icon: 'Wind',
    category: 'ar',
    metaTitle: 'Manutenção de Ar-Condicionado Automotivo em Porteirinha/MG - APARBS',
    metaDescription: 'Recarga, limpeza e reparo de ar-condicionado automotivo em Porteirinha. Conforto garantido na APARBS.',
    introduction: 'Ar-condicionado não é luxo, é conforto e saúde. Quando ele para de gelar ou tem cheiro ruim, afeta sua experiência na estrada. Na APARBS, devolvemos o frescor ao seu carro.',
    whatIs: 'É o sistema que controla a temperatura e qualidade do ar dentro do veículo. Inclui compressor, condensador, evaporador, filtros e gás refrigerante.',
    whatInvolves: [
      'Diagnóstico do sistema',
      'Recarga de gás refrigerante',
      'Troca do filtro de cabine',
      'Limpeza do evaporador',
      'Reparo de compressor e condensador',
      'Verificação de vazamentos'
    ],
    whyDo: [
      'Melhora o conforto térmico',
      'Elimina odores desagradáveis',
      'Previne problemas respiratórios',
      'Aumenta a eficiência do sistema',
      'Evita reparos caros no futuro'
    ],
    whenToDo: 'Se o ar não está gelando, tem cheiro ruim, ou faz barulho estranho, procure a APARBS. Recomendamos manutenção preventiva anualmente.',
    howWeDo: 'Fazemos um diagnóstico completo com equipamentos específicos. Verificamos o nível de gás, testamos o compressor e inspecionamos vazamentos. Depois, realizamos o serviço necessário e testamos até garantir que está gelando perfeitamente.',
    whyChooseUs: 'Temos equipamentos modernos e técnicos treinados. Não fazemos apenas recarga: investigamos a causa e resolvemos de vez.',
    faqs: [
      {
        question: 'Por que meu ar não gela mais?',
        answer: 'Pode ser falta de gás, vazamento, compressor com problema ou filtro sujo. Fazemos o diagnóstico completo.'
      },
      {
        question: 'Quanto tempo dura uma recarga?',
        answer: 'Se não houver vazamento, pode durar anos. Se houver, precisamos consertar primeiro.'
      },
      {
        question: 'O cheiro ruim é normal?',
        answer: 'Não. Geralmente é acúmulo de bactérias no evaporador. Fazemos a limpeza e eliminamos o problema.'
      }
    ],
    relatedServices: ['2']
  },
  {
    id: '7',
    name: 'Diagnóstico Eletrônico',
    slug: 'diagnostico-eletronico',
    shortDescription: 'Identificação precisa de problemas em minutos',
    icon: 'Laptop',
    category: 'diagnostico',
    metaTitle: 'Diagnóstico Eletrônico Automotivo em Porteirinha/MG - APARBS',
    metaDescription: 'Scanner automotivo e diagnóstico eletrônico em Porteirinha. Tecnologia avançada, soluções rápidas. APARBS.',
    introduction: 'Luz do motor acesa? Carro falhando? O diagnóstico eletrônico é o primeiro passo para resolver o problema. Na APARBS, usamos scanners de última geração para identificar falhas com precisão.',
    whatIs: 'É a leitura computadorizada dos sistemas eletrônicos do veículo. Identifica falhas em motor, transmissão, ABS, airbag e outros módulos.',
    whatInvolves: [
      'Conexão do scanner ao sistema do veículo',
      'Leitura de códigos de erro',
      'Análise dos dados em tempo real',
      'Interpretação técnica das falhas',
      'Testes de componentes específicos'
    ],
    whyDo: [
      'Identifica problemas ocultos',
      'Economiza tempo no reparo',
      'Evita troca de peças desnecessárias',
      'Previne danos maiores',
      'Garante precisão no diagnóstico'
    ],
    whenToDo: 'Sempre que a luz do motor acender, o carro apresentar falhas, ou antes de fazer reparos complexos. Também recomendamos como parte da revisão preventiva.',
    howWeDo: 'Conectamos o scanner ao sistema do veículo e realizamos a leitura completa. Interpretamos os códigos de erro e fazemos testes adicionais quando necessário. Depois, explicamos o problema e a solução de forma clara e sem jargão técnico.',
    whyChooseUs: 'Temos scanners profissionais e técnicos experientes. Não adivinhamos: diagnosticamos com precisão. E o melhor: explicamos tudo em linguagem simples.',
    faqs: [
      {
        question: 'Quanto custa o diagnóstico?',
        answer: 'Entre em contato para valores. Se você fechar o reparo conosco, muitas vezes o diagnóstico é cortesia.'
      },
      {
        question: 'Quanto tempo leva?',
        answer: 'Em média 30 minutos, dependendo da complexidade do problema.'
      },
      {
        question: 'Vocês atendem todas as marcas?',
        answer: 'Sim! Nossos scanners são multimarcas e atendem praticamente todos os modelos.'
      }
    ],
    relatedServices: ['2', '8']
  },
  {
    id: '8',
    name: 'Sistema Elétrico',
    slug: 'sistema-eletrico',
    shortDescription: 'Bateria, alternador e toda elétrica funcionando',
    icon: 'Zap',
    category: 'eletrica',
    metaTitle: 'Manutenção de Sistema Elétrico Automotivo em Porteirinha/MG - APARBS',
    metaDescription: 'Reparo elétrico automotivo em Porteirinha. Bateria, alternador, chicotes e mais. Soluções na APARBS.',
    introduction: 'Problemas elétricos podem ser frustrantes. Carro não liga, luzes fracas, ou componentes parando de funcionar. Na APARBS, temos experiência para resolver desde o mais simples até o mais complexo.',
    whatIs: 'É o sistema responsável por fornecer energia para todos os componentes do veículo. Inclui bateria, alternador, motor de arranque, fusíveis e chicotes.',
    whatInvolves: [
      'Teste de bateria e alternador',
      'Troca de bateria',
      'Reparo de alternador e motor de arranque',
      'Verificação de chicotes e conexões',
      'Substituição de fusíveis',
      'Instalação de acessórios elétricos'
    ],
    whyDo: [
      'Evita panes elétricas',
      'Garante partida confiável',
      'Mantém componentes funcionando',
      'Previne danos em equipamentos eletrônicos',
      'Aumenta a segurança'
    ],
    whenToDo: 'Se o carro não liga, bateria descarrega rápido, luzes fracas, ou componentes elétricos falhando, venha à APARBS. Também teste a bateria antes de viagens longas.',
    howWeDo: 'Testamos a bateria, alternador e sistema de carga com equipamentos específicos. Verificamos conexões, fusíveis e chicotes. Se necessário, substituímos componentes e fazemos testes rigorosos antes da entrega.',
    whyChooseUs: 'Temos equipamentos de teste profissionais e experiência em elétrica automotiva. Não chutamos: testamos e resolvemos.',
    faqs: [
      {
        question: 'Quanto tempo dura uma bateria?',
        answer: 'Em média 2 a 3 anos, dependendo do uso e qualidade.'
      },
      {
        question: 'Como sei se o problema é bateria ou alternador?',
        answer: 'Fazemos testes para identificar exatamente onde está o problema.'
      },
      {
        question: 'Vocês instalam som e acessórios?',
        answer: 'Sim! Instalamos diversos acessórios elétricos com segurança.'
      }
    ],
    relatedServices: ['7', '2']
  },
  {
    id: '9',
    name: 'Injeção Eletrônica',
    slug: 'injecao-eletronica',
    shortDescription: 'Motor funcionando com máxima eficiência',
    icon: 'Cpu',
    category: 'motor',
    metaTitle: 'Manutenção de Injeção Eletrônica em Porteirinha/MG - APARBS',
    metaDescription: 'Reparo e limpeza de injeção eletrônica em Porteirinha. Diagnóstico preciso, eficiência garantida. APARBS.',
    introduction: 'A injeção eletrônica é o cérebro do motor. Quando ela não funciona bem, o carro falha, gasta mais combustível e perde potência. Na APARBS, temos a expertise para resolver.',
    whatIs: 'É o sistema que controla a mistura ar-combustível e o funcionamento do motor. Inclui bicos injetores, bomba, sensores e módulo de controle.',
    whatInvolves: [
      'Diagnóstico do sistema de injeção',
      'Limpeza de bicos injetores',
      'Teste de bomba de combustível',
      'Verificação de sensores',
      'Reparo do módulo de injeção',
      'Limpeza do corpo de borboleta'
    ],
    whyDo: [
      'Melhora a potência do motor',
      'Reduz consumo de combustível',
      'Diminui emissões poluentes',
      'Suaviza o funcionamento',
      'Previne falhas no motor'
    ],
    whenToDo: 'Se o carro está falhando, gastando muito combustível, com marcha lenta irregular, ou dificuldade para ligar, procure a APARBS.',
    howWeDo: 'Fazemos diagnóstico eletrônico para identificar falhas. Testamos cada componente individualmente. Realizamos limpezas profundas quando necessário e substituímos peças defeituosas. Depois, calibramos e testamos até garantir o perfeito funcionamento.',
    whyChooseUs: 'Temos equipamentos específicos para injeção eletrônica e técnicos especializados. Não fazemos gambiarras: resolvemos de forma profissional.',
    faqs: [
      {
        question: 'Como sei se preciso limpar os bicos?',
        answer: 'Falhas no motor, consumo alto, ou perda de potência são sinais comuns.'
      },
      {
        question: 'Quanto tempo dura o serviço?',
        answer: 'Depende do que precisa ser feito. Limpeza de bicos leva cerca de 2 horas.'
      },
      {
        question: 'Posso usar qualquer combustível?',
        answer: 'Use sempre combustível de qualidade. Postos duvidosos podem sujar e danificar o sistema.'
      }
    ],
    relatedServices: ['7', '1']
  },
  {
    id: '10',
    name: 'Troca de Pneus',
    slug: 'troca-de-pneus',
    shortDescription: 'Pneus novos, aderência e segurança renovadas',
    icon: 'CircleDot',
    category: 'pneus',
    metaTitle: 'Troca de Pneus em Porteirinha/MG - APARBS',
    metaDescription: 'Venda e instalação de pneus em Porteirinha. Marcas de qualidade, preços justos. Agende na APARBS.',
    introduction: 'Pneus são o único ponto de contato do carro com o chão. Quando eles estão gastos, sua segurança está em risco. Na APARBS, oferecemos pneus de qualidade e instalação profissional.',
    whatIs: 'É a substituição de pneus gastos ou danificados por novos, garantindo aderência, frenagem e segurança.',
    whatInvolves: [
      'Análise do desgaste atual',
      'Recomendação do pneu adequado',
      'Montagem e desmontagem',
      'Balanceamento',
      'Calibragem correta',
      'Descarte ecológico dos pneus velhos'
    ],
    whyDo: [
      'Garante segurança em frenagens e curvas',
      'Melhora a aderência em piso molhado',
      'Reduz risco de aquaplanagem',
      'Aumenta a eficiência de combustível',
      'Previne estouros e acidentes'
    ],
    whenToDo: 'Quando a banda de rodagem estiver no limite (1,6mm), pneus com bolhas, cortes ou deformações, ou a cada 40.000 km em média.',
    howWeDo: 'Avaliamos o estado dos pneus atuais e recomendamos a melhor opção dentro do seu orçamento. Realizamos a troca com equipamentos modernos, fazemos o balanceamento e calibramos na pressão ideal.',
    whyChooseUs: 'Trabalhamos com marcas reconhecidas e preços justos. Além disso, a instalação é feita com cuidado e profissionalismo.',
    faqs: [
      {
        question: 'Como sei quando trocar os pneus?',
        answer: 'Quando a banda de rodagem estiver rasa, ou se houver danos visíveis como cortes e bolhas.'
      },
      {
        question: 'Posso trocar só dois pneus?',
        answer: 'Sim, mas recomendamos colocar os novos no eixo traseiro para maior segurança.'
      },
      {
        question: 'Vocês fazem a calibragem?',
        answer: 'Sim! Sempre calibramos na pressão recomendada após a instalação.'
      }
    ],
    relatedServices: ['3']
  }
];

export const getServiceBySlug = (slug: string): Service | undefined => {
  return mockServices.find(service => service.slug === slug);
};

export const getRelatedServices = (serviceId: string): Service[] => {
  const service = mockServices.find(s => s.id === serviceId);
  if (!service) return [];

  return service.relatedServices
    .map(id => mockServices.find(s => s.id === id))
    .filter((s): s is Service => s !== undefined);
};
