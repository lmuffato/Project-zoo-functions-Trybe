const data = require('../data');

const find = {
  byId: {
    oneId(id) {
      return data.animals.find((animal) => animal.id === id);
    },
    multipleIds(ids) {
      const species = [];

      ids.forEach((id) => {
        species.push(data.animals.find((animal) => animal.id === id));
      });

      return species;
    },
  },
  byName: {
    oneSpecies(name) {
      return data.animals.find((species) => species.name === name);
    },
  },
};

const verify = {
  age: {
    minimumAge(animal, age) {
      const foundSpecies = data.animals.find((species) => species.name === animal);
      return foundSpecies.residents.every((resident) => resident.age >= age);
    },
  },
};

const count = {
  oneSpecies: {
    residents(species) {
      const foundAnimal = find.byName.oneSpecies(species);
      const numberOfResidents = foundAnimal.residents.length;
      return numberOfResidents;
    },
  },

  allSpecies: {
    residents() {
      const { animals } = data;

      let countOfAllAnimals = {};

      animals.forEach((animal) => {
        const { name, residents } = animal;
        countOfAllAnimals = {
          ...countOfAllAnimals,
          [name]: residents.length,
        };
      });

      return countOfAllAnimals;
    },
  },
};

module.exports = {
  find,
  verify,
  count,
};
