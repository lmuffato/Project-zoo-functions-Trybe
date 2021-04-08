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
const { employees } = require('./data');
const { animals } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  const animalID = ids.map((id) => {
    const animalSearch = animals.find((animal) => animal.id === id);
    return animalSearch;
  });
  return animalID;
}

function animalsOlderThan(animalName, age) {
  const especies = animals.find((animal) => animal.name === animalName);
  const especiesResidents = especies.residents;
  const especiesResidentsAge = especiesResidents.every((especie) => especie.age >= age);
  return especiesResidentsAge;
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  const searchEmployee = employees.find((employee) => employee.firstName === employeeName
  || employee.lastName === employeeName);
  return searchEmployee;
}

function createEmployee({ id, firstName, lastName }, { managers, responsibleFor }) {
  const newEmployee = { id, firstName, lastName, managers, responsibleFor };
  employees.push(newEmployee);
  return newEmployee;
}

function isManager(id) {
  let boolCheckManager = false;
  employees.forEach((employee) => {
    const manager = employee.managers;
    const checkManager = manager.some((personID) => personID === id);
    if (checkManager === true) {
      boolCheckManager = true;
    }
  });
  return boolCheckManager;
}
console.log(isManager('0e7b460e-acf4-4e17-bcb3-ee472265db83'));

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
