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
  const expected = {
    ...personalInfo,
    ...associatedWith,
  };

  return expected;
}

function isManager(idColab) {
  // seu código aqui
  const verifyId = data.employees.find(({id}) => idColab === id);
 const cond = (verifyId.id === '0e7b460e-acf4-4e17-bcb3-ee472265db83' || verifyId.id === 'fdb2543b-5662-46a7-badc-93d960fdc0a8' ||  verifyId.id === '9e7d4524-363c-416a-8759-8aa7e50c0992' ) ? true : false;
  const findManager = cond;
  return findManager;
}
// console.log(isManager('c5b83cb3-a451-49e2-ac45-ff3f54fbe7e1'));
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
  isManager,
  animalsOlderThan,
  // oldestFromFirstSpecies,
  // increasePrices,
  createEmployee,
};
