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

const { prices } = require('./data');
// const data = require('./data');

// function animalsByIds(ids) {
// seu código aqui
// }

// function animalsOlderThan(animal, age) {
// seu código aqui
// }

// function employeeByName(employeeName) {
// seu código aqui
// }

// function createEmployee(personalInfo, associatedWith) {
// seu código aqui
// }

// function isManager(id) {
// seu código aqui
// }

// function addEmployee(id, firstName, lastName, managers, responsibleFor) {
// seu código aqui
// }

// function animalCount(species) {
// seu código aqui
// }

// function entryCalculator(entrants) {
// seu código aqui
// }

// function animalMap(options) {
// seu código aqui
// }

// function schedule(dayName) {
// seu código aqui
// }

// function oldestFromFirstSpecies(id) {
// seu código aqui
// }

function increasePrices(percentage) {
  const percent = (1 + (percentage / 100));
  const keys = Object.keys(prices);
  keys.forEach((key) => {
    prices[key] = (Math.round(prices[key] * percent * 100) / 100);
  });
}

// function employeeCoverage(idOrName) {
// seu código aqui
// }

module.exports = {
  // entryCalculator,
  // schedule,
  // animalCount,
  // animalMap,
  // animalsByIds,
  // employeeByName,
  // employeeCoverage,
  // addEmployee,
  // isManager,
  // animalsOlderThan,
  // oldestFromFirstSpecies,
  increasePrices,
  // createEmployee,
};
