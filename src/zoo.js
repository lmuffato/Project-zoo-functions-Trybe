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

const data = require('./data');

const findAnimalById = (animalId) => {
  const animal = data.animals.find((dataItem) => dataItem.id === animalId);

  return animal;
};

const findAnimalsById = (animalsIdArray) => {
  const animalsArray = [];

  animalsIdArray.forEach((animalId) => {
    const animal = findAnimalById(animalId);

    animalsArray.push(animal);
  });

  return animalsArray;
};

function animalsByIds(...ids) {
  const animalsIds = ids;

  if (animalsIds.length === 0) {
    return [];
  }

  if (animalsIds.length === 1) {
    const animals = [];
    const animal = findAnimalById(animalsIds[0]);
    animals.push(animal);
    return animals;
  }

  if (animalsIds.length > 1) {
    const animals = findAnimalsById(animalsIds);
    return animals;
  }
}

function animalsOlderThan(animal, age) {
  const specie = data.animals.find((dataItem) => dataItem.name === animal);

  const isMinimalAge = specie.residents.every((resident) => resident.age >= age);

  return isMinimalAge;
}

function employeeByName(employeeName) {
  if (!employeeName) return {};

  const employee = data.employees.find((employeeItem) =>
    employeeItem.firstName === employeeName || employeeItem.lastName === employeeName);

  return employee;
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;

  return {
    id, firstName, lastName, managers, responsibleFor,
  };
}

function isManager(id) {
  const manager = data.employees.find((employee) => employee.id === id);

  if (manager.managers.length < 2) {
    return true;
  }

  return false;
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  const employee = { id, firstName, lastName, managers, responsibleFor };

  data.employees.push(employee);
}

function animalCount(specieName) {
  let animalsSize = 0;

  if (!specieName) {
    const animals = {};
    data.animals.forEach((animal) => {
      animals[animal.name] = animal.residents.length;
    });

    return animals;
  }

  data.animals.forEach((animal) => {
    if (animal.name === specieName) {
      animalsSize = animal.residents.length;
    }
  });

  return animalsSize;
}

const getTotalValue = (totalAdults = 0, totalChilds = 0, totalSenior = 0) => {
  const adultPrize = data.prices.Adult;
  const childsPrize = data.prices.Child;
  const seniorPrize = data.prices.Senior;

  let total = (totalAdults * adultPrize);
  total += (totalChilds * childsPrize);
  total += (totalSenior * seniorPrize);

  return total;
};

function entryCalculator(entrants) {
  if (!entrants) return 0;

  const { Adult = 0, Child = 0, Senior = 0 } = entrants;

  const totalValue = getTotalValue(Adult, Child, Senior);

  return totalValue;
}

const getAnimalsByLocation = (location) => {
  const animals = data.animals.filter((animal) => animal.location === location);

  console.log(animals);

  return animals;
};

function animalMap(options) {
  if (!options) {
    const animalsOrderly = {
      NE: getAnimalsByLocation('NE'),
      NW: getAnimalsByLocation('NW'),
      SE: getAnimalsByLocation('SE'),
      SW: getAnimalsByLocation('SW'),
    };

    return animalsOrderly;
  }
}

// dayName
function schedule() {
  // seu código aqui
}

// id
function oldestFromFirstSpecies() {
  // seu código aqui
}

// percentage
function increasePrices() {
  // seu código aqui
}

// idOrName
function employeeCoverage() {
  // seu código aqui
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
