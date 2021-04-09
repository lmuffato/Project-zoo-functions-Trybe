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

const { animals, employees, prices } = require('./data');

function animalsByIds(...ids) {
  return ids.map((idAnimal) => animals.find((animal) => animal.id === idAnimal));
}

function animalsOlderThan(animal, age) {
  return animals.find((nomeAnimal) =>
    nomeAnimal.name === animal).residents.every((idade) =>
    idade.age > age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) return { };
  return employees.find((empregado) =>
    empregado.firstName === employeeName || empregado.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.some((employee) => employee.managers.some((empregado) => empregado === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const employee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  employees.push(employee);
}

function animalCount(species) {
  if (species === undefined) {
    return animals.reduce((acc, animal) => (
      { ...acc, [animal.name]: animal.residents.length }
    ), {});
  }
  return animals.find((animal) => animal.name === species).residents.length;
}

function entryCalculator(entrants = {}) {
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  if (entrants !== undefined) {
    return ((prices.Adult * Adult) + (prices.Senior * Senior) + (prices.Child * Child));
  }
  return 0;
}
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
