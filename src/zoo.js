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

const { animals } = require('./data.js');
const { employees } = require('./data.js');

function animalsByIds(...ids) {
  // seu código aqui
  return animals.filter((animal) => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  return animals
    .find((specimen) => specimen.name === animal).residents
    .every((specimen) => specimen.age >= age);
}

function employeeByName(employeeName) {
  // seu código aqui
  if (employeeName === undefined) {
    return {};
  }

  return employees
    .find((employee) => employee.firstName === employeeName || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  const employee = { ...personalInfo, ...associatedWith };
  return employee;
}

function isManager(id) {
  // seu código aqui
  return employees.some(({ managers }) => managers.indexOf(id) !== -1);
}

function addEmployee(id = 0, firstName = 'None', lastName = 'None',
  managers = [], responsibleFor = []) {
  // seu código aqui
  employees[employees.length] = { id, firstName, lastName, managers, responsibleFor };
  return employees;
}

// console.log(addEmployee('39800c14-4b76-454a-858d-2f8d168146a7', 'John', 'Doe'));

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
  addEmployee,
  isManager,
  animalsOlderThan,
  // oldestFromFirstSpecies,
  // increasePrices,
  createEmployee,
};
