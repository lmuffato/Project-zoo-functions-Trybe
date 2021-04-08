/*
eslint no-unused-vars: [
  "error",
  {
    "args": "none",
    "vars": "local"
    "varsIgnorePattern": "data"
  }
]
*/
const { animals, employees } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  return animals.filter((animal, index) => animal.id === ids[index]);
}

function animalsOlderThan(animal, age) {
  return animals
  .find(specie => specie.name === animal)
  .residents.every(specie => specie.age > age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) return {}
  return data.employees
  .find(employee => employee.firstName === employeeName || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith }
}

function isManager(id) {
  return data.employees
  .some(employee => employee.managers
  .some(gerente => gerente === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const array = [];
  array.id = id;
  array.firstName = firstName;
  array.lastName = lastName;
  array.managers = [...managers];
  array.responsibleFor = [...responsibleFor];
  data.employees.push(array)
}

function animalCount(species) {
  const animalPopulation = {};
  animals.forEach(animal => (animalPopulation[animal.name] = animal.residents.length));
  if (species === undefined) {
    return animalPopulation;
  }
  return animalPopulation[species];
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
