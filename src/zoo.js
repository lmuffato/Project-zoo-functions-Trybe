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

const { animals, employees, prices } = data;

function animalsByIds(...ids) {
  if (ids === null || ids === undefined) return [];
  return animals.filter((animal, index) => animal.id === ids[index]);
}
// Com a ajuda do plantão do instrutor Eliezer Queiroz e sugestão da colega Carolina Vasconcellos.

/*
function animalsOlderThan(animal, age) {
  // seu código aqui
}
*/

function employeeByName(employeeName) {
  if (employeeName === undefined) return {};
  const searchEmployee = employees
    .find((employee) => employee.firstName === employeeName || employee.lastName === employeeName);
  return searchEmployee;
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers = [], responsibleFor = [] } = associatedWith;
  return {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
}
/*
function isManager(id) {
  employees
    .some((employee) => employee.managers === id || employee.managers.indexOf() !== -1);
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
*/
/*
function entryCalculator(entrants) {
  const { Adult, Child, Senior } = entrants;
  if (entrants === null || entrants === undefined) return 0;
}
*/
/*
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
  animalsByIds,
  employeeByName,
  /* employeeCoverage, */
  addEmployee,
  // isManager,
  /* animalsOlderThan,
// oldestFromFirstSpecies, */
  increasePrices,
  createEmployee,
};
