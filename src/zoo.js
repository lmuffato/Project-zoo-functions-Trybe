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
const { prices } = require('./data');
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

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = { id, firstName, lastName, managers, responsibleFor };
  employees.push(newEmployee);
}

function animalCount(species) {
  if (species === undefined) {
    const allAnimals = {};
    animals.forEach((animal) => {
      allAnimals[animal.name] = animal.residents.length;
    });
    return allAnimals;
  }
  const searchSpecies = animals.find((animal) => animal.name === species);
  return searchSpecies.residents.length;
}
function checkAndCalculate(arrayRealEntrants, entrants) {
  let totalPrice = 0;
  if (arrayRealEntrants.some((entrant) => entrant === entrants.Adult)) {
    totalPrice += entrants.Adult * prices.Adult;
  }
  if (arrayRealEntrants.some((entrant) => entrant === entrants.Child)) {
    totalPrice += entrants.Child * prices.Child;
  }
  if (arrayRealEntrants.some((entrant) => entrant === entrants.Senior)) {
    totalPrice += entrants.Senior * prices.Senior;
  }
  return totalPrice;
}

function entryCalculator(entrants) {
  let totalPrice = 0;
  if (entrants === undefined) {
    return totalPrice;
  }
  if (Object.keys(entrants).length === 0) {
    return totalPrice;
  }
  const arrayEntrants = Object.values(entrants);
  const arrayRealEntrants = arrayEntrants.filter((entrant) => entrant !== undefined);
  totalPrice += checkAndCalculate(arrayRealEntrants, entrants);
  return totalPrice;
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
