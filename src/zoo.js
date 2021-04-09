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
/* const data = require('./data'); */

function animalsByIds(...ids) {
  return animals.filter(({ id }) => ids.includes(id));
};

function animalsOlderThan(animal, animalsAge) {
  return animals
    .find(({ name }) => name === animal)
    .residents.every(({ age }) => age >= animalsAge);
};

function employeeByName(employeeName) {
  if (!employeeName) {return {}}
  return employees
    .find(({ firstName, lastName }) => [firstName, lastName].includes(employeeName));
};

console.log(employeeByName('Nelson'));

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
  animalsOlderThan,
  employeeByName,
  /* entryCalculator,
  schedule,
  animalCount,
  animalMap,
  employeeCoverage,
  addEmployee,
  isManager,
  oldestFromFirstSpecies,
  increasePrices,
  createEmployee, */
};
