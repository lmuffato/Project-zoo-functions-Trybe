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
const data = require('./data');

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

function employeeByName(employeeName) {
  const obj = data.employees.find((employee) =>
    employee.firstName === employeeName || employee.lastName === employeeName);
  return (obj !== undefined ? obj : {});
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  const employe = data.employees.find((employee) => employee.id === id);
  return employe.managers.some((manager) => manager === '9e7d4524-363c-416a-8759-8aa7e50c0992');
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  const employee = { id, firstName, lastName, managers, responsibleFor };
  data.employees.push(employee);
}

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
  employeeByName,
  // employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  // oldestFromFirstSpecies,
  // increasePrices,
  createEmployee,
};
