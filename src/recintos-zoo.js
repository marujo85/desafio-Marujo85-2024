import { ANIMAIS, animais, BIOMAS } from "./Animais-e-Biomas";

const recintos = [
  {
    numero: 1,
    bioma: [BIOMAS.SAVANA],
    tamanhoTotal: 10,
    animaisExistentes: [{ nome: ANIMAIS.MACACO, quantidade: 3 }],
  },
  {
    numero: 2,
    bioma: [BIOMAS.FLORESTA],
    tamanhoTotal: 5,
    animaisExistentes: [],
  },
  {
    numero: 3,
    bioma: [BIOMAS.SAVANA, BIOMAS.RIO],
    tamanhoTotal: 7,
    animaisExistentes: [{ nome: ANIMAIS.GAZELA, quantidade: 1 }],
  },
  { numero: 4, bioma: [BIOMAS.RIO], tamanhoTotal: 8, animaisExistentes: [] },
  {
    numero: 5,
    bioma: [BIOMAS.SAVANA],
    tamanhoTotal: 9,
    animaisExistentes: [{ nome: ANIMAIS.LEAO, quantidade: 1 }],
  },
];

function calcularEspacoOcupadoNoRecinto(recinto) {
  return recinto.animaisExistentes.reduce((totalEspaco, animalExistente) => {
    const especieAnimal = animais.find(
      (a) => a.especie === animalExistente.nome
    );
    return especieAnimal
      ? totalEspaco + especieAnimal.tamanho * animalExistente.quantidade
      : totalEspaco;
  }, 0);
}

class RecintosZoo {
  animalValido(animal) {
    return animais.some((a) => a.especie === animal);
  }

  quantidadeAnimalValida(quantidade) {
    return Number.isInteger(quantidade) && quantidade > 0;
  }

  carnivoro(animal) {
    const carnivoros = [ANIMAIS.LEAO, ANIMAIS.LEOPARDO, ANIMAIS.CROCODILO];
    return carnivoros.includes(animal);
  }

  validarBioma(recinto, animal) {
    const especieAnimal = animais.find((a) => a.especie === animal);
    return (
      especieAnimal &&
      recinto.bioma.some((biomaRecinto) =>
        especieAnimal.bioma.includes(biomaRecinto)
      )
    );
  }

  validarRecinto(recinto, novoAnimal, quantidade) {
    const novoEhCarnivoro = this.carnivoro(novoAnimal);
    const carnivoroExistente = recinto.animaisExistentes.some((a) =>
      this.carnivoro(a.nome)
    );
    const herbivoroExistente = recinto.animaisExistentes.some(
      (a) => !this.carnivoro(a.nome)
    );

    if (
      (carnivoroExistente && !novoEhCarnivoro) ||
      (herbivoroExistente && novoEhCarnivoro)
    ) {
      return false;
    }

    if (!this.validarBioma(recinto, novoAnimal)) {
      console.log(
        `Bioma incompatível para ${novoAnimal} no recinto ${recinto.numero}`
      );
      return false;
    }

    const espaçoOcupado = calcularEspacoOcupadoNoRecinto(recinto);
    const especieAnimal = animais.find((a) => a.especie === novoAnimal);
    const espaçoNecessario = especieAnimal.tamanho * quantidade;
    const duasEspeciesNoRecinto =
      recinto.animaisExistentes.length > 0 &&
      !recinto.animaisExistentes.some((a) => a.nome === novoAnimal);
    const espacoExtra = duasEspeciesNoRecinto ? 1 : 0;
    const espaçoLivre =
      recinto.tamanhoTotal - (espaçoOcupado + espaçoNecessario + espacoExtra);

    if (espaçoLivre < 0) {
      console.log(`Espaço insuficiente`);
      return false;
    }
    return espaçoNecessario <= espaçoLivre;
  }

  verificarRecintosViaveis(animal, quantidade) {
    return recintos.filter((recinto) =>
      this.validarRecinto(recinto, animal, quantidade)
    );
  }

  analisaRecintos(animal, quantidade) {
    if (!this.animalValido(animal)) {
      return { erro: "Animal inválido" };
    }

    if (!this.quantidadeAnimalValida(quantidade)) {
      return { erro: "Quantidade inválida" };
    }

    const recintosViaveis = this.verificarRecintosViaveis(animal, quantidade);
    if (recintosViaveis.length === 0) {
      return { erro: "Não há recinto viável" };
    }

    return {
      recintosViaveis: recintosViaveis.map((recinto) => {
        const espaçoOcupado = calcularEspacoOcupadoNoRecinto(recinto);
        const especieAnimal = animais.find((a) => a.especie === animal);
        const espaçoNecessario = especieAnimal.tamanho * quantidade;
        const duasEspeciesNoRecinto =
          recinto.animaisExistentes.length > 0 &&
          !recinto.animaisExistentes.some((a) => a.nome === animal);
        const espacoExtra = duasEspeciesNoRecinto ? 1 : 0;

        const espaçoLivre =
          recinto.tamanhoTotal -
          (espaçoOcupado + espaçoNecessario + espacoExtra);
        return `Recinto ${recinto.numero} (espaço livre: ${espaçoLivre} total: ${recinto.tamanhoTotal})`;
      }),
    };
  }
}

export { RecintosZoo as RecintosZoo };
