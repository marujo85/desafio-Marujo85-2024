export const BIOMAS = {
  SAVANA: "Savana",
  FLORESTA: "Floresta",
  RIO: "Rio",
};

export const ANIMAIS = {
  LEAO: "LEAO",
  LEOPARDO: "LEOPARDO",
  CROCODILO: "CROCODILO",
  MACACO: "MACACO",
  GAZELA: "GAZELA",
  HIPOPOTAMO: "HIPOPOTAMO",
};

export const animais = [
  {
    especie: ANIMAIS.LEAO,
    tamanho: 3,
    bioma: [BIOMAS.SAVANA],
    carnivoro: true,
  },
  {
    especie: ANIMAIS.LEOPARDO,
    tamanho: 2,
    bioma: [BIOMAS.SAVANA],
    carnivoro: true,
  },
  {
    especie: ANIMAIS.CROCODILO,
    tamanho: 3,
    bioma: [BIOMAS.RIO],
    carnivoro: true,
  },
  {
    especie: ANIMAIS.MACACO,
    tamanho: 1,
    bioma: [BIOMAS.SAVANA, BIOMAS.FLORESTA],
    carnivoro: false,
  },
  {
    especie: ANIMAIS.GAZELA,
    tamanho: 2,
    bioma: [BIOMAS.SAVANA],
    carnivoro: false,
  },
  {
    especie: ANIMAIS.HIPOPOTAMO,
    tamanho: 4,
    bioma: [BIOMAS.SAVANA, BIOMAS.RIO],
    carnivoro: false,
  },
];
