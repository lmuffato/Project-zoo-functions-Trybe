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

const { animals } = data;
const { employees } = data;

function animalsByIds(...ids) {
  const newArray = [];
  if (ids === undefined) {
    return newArray;
  }
  return animals.filter((animal, index) => animal.id === ids[index]);
}

function animalsOlderThan(animal, age) {
  const getAnimal = animals.filter((currentAnimal) => (currentAnimal.name === animal));
  return getAnimal.every((currentSpecie, index) => (currentSpecie.residents[index].age > age));
}

function employeeByName(employeeName) {
  const defaultArr = {};
  if (employeeName === undefined) {
    return defaultArr;
  }
  return employees.find((employee) => employee.firstName === employeeName
  || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  const newEmployeeArray = { id, firstName, lastName, managers, responsibleFor };
  return newEmployeeArray;
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
