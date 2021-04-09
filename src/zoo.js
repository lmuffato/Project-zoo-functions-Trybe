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
}

function animalsOlderThan(animal, age) {
  const animalsList = animals.find((index) => index.name === animal);
  return animalsList.residents.every((index) => index.age >= age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) return {};
  const employee = employees
    .find((name) => name.firstName === employeeName || name.lastName === employeeName);
  return employee;
}

function createEmployee(personalInfo, associatedWith) {
  const employee = { ...personalInfo, ...associatedWith };
  return employee;
}

function isManager(id) {
  return employees.some((employee) => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const employee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  employees.push(employee);
}

// function animalCount(species) {
//   if (species === undefined) {
//     return 'Xablau';
//   }
//   const findAnimals = animals.find((index) => index.name === species);
//   return findAnimals.residents.length;
// }

// console.log(animalCount());

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
