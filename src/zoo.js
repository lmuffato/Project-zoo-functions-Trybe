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
  // seu código aqui
  if (!ids) {
    return [];
  }
  const animalsId = data.animals.filter((animal, index) => animal.id === ids[index]);
  return animalsId;
}

function animalsOlderThan(name, idade) {
  // seu código aqui
  const especie = data.animals.find((animal) => animal.name === name);
  const idadeMinima = especie.residents.every((resident) => idade <= resident.age);
  return idadeMinima;
}

function employeeByName(employeeName) {
  // seu código aqui

  if (!employeeName) {
    return {};
  }
  const findName = data.employees
    .find((employee) => employeeName === employee.firstName || employeeName === employee.lastName);
  return findName;
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  let expected = {
    ...personalInfo,
    ...associatedWith,
  }

  return expected;
}

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
  // entryCalculator,
  // schedule,
  // animalCount,
  // animalMap,
  animalsByIds,
  employeeByName,
  // employeeCoverage,
  // addEmployee,
  // isManager,
  animalsOlderThan,
  // oldestFromFirstSpecies,
  // increasePrices,
  createEmployee,
};
