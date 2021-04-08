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
  const arr = [];
  ids.forEach((element) => {
    arr.push(animals.find((animal) => element === animal.id));
  });
  return arr;
}

function animalsOlderThan(animal, age) {
  const ageArr = [];
  const obj = animals.find((bicho) => bicho.name === animal);
  obj.residents.forEach((resident) => {
    ageArr.push(resident.age);
  });
  return ageArr.every((idade) => idade >= age);
}

// function employeeByName(employeeName) {
// seu código aqui
// }

// function createEmployee(personalInfo, associatedWith) {
// seu código aqui
// }

// function isManager(id) {
// seu código aqui
// }

// function addEmployee(id, firstName, lastName, managers, responsibleFor) {
// seu código aqui
// }

// function animalCount(species) {
// seu código aqui
// }

// function entryCalculator(entrants) {
// seu código aqui
// }

// function animalMap(options) {
// seu código aqui
// }

// function schedule(dayName) {
// seu código aqui
// }

// function oldestFromFirstSpecies(id) {
// seu código aqui
// }

// function increasePrices(percentage) {
// seu código aqui
// }

// function employeeCoverage(idOrName) {
// seu código aqui
// }

module.exports = {
  // entryCalculator,
  // schedule,
  // animalCount,
  // animalMap,
  animalsByIds,
  // employeeByName,
  // employeeCoverage,
  // addEmployee,
  // isManager,
  animalsOlderThan,
  // oldestFromFirstSpecies,
  // increasePrices,
  // createEmployee,
};
