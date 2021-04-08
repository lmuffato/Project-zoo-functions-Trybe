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

// const data = require('./data');

function animalsByIds(...ids) {
  return ids.map((animal) => animals.find((item) => item.id === animal));
}

/* Source: https://github.com/tryber/sd-08-project-zoo-function/tree/e59c4d832c334495d2e92b9a128eb8a97dbe70d6 */
function animalsOlderThan(animal, age) {
  return animals
    .find((item) => item.name === animal)
    .residents.every((some) => some.age > age);
}

function employeeByName(employeeName) {
  if (!employeeName) return {};

  return employees
    .find((employee) => employee.firstName === employeeName || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

/* Source: https://github.com/tryber/sd-010-a-project-zoo-functions/blob/e77b3c388c20903360c859b9cc026659e4efa3ff/src/zoo.js */
function isManager(id) {
  return employees.some((employee) => employee.managers.includes(id));
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

/* Source: https://github.com/tryber/sd-08-project-zoo-function/tree/c464723d68232d5a56b2db03b1c8488aec652c62 */
function animalCount(species) {
  const animalEmpty = {};

  if (!species) return animalEmpty;

  animals.forEach((element) => {
    animalEmpty[element.name] = element.residents.name;
  });

  return animalEmpty[species];
}

/*
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
*/

module.exports = {
  /*
  entryCalculator,
  schedule,
  */

  animalCount,

  /*
  animalMap,
  */

  animalsByIds,
  employeeByName,

  /*
  employeeCoverage,
  */
  addEmployee,
  isManager,
  animalsOlderThan,

  /*
  oldestFromFirstSpecies,
  increasePrices,
  */

  createEmployee,
};
