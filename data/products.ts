export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  options: string[];
  featured?: boolean;
  outOfStock?: boolean;
  discount?: number; // porcentaje
  sale?: boolean; 
};

export const products: Product[] = [
  // 🧉 MATES
  {
    id: 1,
    name: "Mate Camionero Cincelado",
    category: "Mates",
    price: 25000,
    image: "/images/mates/camionero-repujado.png",
    options: ["Repujado", "Marron/Negro"],
    discount: 20,
  },
  {
    id: 2,
    name: "Mate Imperial",
    category: "Mates",
    price: 28000,
    image: "/images/mates/imperial-alpaca-acero.png",
    options: ["Alpaca y Acero", "Marron/Negro"],
    featured: true,
  },
  {
    id: 3,
    name: "Mate Imperial Cincelado",
    category: "Mates",
    price: 34000,
    image: "/images/mates/imperial-cincelado.png",
    options: ["Marron/Negro", "Cincelado", "Alpaca y Acero"],
    featured: true,
  },
  {
    id: 4,
    name: "Mate Torpedo Cincelado",
    category: "Mates",
    price: 38000,
    image: "/images/mates/torpedo-cincelado.png",
    options: ["Alpaca", "Cincelado", "Negro"],
    discount: 15,
    sale: true,
  },
  {
    id: 5,
    name: "Mate Imperial Alpaca",
    category: "Mates",
    price: 30000,
    image: "/images/mates/imperial-alpaca.png",
    options: ["Alpaca", "Marron/Negro"],
  },
  {
    id: 6,
    name: "Mate Camionero",
    category: "Mates",
    price: 19000,
    image: "/images/mates/camionero.png",
    options: ["Acero", "Negro/Marron"],
    featured: true,
  },
  {
    id: 13,
    name: "Mate Vaqueta",
    category: "Mates",
    price: 17000,
    image: "/images/mates/vaqueta.png",
    options: ["Cuero y Acero"],
    discount: 20,
    sale: true,
  },
  {
    id: 14,
    name: "Mate Criollo Virola",
    category: "Mates",
    price: 16000,
    image: "/images/mates/criollo-virola.png",
    options: ["Virola y Base"],
    sale: true,
    discount: 20,
  },
  {
    id: 15,
    name: "Mate Criollo Cuero Crudo",
    category: "Mates",
    price: 14000,
    image: "/images/mates/criollo-crudo.png",
    options: ["Cuero Crudo"],
  },
  {
    id: 16,
    name: "Mate Algarrobo Camionero",
    category: "Mates",
    price: 13000,
    image: "/images/mates/algarrobo-camionero.png",
    options: ["Algarrobo"],
  },
  {
    id: 17,
    name: "Mate Algarrobo Alpaca",
    category: "Mates",
    price: 24000,
    image: "/images/mates/algarrobo-alpaca.png",
    options: ["Alpaca y Acero"],
    sale: true,
    discount: 13,
  },
  {
    id: 18,
    name: "Mate Imperial Liso",
    category: "Mates",
    price: 24000,
    image: "/images/mates/imperial-liso.png",
    options: ["Liso con Aplique"],
  },
  {
    id: 19,
    name: "Mate Imperial Premium",
    category: "Mates",
    price: 45000,
    image: "/images/mates/imperial-premium.png",
    options: ["Alpaca Base Bolita"],
    featured: true,
    sale: true,
    discount: 10,
  },
  {
    id: 20,
    name: "Mate Algarrobo Cruz",
    category: "Mates",
    price: 36000,
    image: "/images/mates/algarrobo-cruz.png",
    options: ["Artesanal"],
  },
  {
    id: 21,
    name: "Mate Porito",
    category: "Mates",
    price: 15000,
    image: "/images/mates/porito.png",
    options: ["Clásico"],
    outOfStock: true,
  },

  // 🧉 BOMBILLAS
  {
    id: 7,
    name: "Bombilla Pico Loro",
    category: "Bombillas",
    price: 5000,
    image: "/images/bombillas/b-alpaca-acero.png",
    options: ["Larga/Corta", "Alpaca y Acero"],
  },
  {
    id: 22,
    name: "Bombilla Chata",
    category: "Bombillas",
    price: 3000,
    image: "/images/bombillas/chata.png",
    options: ["Acero"],
  },
  {
    id: 23,
    name: "Bombilla Pico de Loro Bronce",
    category: "Bombillas",
    price: 5000,
    image: "/images/bombillas/pico-loro-bronce.png",
    options: ["Bronce"],
  },

  // 🎒 MATERAS
  {
    id: 9,
    name: "Porta Mate Auto",
    category: "Materas",
    price: 15000,
    image: "/images/materas/porta-mate-cuero.png",
    options: ["100% Cuero", "Negro/Marron"],
    discount: 20,
  },
  {
    id: 24,
    name: "Matera de Mano Cuero Premium",
    category: "Materas",
    price: 60000,
    image: "/images/materas/cuero-premium.png",
    options: ["100% Cuero"],
  },
  {
    id: 25,
    name: "Matera de Mano Reforzada",
    category: "Materas",
    price: 16000,
    image: "/images/materas/simil-reforzada.png",
    options: ["Simil Reforzada"],
  },
  {
    id: 26,
    name: "Matera de Mano Simple",
    category: "Materas",
    price: 14000,
    image: "/images/materas/simil-simple.png",
    options: ["Simil Simple"],
  },
  {
    id: 8,
    name: "Matera de Mano Eco",
    category: "Materas",
    price: 14000,
    image: "/images/materas/cuadrada-simil.png",
    options: ["Simil Cuero"],
    outOfStock: true,
  },

  // 🥤 VASOS
  {
    id: 10,
    name: "Vaso Cervecero",
    category: "Vasos",
    price: 16000,
    image: "/images/vasos/vaso-cervesa.png",
    options: ["Destapador", "Negro"],
  },
  {
    id: 11,
    name: "Vaso Cafetero",
    category: "Vasos",
    price: 24000,
    image: "/images/vasos/vaso-cafe.png",
    options: ["Negro/Blanco"],
    sale: true,
    discount: 15,
  },

  // 🧊 TERMOS
  {
    id: 12,
    name: "Termo Media Manija",
    category: "Termos",
    price: 27000,
    image: "/images/termos/termo-bigstar.png",
    options: ["Negro/Plateado"],
  },

  // 🌿 YERBERAS
  {
    id: 27,
    name: "Yerbera de Cuero",
    category: "Yerberas",
    price: 14000,
    image: "/images/Yerberas/Yerbera-cuero.png",
    options: ["Cuero"],
  },
  {
    id: 28,
    name: "Yerbera Lata",
    category: "Yerberas",
    price: 7000,
    image: "/images/Yerberas/lata.png",
    options: ["Metal"],
  },
  {
    id: 29,
    name: "Yerbera Lata",
    category: "Yerberas",
    price: 8000,
    image: "/images/Yerberas/lata-2.png",
    options: ["Metal"],
    sale: true,
    discount: 11,
  },

  // Accesorios
  {
    id: 27,
    name: "Pava Plegable",
    category: "Accesorios",
    price: 14000,
    image: "/images/Accesorios/pava-plegable.jpeg",
    options: ["Plegable", "Hasta 0.6L"],
  },
  
];