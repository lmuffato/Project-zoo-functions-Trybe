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
  return ids.map((idParam) => data.animals.find((animal) => animal.id === idParam));
}

function animalsOlderThan(animal, age) {
  const animalObject = data.animals.find((el) => el.name === animal);
  return animalObject.residents.every((resident) => resident.age > age);
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  return data.employees.find(employee => {
    return employee.firstName === employeeName || employee.lastName === employeeName
  });
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith};
}

function isManager(id) {
  let result = false;
  data.employees.forEach((employee) => {
    employee.managers.includes(id) ? result = true : null;
  });
  return result;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = { id, firstName, lastName, managers, responsibleFor };
  data.employees.push(newEmployee);
}

function animalCount(species) {
  console.log(species);
  
  const animalCountObject = {};
  data.animals.forEach((animal) => animalCountObject[animal.name] = animal.residents.length);

  // Como faria com reduce?

  if (!species) return animalCountObject
  return animalCountObject[species];
}

function entryCalculator(entrants) {
  if (!entrants) return 0;
  return Object.keys(entrants).reduce((accum, ageGroup) => accum + data.prices[ageGroup]*entrants[ageGroup], 0);
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
