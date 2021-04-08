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
  if (!ids) {
    return [];
  }
  return ids.map((id) => animals.find((animal) => animal.id === id));
}

function animalsOlderThan(animal, age) {
  const { animals } = data;
  const obj = animals.find((animal2) => animal2.name === animal);
  return obj.residents.every((resident) => resident.age >= age);
}

// console.log(animalsOlderThan('otters', 7));
// function employeeByName(employeeName) {
//   // seu código aqui
// }

// function createEmployee(personalInfo, associatedWith) {
//   // seu código aqui
// }

// function isManager(id) {
//   // seu código aqui
// }

// function addEmployee(id, firstName, lastName, managers, responsibleFor) {
//   // seu código aqui
// }

// function animalCount(species) {
//   // seu código aqui
// }

// function entryCalculator(entrants) {
//   // seu código aqui
// }

// function animalMap(options) {
//   // seu código aqui
// }

// function schedule(dayName) {
//   // seu código aqui
// }

// function oldestFromFirstSpecies(id) {
//   // seu código aqui
// }

// function increasePrices(percentage) {
//   // seu código aqui
// }

// function employeeCoverage(idOrName) {
//   // seu código aqui
// }

module.exports = {
  //   entryCalculator,
  //   schedule,
  //   animalCount,
  //   animalMap,
  animalsByIds,
  //   employeeByName,
  //   employeeCoverage,
  //   addEmployee,
  //   isManager,
  animalsOlderThan,
  //   oldestFromFirstSpecies,
  //   increasePrices,
  //   createEmployee,
};
