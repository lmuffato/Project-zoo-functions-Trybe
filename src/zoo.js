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
// const data = require('./data');

function animalsByIds(...ids) {
  return animals.filter((animais) => ids.includes(animais.id));
}
// console.log(animalsByIds('0938aa23-f153-4937-9f88-4858b24d6bce', '89be95b3-47e4-4c5b-b687-1fabf2afa274'));// test 1
// console.log(animalsByIds());// test 2

function animalsOlderThan(animalsName, animalsAge) {
  return animals
    .find(({ name }) => name === animalsName)
    .residents
    .every(({ age }) => age >= animalsAge);
}

// console.log(animalsOlderThan('lions',15)); // TEST 1 - Expected true
// console.log(animalsOlderThan('lions',2)); // TEST 2 - Expected false
// console.log(animalsOlderThan('otters',7)); // TEST 4 - Expected true
// console.log(animalsOlderThan('penguins',10)); // TEST 3 - Expected true
// console.log(animals[0].residents[0].age) // Propriedade age

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
