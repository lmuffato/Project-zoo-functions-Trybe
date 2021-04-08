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

const { animals, employees, prices, hours } = require('./data');

const isXYZ = (x, y, z) => x === y || y === z;

function animalsByIds(...ids) {
  return animals.filter((animal) => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  return animals
    .find(({ name }) => name === animal).residents
    .every((resident) => resident.age > age);
}

function employeeByName(employeeName) {
  return !employeeName ? {} : employees
    .find(({ firstName, lastName }) => isXYZ(firstName, employeeName, lastName));
}

function createEmployee(personalInfo, associatedWith) {
  return {
    ...personalInfo,
    ...associatedWith,
  };
}

function isManager(id) {
  return employees.some((emplo) => emplo.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

const gettAllnimals = (acc, { name, residents }) => {
  const obj = acc;
  obj[name] = residents.length;
  return obj;
};

function animalCount(species) {
  return !species ? animals.reduce(gettAllnimals, {}) : animals
    .find(({ name }) => name === species).residents.length;
}

function entryCalculator(entrants = 0) {
  return Object.keys(entrants)
    .reduce((acc, cur) => acc + prices[cur] * entrants[cur], 0);
}

function animalMap(options = 0) {
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
