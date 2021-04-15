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

// const { animals } = require('./data');

const data = require('./data');

const { animals, employees } = data;

function animalsByIds(...ids) {
  const resultArray = [];
  ids.forEach((idParam, index) =>
    (animals[index].id === idParam ? resultArray.push(animals[index]) : resultArray));
  return resultArray;
}

function animalsOlderThan(animalName, age) {
  const objAnimal = animals.find((animal) => animal.name === animalName);
  const result = objAnimal.residents.every((secondAnimal) => secondAnimal.age >= age);
  return result;
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  return employees.find((em) => (em.firstName === employeeName || em.lastName === employeeName));
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;

  const resultObj = { id, firstName, lastName, managers, responsibleFor };
  return resultObj;
}

function isManager(id) {
  const managersArray = [];
  employees.forEach((em) => (
    em.managers.length > 0 ? managersArray.push(...em.managers) : em.managers
  ));
  const check = managersArray.find((managerId) => managerId === id);
  const bool = check !== undefined;
  return bool;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return employees.push({ id, firstName, lastName, managers, responsibleFor });
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
