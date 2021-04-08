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

function animalsByIds(...listOfIdsToSearch) {
  // This guard clause is not necessary, but imo it makes the code prettier
  if (listOfIdsToSearch.length === 0) return [];
  const { animals } = data;
  const animalsList = [];
  listOfIdsToSearch.forEach((idToSearchFor) => {
    animalsList.push(animals.find((animal) => animal.id === idToSearchFor));
  });
  return animalsList;
}

function animalsOlderThan(animalName, age) {
  const { animals } = data;
  const animalMatch = animals.find((animal) => animal.name === animalName);
  return animalMatch.residents.every((resident) => resident.age >= age);
}

function employeeByName(employeeName) {
  if (typeof employeeName === 'undefined') return ({});
  const { employees } = data;
  return employees.find((employee) => employee.firstName === employeeName
    || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
}

function isManager(id) {
  // seu código aqui
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
}

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

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  animalMap,
  animalsByIds,
  employeeByName,
  employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  oldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
