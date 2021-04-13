/* eslint no-unused-vars: [
  "error",
  {
    "args": "none",
    "vars": "local",
    "varsIgnorePattern": "data"
  }
] */

const data = require('./data');

function animalsByIds(...ids) {
  const { animals } = data;
  if (ids.length !== 0) {
    return ids.map((animalById) => animals.find((animal) => animal.id === animalById));
  }
  return ids;
}

function animalsOlderThan(animal, age) {
  const { animals } = data;
  animals.find((animal2) => (animal2.name === animal))
    .residents.filter((ages) => console.log(ages.age >= age));
}

function employeeByName(employeeName) {
  const { employees } = data;
  const thereIs = employees.find((employee) =>
    employee.firstName === employeeName || employee.lastName === employeeName);
  return (thereIs !== '') ? console.log(thereIs) : {};
}

function createEmployee(personalInfo, associatedWith) {
  const newEmployee = { ...personalInfo, ...associatedWith };
  return newEmployee;
}

function isManager(id) {
  const { employees } = data;
  const trueOrFalse = employees.find((element) =>
    element.managers.find((ids) => ids === id));
  if (trueOrFalse !== undefined) {
    return console.log(true);
  }
  return console.log(false);
}
isManager('0e7b460e-acf4-4e17-bcb3-ee472265db83');

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
