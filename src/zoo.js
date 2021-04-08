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

const { animals } = require('./data');

function animalsByIds(...a) {
  return animals.filter(({ id }) => a.includes(id));
}
animalsByIds('89be95b3-47e4-4c5b-b687-1fabf2afa274', 'ef3778eb-2844-4c7c-b66c-f432073e1c6b');

function animalsOlderThan() {
}
function employeeByName() {
  // seu código aqui
}

function createEmployee() {
  // seu código aqui
}

function isManager() {
  // seu código aqui
}

function addEmployee() {
  // seu código aqui
}

function animalCount() {
  // seu código aqui
}

function entryCalculator() {
  // seu código aqui
}

function animalMap() {
  // seu código aqui
}

function schedule() {
  // seu código aqui
}

function oldestFromFirstSpecies() {
  // seu código aqui
}

function increasePrices() {
  // seu código aqui
}

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
