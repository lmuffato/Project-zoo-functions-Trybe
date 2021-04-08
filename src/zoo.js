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
const { employees } = require('./data');
// const data = require('./data');

function animalsByIds(...ids) {
  return animals.filter((animal) => ids.includes(animal.id));
} // realizado em conjunto (Deh, Nathi, Djaniza, Thalita e Heloisa)

function animalsOlderThan(animal, age) {
  return animals.find((elem) => elem.name === animal).residents.every((res) => res.age >= age);
} // auxilio e explicação do colega Wanderson

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return employees
    .find((employee) => employee.firstName === employeeName || employee.lastName === employeeName);
} // realizado em conjunto (Deh, Nathi, Djaniza, Thalita e Heloisa)

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
//   entryCalculator,
//   schedule,
//   animalCount,
//   animalMap,
//   employeeCoverage,
//   addEmployee,
//   isManager,
  animalsOlderThan,
  animalsByIds,
  employeeByName,
//   oldestFromFirstSpecies,
//   increasePrices,
//   createEmployee,
};
