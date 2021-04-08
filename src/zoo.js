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

const { animals, employees } = require('./data');

// Ok
function animalsByIds(...ids) {
  if (!ids) {
    return [];
  }
  const result = animals.filter((animal, index) => animal.id === ids[index]);
  return result;
}

// Ok
function animalsOlderThan(animal, age) {
  return animals.find((creature) => creature.name === animal).residents
    .every((resident) => resident.age >= age);
}

// Ok
function employeeByName(employeeName) {
  if (!employeeName) {
    return {};
  }
  const result = employees.find(({ firstName, lastName }) => firstName === employeeName
  || lastName === employeeName);
  return result;
}
console.log(employeeByName('Nigel'));

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
