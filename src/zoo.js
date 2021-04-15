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
  return data.animals.filter(({ id }) => ids.includes(id));
}

function animalsOlderThan(animal, age) {
  const species = data.animals.find((specie) => specie.name === animal);
  return species.residents.every((animalAge) => animalAge.age > age);
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  return data.employees.find(({ firstName, lastName }) =>
    firstName === employeeName || lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  const employee = { ...personalInfo, ...associatedWith };
  return employee;
}

function isManager(id) {
  return data.employees.some(({ managers }) => managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const lastEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  data.employees.push(lastEmployee);
  return lastEmployee;
}

function animalCount(species) {
  if (!species) {
    return data.animals.reduce((acc, curr) => {
      acc[curr.name] = curr.residents.length;
      return acc;
    }, {});
  }
  return data.animals.find(({ name }) => name === species).residents.length;
}

function entryCalculator(entrants) {
  if (!entrants || entrants === {}) return 0;
  return Object.keys(entrants).reduce((acc, curr) =>
    (acc + (entrants[curr] * data.prices[curr])), 0);
}

/*

function animalMap(options) {
  // seu código aqui
}

*/

function schedule(dayName) {
  const openFromTo = {};
  Object.keys(data.hours).forEach((day) => {
    if (day !== 'Monday') {
      openFromTo[day] = `Open from ${data.hours[day].open}am until ${data.hours[day].close - 12}pm`;
    } else openFromTo[day] = 'CLOSED';
  });
  if (!dayName) return openFromTo;
  return ({ [dayName]: openFromTo[dayName] });
}

/*
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
  entryCalculator,
  schedule,
  animalCount,
  // animalMap,
  animalsByIds,
  employeeByName,
  // employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  /*
  oldestFromFirstSpecies,
  increasePrices,
  */
  createEmployee,
};
