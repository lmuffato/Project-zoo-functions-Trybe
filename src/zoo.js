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

const animalsByIds = (...ids) => ids.map((animalId) => animals.find(({ id }) => animalId === id));

const animalsOlderThan = (animal, minimalAge) => animals
  .find(({ name }) => animal === name).residents
  .every(({ age }) => age >= minimalAge);

const employeeByName = (employeeName) => {
  const findEmployee = employees
    .find(({ firstName, lastName }) => employeeName === firstName || employeeName === lastName);
  return employeeName ? findEmployee : {};
};

const createEmployee = (personalInfo, associatedWith) => ({ ...personalInfo, ...associatedWith });

const isManager = (id) => {
  const managersIds = employees.map(({ managers }) => managers);
  const ids = [];
  managersIds.forEach((d) => {
    ids.push(...d);
  });
  return ids.some((manager) => manager === id);
};

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
}

function animalCount(species) {
  if (species) return animals.find(({ name }) => name === species).residents.length;
  const res = {};
  animals.map(({ name, residents }) => ({ [name]: residents.length })).forEach((obj) => {
    Object.assign(res, obj);
  });
  return res;
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
