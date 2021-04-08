const data = require('../data');

const functionsAnimalsByIds = {
  findByOne(id) {
    return data.animals.find((animal) => animal.id === id);
  },
  findByMultiple(ids) {
    const species = [];

    ids.forEach((id) => {
      species.push(data.animals.find((animal) => animal.id === id));
    });

    return species;
  },
};

module.exports = functionsAnimalsByIds;
