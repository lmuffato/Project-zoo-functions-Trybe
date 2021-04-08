const data = require('../data');

const find = {
  byOneId(id) {
    return data.animals.find((animal) => animal.id === id);
  },
  byMultipleIds(ids) {
    const species = [];

    ids.forEach((id) => {
      species.push(data.animals.find((animal) => animal.id === id));
    });

    return species;
  },
};

const verify = {
  age(animal, age) {
    const foundSpecies = data.animals.find((species) => species.name === animal);
    return foundSpecies.residents.every((resident) => resident.age >= age);
  },
};

module.exports = {
  find,
  verify,
};
