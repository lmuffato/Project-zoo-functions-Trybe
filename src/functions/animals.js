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

const get = {
  locations: ['NE', 'NW', 'SE', 'SW'],
  all: {
    location() {
      const { locations } = get;
      let locationsAndItsAnimals = {};
      locations.forEach((location) => {
        let animals = data.animals.filter((animal) => animal.location === location);
        animals = animals.map((animal) => animal.name);
        locationsAndItsAnimals = { ...locationsAndItsAnimals, [location]: animals };
      });

      return locationsAndItsAnimals;
    },
    locations: {
      locationWithNames(options) {
        const { locations } = get;
        let locationsAndItsAnimals = {};
        locations.forEach((location) => {
          let animals = data.animals.filter((animal) => animal.location === location);
          animals = animals.map((animal) => {
            const speciesName = animal.name;
            const residentNames = animal.residents.map((resident) => resident.name);
            if (options && options.sorted) return { [speciesName]: residentNames.sort() };
            return { [speciesName]: residentNames };
          });
          locationsAndItsAnimals = { ...locationsAndItsAnimals, [location]: animals };
        });
        return locationsAndItsAnimals;
      },
      locationWithNamesBySex(options) {
        const { sex, sorted } = options;

        const { locations } = get;
        let locationsAndItsAnimals = {};
        locations.forEach((location) => {
          let animals = data.animals.filter((animal) => animal.location === location);
          animals = animals.map((animal) => {
            const speciesName = animal.name;
            const residentsBySex = animal.residents.filter((resident) => resident.sex === sex);
            const residentsNames = residentsBySex.map((resident) => resident.name);
            if (sorted) return { [speciesName]: residentsNames.sort() };
            return { [speciesName]: residentsNames };
          });
          locationsAndItsAnimals = { ...locationsAndItsAnimals, [location]: animals };
        });
        return locationsAndItsAnimals;
      },
      includeNames(options) {
        const { sex, sorted } = options;

        if (sex) {
          if (sorted) {
            return get.all.locations.locationWithNamesBySex({ sex, sorted: true });
          }
          return get.all.locations.locationWithNamesBySex({ sex });
        }

        if (sorted) {
          return get.all.locations.locationWithNames({ sorted: true });
        }

        return get.all.locations.locationWithNames();
      },
    },
  },
};

module.exports = {
  find,
  verify,
  count,
  get,
};
