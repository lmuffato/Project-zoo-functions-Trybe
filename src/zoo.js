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

  const filtered = animals.filter(({ id }) => ids.find((idArray) => idArray === id));

  return filtered;
}

function animalsOlderThan(animal, age) {
  const { animals } = data;
  const { residents } = animals.find(({ name }) => name === animal);
  const isEveryOlder = residents.every(({ age: animalAge }) => animalAge > age);

  return isEveryOlder;
}

function employeeByName(employeeName) {
  const { employees } = data;
  const employeeObject = employees.find(({ firstName, lastName }) => {
    if (firstName === employeeName || lastName === employeeName) return true;
    return false;
  });

  return employeeObject || {};
}
console.log(employeeByName());

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
