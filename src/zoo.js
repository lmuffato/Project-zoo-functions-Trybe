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
  const arr = [];
  const selectAnimals = ids.reduce((array, currentValue, index) => {
    const valueId = ids[index];
    const validade = animals.find((search) => search.id === valueId);
    arr.push(validade);
    return arr;
  }, []);
  return selectAnimals;
}

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

// function addEmployee(id, firstName, lastName, managers, responsibleFor) {

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
//   entryCalculator,
//  schedule,
//   animalCount,
//   animalMap,
// addEmployee,
// oldestFromFirstSpecies,
// increasePrices,
//  employeeCoverage,
  animalsByIds,
  employeeByName,
  isManager,
  animalsOlderThan,
  createEmployee,
};
