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
  return data.animals.filter((item) => ids.includes(item.id));
}

function animalsOlderThan(nomeAnimal, idade) {
  const verificarAnimal = data.animals.find(({ name }) => name === nomeAnimal);
  return verificarAnimal.residents.every(({ age }) => age > idade);
}

/* function employeeByName(employeeName) {
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
} */

module.exports = {
  /* entryCalculator, */
  /* schedule, */
  /* animalCount, */
  /* animalMap, */
  animalsByIds,
  /* employeeByName, */
  /* employeeCoverage, */
  /* addEmployee, */
  /* isManager, */
  animalsOlderThan,
  /* oldestFromFirstSpecies, */
  /* increasePrices, */
  /* createEmployee, */
};
