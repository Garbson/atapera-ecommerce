// config/categories.ts

export interface CategoryConfig {
  slug: string;
  title: string;
  description: string;
  color: string;
  backgroundImage?: string;
  warning?: string;
  warningTitle?: string;
  warningType?: "info" | "danger";
  filters: CategoryFilter[];
  quickCategories?: QuickCategory[];
}

export interface CategoryFilter {
  key: string;
  label: string;
  placeholder?: string;
  options: FilterOption[];
}

export interface FilterOption {
  value: string;
  label: string;
}

export interface QuickCategory {
  id: number;
  name: string;
  icon: string;
  value: string;
}

export const categoriesConfig: Record<string, CategoryConfig> = {
  airsoft: {
    slug: "airsoft",
    title: "Airsoft",
    description:
      "Equipamentos completos para Airsoft! Armas, munições, equipamentos táticos e acessórios para simulação militar e jogos esportivos.",
    color: "green",
    backgroundImage: "/images/airsoftBg.jpg",
    warning:
      "Equipamentos para uso esportivo e simulação. Sempre use equipamentos de proteção adequados.",
    warningTitle: "Atenção",
    warningType: "info",
    filters: [
      {
        key: "subcategory",
        label: "Tipo",
        placeholder: "Todos os Tipos",
        options: [
          { value: "rifles", label: "Rifles Airsoft" },
          { value: "pistolas", label: "Pistolas Airsoft" },
          { value: "shotguns", label: "Shotguns Airsoft" },
          { value: "snipers", label: "Snipers Airsoft" },
          { value: "municoes", label: "Munições BBs" },
          { value: "colete", label: "Coletes Táticos" },
          { value: "mascaras", label: "Máscaras e Óculos" },
          { value: "acessorios", label: "Acessórios" },
        ],
      },
      {
        key: "system",
        label: "Sistema",
        placeholder: "Todos os Sistemas",
        options: [
          { value: "spring", label: "Spring" },
          { value: "eletrico", label: "Elétrico (AEG)" },
          { value: "gas", label: "Gás (GBB)" },
          { value: "co2", label: "CO2" },
        ],
      },
      {
        key: "brand",
        label: "Marca",
        placeholder: "Todas as Marcas",
        options: [
          { value: "cyma", label: "CYMA" },
          { value: "ics", label: "ICS" },
          { value: "aeg", label: "A&K" },
          { value: "we", label: "WE" },
          { value: "kjw", label: "KJW" },
        ],
      },
      {
        key: "fps",
        label: "FPS",
        placeholder: "Todos os FPS",
        options: [
          { value: "0-300", label: "Até 300 FPS" },
          { value: "300-400", label: "300-400 FPS" },
          { value: "400-500", label: "400-500 FPS" },
          { value: "500+", label: "Acima de 500 FPS" },
        ],
      },
    ],
    quickCategories: [
      { id: 1, name: "Rifles", icon: "🔫", value: "rifles" },
      { id: 2, name: "Pistolas", icon: "🔫", value: "pistolas" },
      { id: 3, name: "Munições", icon: "⚫", value: "municoes" },
      { id: 4, name: "Coletes", icon: "🦺", value: "colete" },
      { id: 5, name: "Máscaras", icon: "😷", value: "mascaras" },
      { id: 6, name: "Acessórios", icon: "🔧", value: "acessorios" },
    ],
  },

  "armas-fogo": {
    slug: "armas-fogo",
    title: "Armas de Fogo",
    description:
      "Armas registradas com toda documentação necessária. Segurança e qualidade garantidas para colecionadores, atiradores e caçadores licenciados.",
    color: "red",
    backgroundImage: "/images/revolver.jpg",
    warning:
      "Todos os produtos requerem registro no Exército e documentação válida (CR, CRAF ou Porte).",
    warningTitle: "Importante",
    warningType: "danger",
    filters: [
      {
        key: "subcategory",
        label: "Categoria",
        placeholder: "Todas as Categorias",
        options: [
          { value: "pistolas", label: "Pistolas" },
          { value: "revolveres", label: "Revólveres" },
          { value: "rifles", label: "Rifles" },
          { value: "espingardas", label: "Espingardas" },
          { value: "carabinas", label: "Carabinas" },
        ],
      },
      {
        key: "caliber",
        label: "Calibre",
        placeholder: "Todos os Calibres",
        options: [
          { value: ".22", label: ".22 LR" },
          { value: ".32", label: ".32 ACP" },
          { value: ".38", label: ".38 SPL" },
          { value: ".380", label: ".380 ACP" },
          { value: "9mm", label: "9mm" },
          { value: ".40", label: ".40 S&W" },
          { value: ".45", label: ".45 ACP" },
          { value: ".357", label: ".357 Magnum" },
          { value: "12ga", label: "12 GA" },
          { value: "20ga", label: "20 GA" },
        ],
      },
      {
        key: "brand",
        label: "Marca",
        placeholder: "Todas as Marcas",
        options: [
          { value: "taurus", label: "Taurus" },
          { value: "imbel", label: "IMBEL" },
          { value: "rossi", label: "Rossi" },
          { value: "boito", label: "Boito" },
          { value: "cbc", label: "CBC" },
        ],
      },
    ],
    quickCategories: [
      { id: 1, name: "Pistolas", icon: "🔫", value: "pistolas" },
      { id: 2, name: "Revólveres", icon: "🔫", value: "revolveres" },
      { id: 3, name: "Rifles", icon: "🔫", value: "rifles" },
      { id: 4, name: "Espingardas", icon: "🔫", value: "espingardas" },
      { id: 5, name: "Carabinas", icon: "🔫", value: "carabinas" },
    ],
  },

  "armas-pressao": {
    slug: "armas-pressao",
    title: "Armas de Pressão",
    description:
      "Armas de pressão de alta qualidade para tiro esportivo, treinamento e controle de pragas. Carabinas e pistolas de ar comprimido.",
    color: "blue",
    backgroundImage: "/images/armaDePressaoBg.jpg",
    warning:
      "Produtos para maiores de 18 anos. Uso responsável e com equipamentos de proteção.",
    warningTitle: "Atenção",
    warningType: "info",
    filters: [
      {
        key: "subcategory",
        label: "Tipo",
        placeholder: "Todos os Tipos",
        options: [
          { value: "carabinas", label: "Carabinas de Pressão" },
          { value: "pistolas", label: "Pistolas de Pressão" },
          { value: "co2", label: "Armas CO2" },
          { value: "pcp", label: "Armas PCP" },
          { value: "chumbinhos", label: "Chumbinhos" },
          { value: "acessorios", label: "Acessórios" },
        ],
      },
      {
        key: "caliber",
        label: "Calibre",
        placeholder: "Todos os Calibres",
        options: [
          { value: "4.5mm", label: "4.5mm" },
          { value: "5.5mm", label: "5.5mm" },
          { value: "6.35mm", label: "6.35mm" },
        ],
      },
      {
        key: "brand",
        label: "Marca",
        placeholder: "Todas as Marcas",
        options: [
          { value: "cbc", label: "CBC" },
          { value: "rossi", label: "Rossi" },
          { value: "hatsan", label: "Hatsan" },
          { value: "gamo", label: "Gamo" },
          { value: "crosman", label: "Crosman" },
        ],
      },
    ],
    quickCategories: [
      { id: 1, name: "Carabinas", icon: "🔫", value: "carabinas" },
      { id: 2, name: "Pistolas", icon: "🔫", value: "pistolas" },
      { id: 3, name: "CO2", icon: "💨", value: "co2" },
      { id: 4, name: "PCP", icon: "🔧", value: "pcp" },
      { id: 5, name: "Chumbinhos", icon: "⚫", value: "chumbinhos" },
      { id: 6, name: "Acessórios", icon: "🔧", value: "acessorios" },
    ],
  },

  pesca: {
    slug: "pesca",
    title: "Pesca",
    description:
      "Equipamentos completos para pesca esportiva. Varas, molinetes, iscas, anzóis e todos os acessórios para uma pescaria de sucesso.",
    color: "blue",
    backgroundImage: "/images/pescaBg.jpg",
    filters: [
      {
        key: "subcategory",
        label: "Categoria",
        placeholder: "Todas as Categorias",
        options: [
          { value: "varas", label: "Varas de Pescar" },
          { value: "molinetes", label: "Molinetes" },
          { value: "carretilhas", label: "Carretilhas" },
          { value: "iscas", label: "Iscas" },
          { value: "anzois", label: "Anzóis" },
          { value: "linhas", label: "Linhas" },
          { value: "acessorios", label: "Acessórios" },
        ],
      },
      {
        key: "fishing_type",
        label: "Tipo de Pesca",
        placeholder: "Todos os Tipos",
        options: [
          { value: "agua-doce", label: "Água Doce" },
          { value: "agua-salgada", label: "Água Salgada" },
          { value: "fly", label: "Fly Fishing" },
          { value: "surf", label: "Surf Casting" },
        ],
      },
      {
        key: "brand",
        label: "Marca",
        placeholder: "Todas as Marcas",
        options: [
          { value: "shimano", label: "Shimano" },
          { value: "daiwa", label: "Daiwa" },
          { value: "saint", label: "Saint" },
          { value: "marine", label: "Marine Sports" },
          { value: "albatroz", label: "Albatroz" },
        ],
      },
    ],
    quickCategories: [
      { id: 1, name: "Varas", icon: "🎣", value: "varas" },
      { id: 2, name: "Molinetes", icon: "⚙️", value: "molinetes" },
      { id: 3, name: "Iscas", icon: "🐠", value: "iscas" },
      { id: 4, name: "Anzóis", icon: "🪝", value: "anzois" },
      { id: 5, name: "Linhas", icon: "🧵", value: "linhas" },
      { id: 6, name: "Acessórios", icon: "🔧", value: "acessorios" },
    ],
  },

  caca: {
    slug: "caca",
    title: "Caça",
    backgroundImage: "/images/cacaBg.webp",
    description:
      "Equipamentos especializados para caça esportiva. Roupas, acessórios, facas e equipamentos para caçadores licenciados.",
    color: "green",
    warning:
      "Equipamentos para caça esportiva licenciada. Respeite as leis ambientais e períodos de defeso.",
    warningTitle: "Importante",
    warningType: "info",
    filters: [
      {
        key: "subcategory",
        label: "Categoria",
        placeholder: "Todas as Categorias",
        options: [
          { value: "roupas", label: "Roupas e Calçados" },
          { value: "facas", label: "Facas e Ferramentas" },
          { value: "mochilas", label: "Mochilas e Equipamentos" },
          { value: "optica", label: "Óptica e Binóculos" },
          { value: "acessorios", label: "Acessórios" },
        ],
      },
      {
        key: "brand",
        label: "Marca",
        placeholder: "Todas as Marcas",
        options: [
          { value: "invictus", label: "Invictus" },
          { value: "coyote", label: "Coyote" },
          { value: "nautika", label: "Nautika" },
          { value: "trilhas", label: "Trilhas & Rumos" },
        ],
      },
    ],
  },

  motores: {
    slug: "motores",
    title: "Motores",
    backgroundImage: "/images/motoSerraBg.jpg",
    description:
      "Motores de popa, estacionários, motobombas e acessórios. Equipamentos completos para embarcações, geradores e bombas d'água.",
    color: "blue",
    filters: [
      {
        key: "subcategory",
        label: "Categoria",
        placeholder: "Todas as Categorias",
        options: [
          { value: "motores-popa", label: "Motores de Popa" },
          { value: "motores-estacionarios", label: "Motores Estacionários" },
          { value: "motobombas", label: "Motobombas" },
          { value: "geradores", label: "Geradores" },
          { value: "pecas", label: "Peças" },
          { value: "acessorios", label: "Acessórios" },
        ],
      },
      {
        key: "brand",
        label: "Marca",
        placeholder: "Todas as Marcas",
        options: [
          { value: "mercury", label: "Mercury" },
          { value: "yamaha", label: "Yamaha" },
          { value: "honda", label: "Honda" },
        ],
      },
    ],
  },

  vestuario: {
    slug: "vestuario",
    title: "Vestuário",
    description:
      "Roupas e acessórios táticos, outdoor e casuais. Camisetas, bonés, patches e muito mais para seu estilo.",
    color: "gray",
    backgroundImage: "/images/roupaBg.jpg",
    filters: [
      {
        key: "subcategory",
        label: "Categoria",
        placeholder: "Todas as Categorias",
        options: [
          { value: "camisetas", label: "Camisetas" },
          { value: "bones", label: "Bonés" },
          { value: "patches", label: "Patches" },
          { value: "taticos", label: "Roupas Táticas" },
          { value: "calcas", label: "Calças" },
          { value: "jaquetas", label: "Jaquetas" },
          { value: "acessorios", label: "Acessórios" },
        ],
      },
      {
        key: "size",
        label: "Tamanho",
        placeholder: "Todos os Tamanhos",
        options: [
          { value: "pp", label: "PP" },
          { value: "p", label: "P" },
          { value: "m", label: "M" },
          { value: "g", label: "G" },
          { value: "gg", label: "GG" },
          { value: "xgg", label: "XGG" },
        ],
      },
      {
        key: "color",
        label: "Cor",
        placeholder: "Todas as Cores",
        options: [
          { value: "preto", label: "Preto" },
          { value: "verde", label: "Verde" },
          { value: "camo", label: "Camuflado" },
          { value: "azul", label: "Azul" },
          { value: "cinza", label: "Cinza" },
        ],
      },
    ],
  },

  camping: {
    slug: "camping",
    title: "Camping",
    description:
      "Equipamentos completos para camping e aventuras outdoor. Barracas, mochilas, lanternas e tudo para sua experiência na natureza.",
    color: "orange",
    backgroundImage: "/images/campingBg.jpg",
    filters: [
      {
        key: "subcategory",
        label: "Categoria",
        placeholder: "Todas as Categorias",
        options: [
          { value: "barracas", label: "Barracas" },
          { value: "mochilas", label: "Mochilas" },
          { value: "sacos-dormir", label: "Sacos de Dormir" },
          { value: "lanternas", label: "Lanternas" },
          { value: "ferramentas", label: "Ferramentas" },
          { value: "cozinha", label: "Cozinha Camping" },
          { value: "acessorios", label: "Acessórios" },
        ],
      },
      {
        key: "season",
        label: "Temporada",
        placeholder: "Todas as Temporadas",
        options: [
          { value: "3-estacoes", label: "3 Estações" },
          { value: "4-estacoes", label: "4 Estações" },
          { value: "verao", label: "Verão" },
          { value: "inverno", label: "Inverno" },
        ],
      },
      {
        key: "brand",
        label: "Marca",
        placeholder: "Todas as Marcas",
        options: [
          { value: "nautika", label: "Nautika" },
          { value: "coleman", label: "Coleman" },
          { value: "trilhas", label: "Trilhas & Rumos" },
          { value: "azteq", label: "Azteq" },
          { value: "campingaz", label: "Campingaz" },
        ],
      },
      {
        key: "capacity",
        label: "Capacidade",
        placeholder: "Todas as Capacidades",
        options: [
          { value: "1-pessoa", label: "1 Pessoa" },
          { value: "2-pessoas", label: "2 Pessoas" },
          { value: "3-4-pessoas", label: "3-4 Pessoas" },
          { value: "5-pessoas", label: "5+ Pessoas" },
        ],
      },
    ],
    quickCategories: [
      { id: 1, name: "Barracas", icon: "⛺", value: "barracas" },
      { id: 2, name: "Mochilas", icon: "🎒", value: "mochilas" },
      { id: 3, name: "Sacos de Dormir", icon: "🛏️", value: "sacos-dormir" },
      { id: 4, name: "Lanternas", icon: "🔦", value: "lanternas" },
      { id: 5, name: "Ferramentas", icon: "🔧", value: "ferramentas" },
      { id: 6, name: "Cozinha", icon: "🍳", value: "cozinha" },
    ],
  },

  ofertas: {
    slug: "ofertas",
    title: "Ofertas Especiais",
    description:
      "Aproveite as melhores ofertas em armas, equipamentos de pesca, caça, airsoft e muito mais. Descontos de até 50% por tempo limitado!",
    color: "orange",
    backgroundImage: "/images/ofertasBg.jpg",
    filters: [
      {
        key: "category",
        label: "Categoria",
        placeholder: "Todas as Categorias",
        options: [
          { value: "airsoft", label: "Airsoft" },
          { value: "armas-fogo", label: "Armas de Fogo" },
          { value: "armas-pressao", label: "Armas de Pressão" },
          { value: "pesca", label: "Pesca" },
          { value: "caca", label: "Caça" },
          { value: "vestuario", label: "Vestuário" },
          { value: "camping", label: "Camping" },
        ],
      },
      {
        key: "discount",
        label: "Desconto",
        placeholder: "Todos os Descontos",
        options: [
          { value: "10-20", label: "10% - 20%" },
          { value: "20-30", label: "20% - 30%" },
          { value: "30-40", label: "30% - 40%" },
          { value: "40+", label: "Acima de 40%" },
        ],
      },
      {
        key: "brand",
        label: "Marca",
        placeholder: "Todas as Marcas",
        options: [
          { value: "taurus", label: "Taurus" },
          { value: "rossi", label: "Rossi" },
          { value: "shimano", label: "Shimano" },
          { value: "cyma", label: "CYMA" },
        ],
      },
    ],
  },
};

export const getCategoryConfig = (slug: string): CategoryConfig | null => {
  return categoriesConfig[slug] || null;
};
