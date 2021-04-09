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
const { employees } = require('./data');
// const data = require('./data');

function animalsByIds(...ids) {
  return animals.filter((animal) => ids.includes(animal.id));
} // realizado em conjunto (Deh, Nathi, Djaniza, Thalita e Heloisa)

function animalsOlderThan(animal, age) {
  return animals.find((elem) => elem.name === animal).residents.every((res) => res.age >= age);
} // auxilio e explicação do colega Wanderson

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return employees
    .find((employee) => employee.firstName === employeeName || employee.lastName === employeeName);
} // realizado em conjunto (Deh, Nathi, Djaniza, Thalita e Heloisa)

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return ({ id, firstName, lastName, managers, responsibleFor });
}

function isManager(id) {
  return employees.some((employee) => employee.managers.some((employee2) => employee2 === id));
} // auxilio e explicação do colega Wanderson erealizado em conjunto (Deh, Nathi, Djaniza, Thalita e Heloisa)

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const addNewEmp = { id, firstName, lastName, managers, responsibleFor };
  return employees.push(addNewEmp);
}

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
//   employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  animalsByIds,
  employeeByName,
  createEmployee,
//   oldestFromFirstSpecies,
//   increasePrices,
};
