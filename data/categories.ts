export const categories = [
  "MUNDIALERA",
  "Mates",
  "Bombillas",
  "Materas",
  "Vasos",
  "Termos",
  "Yerberas",
  "Accesorios",
] as const;

export type Category = (typeof categories)[number];