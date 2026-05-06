export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  options: string[];
  featured?: boolean;
};

export const products: Product[] = [
  // 🧉 MATES
  {
    id: 1,
    name: "Mate Camionero Cincelado",
    category: "Mates",
    price: 23000,
    image: "/images/mates/camionero-repujado.png",
    options: ["Repujado", "Marron/Negro"],
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
    price: 30000,
    image: "/images/mates/imperial-cincelado.png",
    options: ["Marron/Negro", "Cincelado", "Alpaca y Acero"],
    featured: true,
  },
  {
    id: 4,
    name: "Mate Torpedo Cincelado",
    category: "Mates",
    price: 34000,
    image: "/images/mates/torpedo-cincelado.png",
    options: ["Alpaca", "Cincelado", "Negro"],
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

  // 🧉 BOMBILLAS
  {
    id: 7,
    name: "Bombilla Pico Loro",
    category: "Bombillas",
    price: 5000,
    image: "/images/bombillas/b-alpaca-acero.png",
    options: ["Larga/Corta", "Alpaca y Acero"],
  },

  // 🎒 MATERAS
  {
    id: 8,
    name: "Matera de Mano Eco",
    category: "Materas",
    price: 14000,
    image: "/images/materas/cuadrada-simil.png",
    options: ["Simil Cuero"],
  },
  {
    id: 9,
    name: "Porta Mate Auto",
    category: "Materas",
    price: 15000,
    image: "/images/materas/porta-mate-cuero.png",
    options: ["100% Cuero", "Negro/Marron"],
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
    price: 21000,
    image: "/images/vasos/vaso-cafe.png",
    options: ["Negro/Blanco"],
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
];