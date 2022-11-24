export const subscriptionGuideImages = [
  {
    id: 1,
    url: 'https://rotery-filestore.nyc3.digitaloceanspaces.com/guides-host-subscription-statuses.webp',
    withInfo: true,
    title: 'Status da assinatura',
    message:
      'Você pode acompanhar os status da sua assinatura aqui, cada um deles libera uma acão.',
    isAnimation: false,
  },
  {
    id: 2,
    url: 'https://rotery-filestore.nyc3.digitaloceanspaces.com/guides-host-subscription-pending.webp',
    withInfo: true,
    title: 'Status pendente',
    message:
      'Aqui você precisa aguardar o processamento do pagamento para liberar sua assinatura.',
    isAnimation: false,
  },
  {
    id: 3,
    url: 'https://rotery-filestore.nyc3.digitaloceanspaces.com/guides-host-subscription-cancel.webp',
    withInfo: true,
    title: 'Status ativo',
    message:
      'Neste caso, esta tudo certo, mas você pode solicitar o cancelamento da assinatura.',
    isAnimation: false,
  },
  {
    id: 4,
    url: 'https://rotery-filestore.nyc3.digitaloceanspaces.com/guides-host-subscription-alter-card.webp',
    withInfo: true,
    title: 'Status sem pagamento',
    message:
      'Aqui você vai poder trocar o seu cartão caso haja algo de errado com a cobrança.',
    isAnimation: false,
  },
];

export const sexOptions = [
  {
    name: 'Masculino',
    value: 'male',
  },
  {
    name: 'Feminino',
    value: 'female',
  },
  {
    name: 'Outro',
    value: 'other',
  },
];

export const feedGuideImages = [
  {
    id: 1,
    url: 'https://rotery-filestore.nyc3.digitaloceanspaces.com/guides-profile.png',
    withInfo: true,
    title: 'Complete seu perfil',
    message:
      'Adicione foto e seus dados para uma melhor experiência na comunidade.',
    isAnimation: false,
  },
  {
    id: 2,
    url: 'https://rotery-filestore.nyc3.digitaloceanspaces.com/guides-filter1.png',
    withInfo: true,
    title: 'Filtrando Roteiros 1/2',
    message: 'Clique no ícone de filtro para customizar o filtro de roteiros.',
    isAnimation: false,
  },
  {
    id: 3,
    url: 'https://rotery-filestore.nyc3.digitaloceanspaces.com/guides-filter2.png',
    withInfo: true,
    title: 'Filtrando Roteiros 2/2',
    message:
      'Customize o filtro com base nas suas necessidades e clique em "filtrar".',
    isAnimation: false,
  },
  {
    id: 4,
    url: 'https://rotery-filestore.nyc3.digitaloceanspaces.com/guides-filter1.png',
    withInfo: true,
    title: 'Limpando filtro',
    message: 'Clique e segure no botão de filtro até o dispositivo vibrar.',
    isAnimation: false,
  },
  {
    id: 5,
    url: 'https://rotery-filestore.nyc3.digitaloceanspaces.com/guides-reload-feed.png',
    withInfo: true,
    title: 'Carregando novos roteiros',
    message: 'Deslize os dedos para baixo para atualizar feed.',
    isAnimation: false,
  },
  {
    id: 6,
    url: 'https://rotery-filestore.nyc3.digitaloceanspaces.com/guides-new-itinerary.png',
    withInfo: true,
    title: 'Criando novo roteiro',
    message: 'Clique no ícone de "mais" para criar um novo roteiro.',
    isAnimation: false,
  },
];

export const newGuideImages = [
  {
    id: 1,
    url: 'https://rotery-filestore.nyc3.digitaloceanspaces.com/guides-new-itinerary-pt1.png',
    withInfo: true,
    title: 'Criando Roteiros 1/4',
    message:
      'Você pode criar um roteiro privado ou público, adicionar fotos, descrição, quantidade de vagas, dar um nome, datas e muito mais.',
    isAnimation: false,
  },
  {
    id: 2,
    url: 'https://rotery-filestore.nyc3.digitaloceanspaces.com/guides-new-itinerary-pt2.png',
    withInfo: true,
    title: 'Criando Roteiros 2/4',
    message:
      'Para dicionar uma Atividade, Hospedagem ou Transporte você deve clicar no "mais" após preencher os dados.',
    isAnimation: false,
  },
  {
    id: 3,
    url: 'https://rotery-filestore.nyc3.digitaloceanspaces.com/guides-new-itinerary-pt4.png',
    withInfo: true,
    title: 'Criando Roteiros 3/4',
    message: 'Após isso você vai notar que um item será adicionado logo acima.',
    isAnimation: false,
  },
  {
    id: 4,
    url: 'https://rotery-filestore.nyc3.digitaloceanspaces.com/guides-new-itinerary-pt4.png',
    withInfo: true,
    title: 'Criando Roteiros 4/4',
    message: 'Você pode remove-lo clicando no ícone de lixeira.',
    isAnimation: false,
  },
];

export const myGuideImages = [
  {
    id: 1,
    url: 'https://rotery-filestore.nyc3.digitaloceanspaces.com/guides-edit-itinerary1.png',
    withInfo: true,
    title: 'Editando Roteiro',
    message: 'Clique no ícone de lápis para editar informações do seu roteiro.',
    isAnimation: false,
  },
  {
    id: 2,
    url: 'https://rotery-filestore.nyc3.digitaloceanspaces.com/guides-finish-itinerary1.png',
    withInfo: true,
    title: 'Finalizando Roteiros',
    message:
      'Após o término do seu roteiro clique em finalizar para que os membros avaliem.',
    isAnimation: false,
  },
];

export const ItineraryStatusConst = {
  ACTIVE: 'active',
  ON_GOING: 'on_going',
  FINISHED: 'finished',
  CANCELLED: 'cancelled',
};

export const AccountOptions = [
  {value: 'conta_corrente', name: 'Conta Corrente'},
  {value: 'conta_poupanca', name: 'Conta Poupança'},
  {value: 'conta_mei', name: 'Conta MEI'},
];

export const bankList = [
  {
    name: 'ITAÚ UNIBANCO S.A.',
    value: '341',
  },
  {
    name: 'BANCO BRADESCO S.A.',
    value: '237',
  },
  {
    name: 'BANCO INTER',
    value: '077',
  },
  {
    name: 'BANCO DO BRASIL S.A.',
    value: '001',
  },
  {
    name: 'NU PAGAMENTOS - IP',
    value: '260',
  },
  {
    name: 'CAIXA ECONOMICA FEDERAL',
    value: '104',
  },
  {name: 'MERCADO PAGO', value: '323'},
  {
    name: 'BANCO SANTANDER (BRASIL) S.A.',
    value: '033',
  },
  {
    name: 'BANCO NEON',
    value: '735',
  },
  {
    name: 'BANCO C6',
    value: '336',
  },
];
