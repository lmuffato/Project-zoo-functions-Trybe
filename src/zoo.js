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

// function animalsByIds() {
//   // seu código aqui
// }

// function animalsOlderThan(animal, age) {
//   // seu código aqui
// }

function employeeByName(employeeName) {
  // seu código aqui
  const employeeObj = data.employees.filter((employee) =>
    employee.firstName === employeeName || employee.lastName === employeeName);
  const toObject = employeeObj.reduce((obj, item) => Object.assign(obj, item), {});
  return toObject;
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
  // animalsByIds,
  employeeByName,
  // employeeCoverage,
  // addEmployee,
  // isManager,
  // animalsOlderThan,
  // oldestFromFirstSpecies,
  // increasePrices,
  // createEmployee,
};

// Conteúdo utilizado para consulta na resolução de alguns exercícios.:
// https://stackoverflow.com/questions/19874555/how-do-i-convert-array-of-objects-into-one-object-in-javascript
