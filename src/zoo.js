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
  // if (ids.length === 0) return [];
  return data.animals.filter((specie) => ids.some((id) => id === specie.id) === true);
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  return data.animals.find((element) => element.name === animal)
    .residents.every((animals) => animals.age >= age);
}

// function employeeByName(employeeName) {
//   // seu código aqui
//   if (employeeByName === undefined) return ;
//   return data.employees.filter((employee) => employeeName === employee.firstName ||
//       employee.lastName === employeeName);
// }

// function createEmployee(personalInfo, associatedWith) {
//   // seu código aqui
// }

function isManager(id) {
  // seu código aqui
  return data.employees.some((employee) => employee.managers.includes(id));
}
// console.log(isManager('0e7b460e-acf4-4e17-bcb3-ee472265db83')); // true
// console.log(isManager('c5b83cb3-a451-49e2-ac45-ff3f54fbe7e1')); // false
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
//  entryCalculator,
//  schedule,
//  animalCount,
//  animalMap,
  animalsByIds,
  // employeeByName,
  //   employeeCoverage,
  //   addEmployee,
  isManager,
  animalsOlderThan,
  // oldestFromFirstSpecies,
  // increasePrices,
  // createEmployee,
};
