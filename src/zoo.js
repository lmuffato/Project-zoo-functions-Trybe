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
  // seu código aqui
}

function isManager(id) {
  // seu código aqui
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
}

function animalCount(species) {
  // seu código aqui
}

function entryCalculator(entrants) {
  // seu código aqui
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // seu código aqui
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
  // seu código aqui
}

function employeeCoverage(idOrName) {
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
