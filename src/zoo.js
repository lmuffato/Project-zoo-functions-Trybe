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

const { animals } = data;
const { employees } = data;
// const { prices } = data;
// const { hours } = data;

function animalsByIds(...ids) {
  return ids.map((id) => animals.find(({ id: animalId }) => animalId === id));
}

function animalsOlderThan(animal, age) {
  return animals.find(({ name }) => name === animal)
    .residents.every(({ age: animalAge }) => animalAge >= age);
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  return employees.find((employee) => employeeName === employee.firstName
  || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.some((employee) => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  if (!species) {
    return animals
      .map((animal) => ({ [animal.name]: animal.residents.length }))
      .reduce((acc, animal) => ({ ...acc, ...animal }));
  } return animals.find((animal) => animal.name === species).residents.length;
}

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
  animalsByIds,
  animalsOlderThan,
  employeeByName,
  createEmployee,
  isManager,
  addEmployee,
  animalCount,
};
