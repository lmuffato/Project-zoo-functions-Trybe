/*
eslint no-unused-vars: [
  "error",
  {
    "args": "none",
    "vars": "local"
    "varsIgnorePattern": "data"
  }
]
*/
const { animals } = require('./data');
const data = require('./data');

function animalsByIds(ids) {
  if (ids === undefined) return []
  
}

function animalsOlderThan(animal, age) {
  return animals
  .find(specie => specie.name === animal)
  .residents.every(specie => specie.age > age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) return {}
  return data.employees
  .find(employee => employee.firstName === employeeName || employee.lastName === employeeName)
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
