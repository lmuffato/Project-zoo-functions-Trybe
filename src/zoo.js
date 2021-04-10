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

const { animals, employees, prices, hours } = require('./data');
// const data = require('./data');

function animalsByIds(...ids) {
  return ids.map((id) => animals.find((animal) => animal.id === id));
}

function animalsOlderThan(animal, age) {
  const selectedAni = animals.find((currAnimal) => currAnimal.name === animal);
  return selectedAni.residents.every((resident) => resident.age >= age);
}

function employeeByName(employeeName) {
  const notNull = employees.find((employee) =>
    employee.firstName === employeeName || employee.lastName === employeeName);
  return employeeName === undefined ? {} : notNull;
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

// function isManager(id) {
//   // seu código aqui
// }

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const employee = { id, firstName, lastName, managers, responsibleFor };
  return employees.push(employee);
}

function animalCount(species) {
  const fullList = animals.reduce((list, animal) =>
    ({ ...list, [animal.name]: animal.residents.length }), {});
  const onlySpecies = animals.find((animal) => animal.name === species);
  return species === undefined ? fullList : onlySpecies.residents.length;
}

function entryCalculator(entrants = {}) {
  const howMany = Object.entries(entrants);
  const priceIs = Object.entries(prices);
  const thePrice = howMany.map((element1) =>
    priceIs.find((element2) => element1[0] === element2[0])[1]);
  return howMany.reduce((acc, curr, index) => acc + (thePrice[index] * curr[1]), 0);
}

// function animalMap(options) {
//   // seu código aqui
// }

function schedule(dayName) {
  const theHours = Object.entries(hours);
  const ifunder = theHours.reduce((acc, curr) =>
    ({ ...acc,
      [curr[0]]: ((curr[1].open - curr[1].close) !== 0
        ? `Open from ${curr[1].open}am until ${curr[1].close - 12}pm` : 'CLOSED') }), {});
  const selectedDay = Object.entries(ifunder).find((element) => element[0] === dayName);
  return dayName === undefined ? ifunder : { [selectedDay[0]]: selectedDay[1] };
}

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
  entryCalculator,
  schedule,
  animalCount,
  // animalMap,
  animalsByIds,
  employeeByName,
  // employeeCoverage,
  addEmployee,
  // isManager,
  animalsOlderThan,
  // oldestFromFirstSpecies,
  // increasePrices,
  createEmployee,
};
