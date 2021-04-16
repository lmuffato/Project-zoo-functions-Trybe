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
  if (ids === []) {
    return [];
  }
  return ids.map((id) => data.animals.find((animal) => animal.id === id));
}

function animalsOlderThan(animal, age) {
  const animalType = data.animals.find((animalName) => animalName.name === animal);
  return animalType.residents.every((animalAge) => animalAge.age >= age);
}

function employeeByName(employeeName) {
  if (!employeeName) return {};

  return data.employees.find((employee) => employee.firstName === employeeName
    || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return {
    ...personalInfo,
    ...associatedWith,
  };
}

function isManager(id) {
  const everyManager = data.employees.map((employee) => employee.managers);
  return everyManager.map((someManager) =>
    someManager.some((manager) => manager === id)).some((trueManager) => trueManager === true);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const addedEmployee = { id, firstName, lastName, managers, responsibleFor };
  return data.employees.push(addedEmployee);
}

function animalCount(species) {
  if (typeof species === 'undefined') {
    const object = {};
    data.animals.forEach((element) => {
      object[element.name] = element.residents.length;
    });
    return object;
  }
  return data.animals.find((animal) => animal.name === species).residents.length;
}

// function entryCalculator(entrants) {
//   // seu código aqui
// }

// function animalMap(options) {
//   // seu código aqui
// }

// function schedule(dayName) {
//   // seu código aqui
// }

function oldestFromFirstSpecies(id) {
  const animalUnit = data.employees.find((employee) => employee.id === id).responsibleFor[0];
  const forResidents = data.animals.find((animal) => animal.id === animalUnit).residents;
  const oldestAnimal = forResidents.reduce((acc, cur) => (acc.age > cur.age ? acc : cur));
  return [oldestAnimal.name, oldestAnimal.sex, oldestAnimal.age];
}

function increasePrices(percentage) {
  const increment = percentage / 100;
  const newIncrement = 1 + increment;
  data.prices.Adult = Math.round(100 * (data.prices.Adult * newIncrement)) / 100;
  data.prices.Child = Math.round(100 * (data.prices.Child * newIncrement)) / 100;
  data.prices.Senior = Math.round(100 * (data.prices.Senior * newIncrement)) / 100;
  return data.prices;
}

// function employeeCoverage(idOrName) {
//   // seu código aqui
// }

module.exports = {
  //   entryCalculator,
  //   schedule,
  animalCount,
  //   animalMap,
  animalsByIds,
  employeeByName,
  //   employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  oldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
