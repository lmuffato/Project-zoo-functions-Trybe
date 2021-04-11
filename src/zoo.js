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

function animalsByIds(...ids) {
  return ids.map((idParam) => data.animals.find((animal) => animal.id === idParam));
}

function animalsOlderThan(animal, age) {
  const animalObject = data.animals.find((el) => el.name === animal);
  return animalObject.residents.every((resident) => resident.age > age);
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  return data.employees.find(employee => {
    return employee.firstName === employeeName || employee.lastName === employeeName
  });
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith};
}

function isManager(id) {
  let result = false;
  data.employees.forEach((employee) => {
    employee.managers.includes(id) ? result = true : null;
  });
  return result;
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
