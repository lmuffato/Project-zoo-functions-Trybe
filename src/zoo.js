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
  const animalId = data.animals.filter((animal) => ids.some((id) => id === animal.id));
  return animalId;
}

function animalsOlderThan(animal, age) {
  const animals = data.animals.find((selected) => selected.name === animal);
  return animals.residents.every((idd) => idd.age > age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  const selectedEmployee = data.employees.find((employee) => employee.firstName === employeeName
  || employee.lastName === employeeName);
  return selectedEmployee
}

function createEmployee(personalInfo, associatedWith) {
 const {id, firstName, lastName} = personalInfo;
 const {managers, responsibleFor} = associatedWith;
 return { id, firstName, lastName, managers, responsibleFor };
}

// referência https://www.w3schools.com/jsref/jsref_includes.asp#:~:text=The%20includes()%20method%20determines,()%20method%20is%20case%20sensitive.
function isManager(id) {
  return data.employees.some((item) => item.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
    const employee = {
      id,
      firstName,
      lastName,
      managers,
      responsibleFor,
    };
    data.employees.push(employee);
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
