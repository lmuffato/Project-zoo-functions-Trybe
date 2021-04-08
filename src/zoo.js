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

function animalsByIds(...ids) {
  if (!ids) {
    return [];
  }
  const result = animals.filter((animal, index) => animal.id === ids[index]);
  return result;
}

// const { animals, employees } = require('./data');
function animalsOlderThan(specie, age) {
  // const result = animals
  //   .filter((creature) => creature.name === animal)
  //   .every((creature) => creature.residents.age >= age);
  // return result;
  return animals.find((animal) => animal.name === specie).residents
    .every((resident) => resident.age >= age);
}
// console.log(animalsOlderThan('lions', 6));

function employeeByName(employeeName) {
  if (!employeeName) {
    return {};
  }
  const result = Object.values(employees).find((subjet) => subjet === employeeName);
  return result;
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
