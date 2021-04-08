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

// Requisito 1

// function animalsByIds(...ids) {
//   const searchById = data.animals.filter((animal) => ids.some((id) => id === animal.id) === true);
//   return searchById;
// }

// Requisito 2

function animalsOlderThan(animal, age) {
  const animalParametro = data.animals.find(({ name }) => name === animal);
  const idadeMinima = animalParametro.residents.every((name) => name.age >= age);
  return idadeMinima;
}

console.log(animalsOlderThan('otters', 7));

function employeeByName(employeeName) {
  // seu código aqui
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

// module.exports = {
//   entryCalculator,
//   schedule,
//   animalCount,
//   animalMap,
//   animalsByIds,
//   employeeByName,
//   employeeCoverage,
//   addEmployee,
//   isManager,
//   animalsOlderThan,
//   oldestFromFirstSpecies,
//   increasePrices,
//   createEmployee,
// };
