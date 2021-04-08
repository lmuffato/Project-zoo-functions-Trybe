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

const { animals, employees } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  const animalsFound = animals.filter((animal) => ids.find((unitId) => animal.id === unitId));
  return animalsFound;
}

function animalsOlderThan(animal, age) {
  const species = animals.find((group) => group.name === animal);
  return species.residents.every((singleAnimal) => singleAnimal.age >= age);
}

function employeeByName(employeeName) {
  if(employeeName === undefined) {
    return {};
  }
  return employees.find((worker) => worker.firstName === employeeName || worker.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  const newEmployee = Object.assign(personalInfo, associatedWith);
  return newEmployee;
}

function isManager(id) {
  return employees.some((worker) => worker.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newWorker = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  employees.push(newWorker);
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
