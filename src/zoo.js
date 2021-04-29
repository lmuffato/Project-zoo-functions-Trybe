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
  return data.animals.filter((animal) => ids.find((id) => animal.id === id));
}

function animalsOlderThan(animal, age) {
  const container = data.animals.find((animalS) => animalS.name === animal)
  return container.residents.every((animalResident) => animalResident.age > age);
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  return data.employees.find((employee) => employee.firstName === employeeName || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  const newEmployee = {
    id: personalInfo.id,
    firstName: personalInfo.firstName,
    lastName: personalInfo.lastName,
    managers: associatedWith.managers,
    responsibleFor: associatedWith.responsibleFor,
  };
  return newEmployee;
}

function isManager(id) {
  return data.employees.some((employee) => employee.managers.includes(id));
}

/* function addEmployee(id, firstName, lastName, managers, responsibleFor) {
}

function animalCount(species) {
}

function entryCalculator(entrants) {
}

function animalMap(options) {
}

function schedule(dayName) {
}

function oldestFromFirstSpecies(id) {
}

function increasePrices(percentage) {
}

function employeeCoverage(idOrName) {
}
*/
module.exports = {
//  entryCalculator,
//  schedule,
//  animalCount,
// animalMap,
  animalsByIds,
  employeeByName,
//  employeeCoverage,
//  addEmployee,
  isManager,
  animalsOlderThan,
//  oldestFromFirstSpecies,
//  increasePrices,
  createEmployee,
};
