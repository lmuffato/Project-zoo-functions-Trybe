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
  if (ids === []) {
    return [];
  }
  return ids.map((id) => data.animals.find((animal) => animal.id === id));
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  const object = data.animals.find((beast) => beast.name === animal);
  const arrayIdades = [];
  object.residents.forEach((habitat) => {
    arrayIdades.push(habitat.age);
  });
  return arrayIdades.every((idade) => idade >= age);
}

function employeeByName(employeeName) {
  // seu código aqui
  const employees = data.employees
    .find((employee) => employee
      .firstName === employeeName || employee.lastName === employeeName);
  return employees !== undefined ? employees : {};
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  // seu código aqui
  const { employees } = data;
  return employees.some((anEmployee) => anEmployee.managers.some((employee) => employee === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  const employee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  data.employees.push(employee);
  return data.employees;
}
/*
function animalCount(species) {
  // seu código aqui
}

function entryCalculator(entrants) {
  // seu código aqui
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // seu código aqui
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
  // seu código aqui
}

function employeeCoverage(idOrName) {
  // seu código aqui
}
*/
module.exports = {
/*  entryCalculator,
  schedule,
  animalCount,
  animalMap, */
  animalsByIds,
  employeeByName,
  /* employeeCoverage, */
  addEmployee,
  isManager,
  animalsOlderThan,
  /*  oldestFromFirstSpecies,
  increasePrices, */
  createEmployee,
};
