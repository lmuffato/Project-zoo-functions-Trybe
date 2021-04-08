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
  return data.animals.filter((animal) =>
    ids.some((id) => animal.id === id));
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  return data.animals.find(({ name }) =>
    name === animal).residents.every((resident) =>
    resident.age >= age);
}

function employeeByName(employeeName) {
  // seu código aqui
  return employeeName === undefined ? {}
    : data.employees.find(({ firstName, lastName }) =>
      employeeName === firstName || employeeName === lastName);
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
}

function isManager(id) {
  // seu código aqui
  const managerList = [];
  data.employees.forEach(({ managers }) => {
    if (managerList.every((manager) => managers.every((managerTest) => manager !== managerTest))) {
      managerList.push(...managers);
    }
  });

  return data.employees.some((employee) =>
    employee.id === id && (managerList.some((idTeste) => idTeste === employee.id)));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  data.employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  })
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
} */

module.exports = {
  /* entryCalculator,
  schedule,
  animalCount,
  animalMap, */
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
