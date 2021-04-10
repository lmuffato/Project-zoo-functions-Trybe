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
  const { animals } = data;
  const arrAnimals = animals.filter(({ id }) => ids.includes(id));
  return arrAnimals;
}
console.log(animalsByIds());

function animalsOlderThan(animal, age) {
  const searchAnimal = data.animals.find(({ name }) => name === animal);
  return searchAnimal.residents.every(({ age: idade }) => idade > age);
}
console.log(animalsOlderThan('lions'), 12);
function employeeByName(_employeeName) {
  // seu código aqui
}

function createEmployee(_personalInfo, _associatedWith) {
  // seu código aqui
}

function isManager(_id) {
  // seu código aqui
}

function addEmployee(_id, _firstName, _lastName, _managers, _responsibleFor) {
  // seu código aqui
}

function animalCount(_species) {
  // seu código aqui
}

function entryCalculator(_entrants) {
  // seu código aqui
}

function animalMap(_options) {
  // seu código aqui
}

function schedule(_dayName) {
  // seu código aqui
}

function oldestFromFirstSpecies(_id) {
  // seu código aqui
}

function increasePrices(_percentage) {
  // seu código aqui
}

function employeeCoverage(_idOrName) {
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
