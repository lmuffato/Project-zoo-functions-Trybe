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

function animalsByIds(...ids) {
  return animals.filter((animal) => ids.some((id) => id === animal.id));
}
// Lógica que o Rodrigo Luiz apresentou no plantão.
function animalsOlderThan(animal, age) {
  return animals.find((getAnimal) => getAnimal.name === animal)
    .residents.every(((animalAge) => animalAge.age >= age));
}
function employeeByName(employeeName) {
  if (typeof (employeeName) === 'undefined') return {};
  const employeeFilter = employees.filter((employee) =>
    employee.firstName === employeeName || employee.lastName === employeeName);
  return employeeFilter.shift();
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
}

function isManager(id) {
  // seu código aqui
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

// console.log(employeeByName('Wishart'));

