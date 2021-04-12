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

function animalsByIds(...ids) {
  return data.animals.filter(({ id }) => ids.includes(id));
}

function animalsOlderThan(animal, age) {
  const species = data.animals.find((specie) => specie.name === animal);
  return species.residents.every((animalAge) => animalAge.age > age);
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  return data.employees.find(({ firstName, lastName }) =>
    firstName === employeeName || lastName === employeeName);
}

/*

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
*/

module.exports = {
  /*
  entryCalculator,
  schedule,
  animalCount,
  animalMap,
  */
  animalsByIds,
  employeeByName,
  /*
  employeeCoverage,
  addEmployee,
  isManager,
  */
  animalsOlderThan,
  /*
  oldestFromFirstSpecies,
  increasePrices,
  createEmployee,
  */
};
