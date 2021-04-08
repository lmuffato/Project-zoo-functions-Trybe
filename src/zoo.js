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

const { animals, employees } = require('./data');
// const data = require('./data');

function animalsByIds(...ids) {
  if (ids === undefined) return [];
  return animals.filter((el, index) => el.id === ids[index]);
}

function animalsOlderThan(animal, age) {
  const fileredAnimals = animals.filter((el) => el.name === animal);
  return fileredAnimals.every((el2, index) => el2.residents[index].age > age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) return {};
  return employees.find((el) => el.firstName === employeeName || el.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  const newEmployee = { ...personalInfo, ...associatedWith };
  return newEmployee;
}

function isManager(id) {
  let haveManager = false;
  employees.forEach((employee) => {
    const elById = employee.managers.some((el) => el === id);
    if (elById) { haveManager = true; }
  });

  return haveManager;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = { id, firstName, lastName, managers, responsibleFor };
  return employees.push(newEmployee);
}

function animalCount(species) {
  if (species === undefined) {
    return animals.reduce((acc, item) => {
      acc[item.name] = item.residents.length;
      return acc;
    }, {});
  }
  return animals.find((el) => el.name === species).residents.length;
}

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
  animalCount,
  // animalMap,
  animalsByIds,
  employeeByName,
  // employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  // oldestFromFirstSpecies,
  // increasePrices,
  createEmployee,
};
