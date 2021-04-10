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

const { animals, employees, prices } = require('./data');
// const data = require('./data');

function animalsByIds(...ids) {
  return ids.map((id) => animals.find((animal) => animal.id === id));
}

function animalsOlderThan(animal, age) {
  const selectedAni = animals.find((currAnimal) => currAnimal.name === animal);
  return selectedAni.residents.every((resident) => resident.age >= age);
}

function employeeByName(employeeName) {
  const notNull = employees.find((employee) =>
    employee.firstName === employeeName || employee.lastName === employeeName);
  return employeeName === undefined ? {} : notNull;
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

// function isManager(id) {
//   // seu código aqui
// }

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const employee = { id, firstName, lastName, managers, responsibleFor };
  return employees.push(employee);
}

function animalCount(species) {
  const fullList = animals.reduce((list, animal) =>
    ({ ...list, [animal.name]: animal.residents.length }), {});
  const onlySpecies = animals.find((animal) => animal.name === species);
  return species === undefined ? fullList : onlySpecies.residents.length;
}

function entryCalculator(entrants = {}) {
  const howMany = Object.entries(entrants);
  const priceIs = Object.entries(prices);
  return howMany.reduce((acc, curr) =>
    acc += curr[1] * priceIs.find((element) => element[0] === curr[0])[1], 0);
}

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
  entryCalculator,
  // schedule,
  animalCount,
  // animalMap,
  animalsByIds,
  employeeByName,
  // employeeCoverage,
  addEmployee,
  // isManager,
  animalsOlderThan,
  // oldestFromFirstSpecies,
  // increasePrices,
  createEmployee,
};
