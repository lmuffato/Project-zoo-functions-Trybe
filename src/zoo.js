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
  const animalsIds = [...ids];
  if (!animalsIds) return [];
  return animalsIds.map((uniqueId) => data.animals.find((animalId) => animalId.id === uniqueId));
}
function animalsOlderThan(animal, age) {
  const getAnimals = data.animals.find((animalData) => animalData.name === animal);
  const isOlderThan = getAnimals.residents.every((animalAge) => animalAge.age >= age);
  return isOlderThan;
}
function employeeByName(employeeName) {
  if (!employeeName) return {};
  return data.employees
    .find((name) => name.firstName === employeeName || name.lastName === employeeName);
}

// function createEmployee(personalInfo, associatedWith) {
//   // seu código aqui
// }

// function isManager(id) {
//   // seu código aqui
// }

// function addEmployee(id, firstName, lastName, managers, responsibleFor) {
//   // seu código aqui
// }

// function animalCount(species) {
//   // seu código aqui
// }

// function entryCalculator(entrants) {
//   // seu código aqui
// }

// function animalMap(options) {
//   // seu código aqui
// }

// function schedule(dayName) {
//   // seu código aqui
// }

// function oldestFromFirstSpecies(id) {
//   // seu código aqui
// }

// function increasePrices(percentage) {
//   // seu código aqui
// }

// function employeeCoverage(idOrName) {
//   // seu código aqui
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
  // createEmployee,
};
