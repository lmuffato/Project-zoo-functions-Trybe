/* eslint-disable sonarjs/no-extra-arguments */
/* eslint-disable max-lines-per-function */
/*
eslint no-unused-vars: [
  "error",
  {
    "args": "none",
    "vars": "local",
    "varsIgnorePattern": "data"
  }
]
*/

const { animals, employees, prices, hours } = require('./data');
// const data = require('./data');

function animalsByIds(...ids) {
  const animalsSpecies = ids.map((elem) => animals.find((elem2) => elem === elem2.id));
  return animalsSpecies;
}

function animalsOlderThan(animal, age) {
  const animalsAge = animals.filter((elem) => animal === elem.name)
    .some((elem2) => elem2.residents.every((elem3) => elem3.age >= age));
  return animalsAge;
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  return employees.find((elem) =>
    elem.lastName === employeeName || elem.firstName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return {
    ...personalInfo,
    ...associatedWith,
  };
}

function isManager(id) {
  return employees.some((elem) => elem.managers.some((elem2) => elem2 === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
  return employees;
}

function animalCount(species) {
  if (!species) {
    return animals.reduce((acc, elem) => {
      acc[elem.name] = elem.residents.length;
      return acc;
    }, {});
  }
  return animals.find((elem) => elem.name === species).residents.length;
}

function entryCalculator(entrants) {
  if (!entrants || Object.keys(entrants).length === 0) return 0;
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  return Adult * prices.Adult + Child * prices.Child + Senior * prices.Senior;
}

const animalsLocations = (locations) => {
  const obj = {};

  locations.forEach((elem) => {
    const animalFilter = animals
      .filter((elem2) => elem2.location === elem)
      .map((elem3) => elem3.name);
    obj[elem] = animalFilter;
  });

  return obj;
};

const animalsSex = (animal, sex) => {
  const animalFilter = animal.filter((elem) => elem.sex === sex)
    .map((elem2) => elem2.name);
  return animalFilter;
};

const animalsLocationsName = (locations, sorted, sex) => {
  const obj = {};
  locations.forEach((location) => {
    const animalFilter = animals
      .filter((animal) => animal.location === location)
      .map((animal) => {
        const animalsName = animal.name;
        let animalsFiltered = animal.residents;

        if (sex !== undefined) {
          animalsFiltered = animalsSex(animalsFiltered, sex);
        } else {
          animalsFiltered = animalsFiltered.map((animal2) => animal2.name);
        }

        if (sorted) {
          animalsFiltered.sort();
        }

        return { [animalsName]: animalsFiltered };
      });

    obj[location] = animalFilter;
  });

  return obj;
};
function animalMap(options) {
  const locations = ['NE', 'NW', 'SE', 'SW'];

  if (!options) {
    return animalsLocations(locations);
  }
  const { includeNames = false, sorted, sex } = options;

  if (includeNames) {
    return animalsLocationsName(locations, sorted, sex);
  }
  return animalsLocations(locations, sorted, sex);
}

function schedule(dayName) {
  const obj = {};
  Object.keys(hours).forEach((elem) => {
    if (elem !== 'Monday') {
      obj[elem] = `Open from ${hours[elem].open}am until ${hours[elem].close - 12}pm`;
    } else {
      obj[elem] = 'CLOSED';
    }
  });
  if (!dayName) {
    return obj;
  }
  return { [dayName]: obj[dayName] };
}

function oldestFromFirstSpecies(id) {
  const animalCuidado = employees.find((elem) => elem.id === id).responsibleFor[0];
  function animalById(idAnimal) {
    return animals.find((elem) => elem.id === idAnimal).residents.sort((a, b) => b.age - a.age)[0];
  }

  const array = [
    animalById(animalCuidado).name,
    animalById(animalCuidado).sex,
    animalById(animalCuidado).age,
  ];
  return array;
}

function increasePrices(percentage) {
  const increse = (percentage / 100) + 1;
  const adultPrice = Math.round(prices.Adult * increse * 100) / 100;
  const childPrice = Math.round(prices.Child * increse * 100) / 100;
  const seniorPrice = Math.round(prices.Senior * increse * 100) / 100;

  prices.Adult = adultPrice;
  prices.Child = childPrice;
  prices.Senior = seniorPrice;
}

const findRespons = (obj) => {
  const animalsResp = obj.responsibleFor.map((elem) => animals
    .filter((elem2) => elem === elem2.id)[0].name);
  return animalsResp;
};

const createObj = () => ({
  'Nigel Nelson': ['lions', 'tigers'],
  'Burl Bethea': ['lions', 'tigers', 'bears', 'penguins'],
  'Ola Orloff': ['otters', 'frogs', 'snakes', 'elephants'],
  'Wilburn Wishart': ['snakes', 'elephants'],
  'Stephanie Strauss': ['giraffes', 'otters'],
  'Sharonda Spry': ['otters', 'frogs'],
  'Ardith Azevado': ['tigers', 'bears'],
  'Emery Elser': ['elephants', 'bears', 'lions'],
});

function employeeCoverage(idOrName) {
  if (!idOrName) {
    return createObj();
  }
  const obj = employees.find((elem) => idOrName === elem.id
  || idOrName === elem.firstName || idOrName === elem.lastName);
  const responsible = findRespons(obj);
  const obj2 = {
    [`${obj.firstName} ${obj.lastName}`]: responsible,
  };
  return obj2;
}

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  animalMap,
  animalsByIds,
  employeeByName,
  employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  oldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
