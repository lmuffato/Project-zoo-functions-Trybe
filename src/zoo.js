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

const { animals, employees } = data;

function animalsByIds(...ids) {
  if (typeof ids === 'undefined') {
    return [];
  }
  return animals.filter((idValue) => idValue.id === ids[0]);
}
// console.log(animalsByIds('01422318-ca2d-46b8-b66c-3e9e188244ed'));

function animalsOlderThan(animal, age) {
  const check = animals.find((currentValue) => currentValue.name === animal);
  return check.residents.map((ageAnimals) => ageAnimals.age >= age);
}

function employeeByName(employeeName) {
  if (typeof employeeName === 'undefined') {
    return [];
  }
  if (data.employees.some((value) => value.firstName === employeeName)) {
    return employees.find((value) => value.firstName === employeeName);
  }
  if (data.employees.some((value) => value.lastName === employeeName)) {
    return employees.find((value) => value.firstName === employeeName);
  }
}

function createEmployee(personalInfo, associatedWith) {
  return Object.assign(personalInfo, associatedWith);
}

function isManager(id) {
  const idResponsible = employees.find((current) => current.id === id);
  return idResponsible.managers.length === 0;
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
}

function animalCount(species) {
  // seu código aqui
}

function entryCalculator(entrants) {
  // seu código aqui
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // seu código aqui
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
  // seu código aqui
}

function employeeCoverage(idOrName) {
  // seu código aqui
}

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  animalMap,
  animalsByIds,
  employeeByName,
  employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  oldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
