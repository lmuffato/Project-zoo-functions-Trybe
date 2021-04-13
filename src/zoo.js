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

//console.log(data);

function animalsByIds(...ids) {
  if (typeof (ids) === 'undefined') {
    const array = [];
    return array;
  }
  const animais = animals.filter((animal) => ids.includes(animal.id));
  return animais;
}

function animalsOlderThan(animal, agen) {
  // seu código aqui
  return animals.find((anim) => anim.name === animal).residents.every(({age}) => age > agen);
}

function employeeByName(employeeName) {
  // seu código aqui
  const obj = {};
  if ( employeeName === 'undefined') {
    return obj;
  } else {
    const emploies = employees.find((name) => name.firstName === employeeName || name.last === employeeName);
    return emploies;
  }
}

/*
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
*/
module.exports = {
  animalsByIds,
  animalsOlderThan,
  employeeByName,
  /* entryCalculator,
  schedule,
  animalCount,
  animalMap,
  employeeCoverage,
  addEmployee,
  isManager,
  oldestFromFirstSpecies,
  increasePrices,
  createEmployee, */
}
