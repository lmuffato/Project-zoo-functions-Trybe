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

function animalsByIds(...ids) {
  return animals.filter(({ id }) => ids.includes(id));
}
animalsByIds('89be95b3-47e4-4c5b-b687-1fabf2afa274', 'ef3778eb-2844-4c7c-b66c-f432073e1c6b');

function animalsOlderThan(animal, old) {
  return animals.find(({ name }) => name === animal).residents
    .every(({ age }) => age >= old);
}
console.log(animalsOlderThan('lions', 2));

function employeeByName(...args) {
  // seu código aqui
  return employees.find(({ firstName, lastName }) => args.includes(firstName) || args.includes(lastName));
}
console.log(employeeByName('Nigel'));

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
