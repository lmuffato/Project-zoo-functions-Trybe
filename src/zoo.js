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

const { employees, prices } = data;

/*
function animalsByIds(ids) {
  // seu código aqui
}

function animalsOlderThan(animal, age) {
  // seu código aqui
}

function employeeByName(employeeName) {
  // seu código aqui
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
}

function isManager(id) {
  // seu código aqui
}
*/
function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return employees.push(newEmployee);
}

/* function animalCount(species) {
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
*/
const calculateIncrease = (percent) => 1 + (percent / 100) + 0.00001;

function increasePrices(percentage) {
  const increasePrice = calculateIncrease(percentage);
  prices.Adult = parseFloat((prices.Adult * increasePrice).toPrecision(4));
  prices.Senior = parseFloat((prices.Senior * increasePrice).toPrecision(4));
  prices.Child = parseFloat((prices.Child * increasePrice).toPrecision(4));
}

/*
function employeeCoverage(idOrName) {
  // seu código aqui
} */

module.exports = {
// entryCalculator,
// schedule,
//  animalCount,
//  animalMap,
//  animalsByIds,
//  employeeByName,
//  employeeCoverage,
  addEmployee, /* isManager,
//  animalsOlderThan, //  oldestFromFirstSpecies, */
  increasePrices,
//  createEmployee,
};
