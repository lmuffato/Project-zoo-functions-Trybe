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
  const { animals } = data;
  return animals.filter(({ id }) => ids.includes(id));
}

function animalsOlderThan(animalName, animalAge) {
  const { animals } = data;
  return animals
    .find(({ name }) => name === animalName)
    .residents
    .every(({ age }) => age >= animalAge);
}

function employeeByName(employeeName) {
  const { employees } = data;
  if (!employeeName) return {};
  if (employees.some(({ firstName }) => firstName === employeeName)) {
    return employees.find(({ firstName }) => firstName === employeeName);
  }
  return employees.find(({ lastName }) => lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  const newObject = {
    ...personalInfo,
    ...associatedWith,
  };
  return newObject;
}

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

// function increasePrices(percentage) {
// seu código aqui
// }

// function employeeCoverage(idOrName) {
// seu código aqui
// }

module.exports = {
  // entryCalculator,
  // schedule,
  // animalCount,
  // animalMap,
  animalsByIds,
  employeeByName,
  // employeeCoverage,
  // addEmployee,
  // isManager,
  animalsOlderThan,
  // oldestFromFirstSpecies,
  // increasePrices,
  createEmployee,
};
