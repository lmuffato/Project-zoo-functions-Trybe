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
// Desenvolvido junto com Nathi Zebral, Thalita Cecilier, Heloísa Hackenhaar

const { animals } = require('./data');
const data = require('./data');
const { employees } = require('./data');
const { prices } = require('./data');

function animalsByIds(...ids) {
  return animals.filter((animal) => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  const ages = data.animals.find((anima) => anima.name === animal);
  return ages.residents.every((resident) => (resident.age >= age));
}

function employeeByName(employeeName) {
  if (!employeeName) {
    return {};
  }
  return employees.find((nome) =>
    nome.firstName === employeeName || nome.lastName === employeeName);
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

function isManager(id) {
  return employees.some((employee) =>
    employee.managers.some((found) => found === id));
}

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

function animalCount(species) {
  if (!species) {
    return animals.reduce((accumulator, animal) =>
      Object.assign(accumulator, { [animal.name]: animal.residents.length }), {});
  }
  const selectedSpecie = animals.find((animal) => species === animal.name);
  return selectedSpecie.residents.length;
}

function entryCalculator(entrants) {
  if (!entrants) {
    return 0;
  }
  return Object.keys(entrants).reduce((accumulator, currentValue) =>
    accumulator + (entrants[currentValue] * prices[currentValue]), 0);
}

/* function animalMap(options) {
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
  entryCalculator,
  // schedule,
  animalCount,
  // animalMap,
  animalsByIds,
  employeeByName,
  // employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  // oldestFromFirstSpecies,
  // increasePrices,
  createEmployee,
};
