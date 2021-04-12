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
  return (ids.length !== 0) ? ids.map((id) => animals.find((animal) => animal.id === id)) : ids;
}

function animalsOlderThan(animal, age) {
  const { animals } = data;
  const findAnimal = animals.find((nAnimal) => nAnimal.name === animal);
  return findAnimal.residents.every((resident) => resident.age >= age);
}

function employeeByName(employeeName) {
  const { employees } = data;
  const findEmployee = employees.find((employee) =>
    employee.firstName === employeeName || employee.lastName === employeeName);
  return (findEmployee !== undefined) ? findEmployee : {};
}

function createEmployee(personalInfo, associatedWith) {
  const newEmployee = { ...personalInfo, ...associatedWith };
  return newEmployee;
}

function isManager(id) {
  const { employees } = data;
  const findEmployee = employees.find((employee) => employee.id === id);
  if (findEmployee.managers.length < 2) return true;
  return false;
}

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
