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
const data = require('./data');

function animalsByIds(...ids) {
  return animals.filter(({id}) => ids.includes(id));
}

console.log(animalsByIds('0938aa23-f153-4937-9f88-4858b24d6bce'))

/* function animalsOlderThan(animal, age) {
  // seu código aqui
} */

/* function employeeByName(employeeName) {
  // seu código aqui
} */

/* function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
} */

/* function isManager(id) {
  // seu código aqui
} */

/* function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
} */

/* function animalCount(species) {
  // seu código aqui
} */

/* function entryCalculator(entrants) {
  // seu código aqui
} */

/* function animalMap(options) {
  // seu código aqui
} */

/* function schedule(dayName) {
  // seu código aqui
} */

/* function oldestFromFirstSpecies(id) {
  // seu código aqui
} */

/* function increasePrices(percentage) {
  // seu código aqui
} */

/* function employeeCoverage(idOrName) {
  // seu código aqui
} */

module.exports = {
  animalsByIds,
  /* entryCalculator,
  schedule,
  animalCount,
  animalMap,
  employeeByName,
  employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  oldestFromFirstSpecies,
  increasePrices,
  createEmployee, */
};
