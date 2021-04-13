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

// const { employees } = require('./data');
const data = require('./data');

const { animals, employees, prices, hours } = data;

// requisito 1
function animalsByIds(...ids) {
  return animals.filter(({ id }) => ids.includes(id));
}

// requisito 2
function animalsOlderThan(animal, ageMin) {
  return animals.find((selvageAnimal) => selvageAnimal.name === animal)
    .residents.every(({ age }) => age >= ageMin);
}

// requisito 3
function employeeByName(employeeName) {
  if (employeeName === undefined) return {};
  return employees.find((name) => name.firstName === employeeName
    || name.lastName === employeeName);
}

// requisito 4 // ajuda do Sergio
const createEmployee = (personalInfo, associatedWith) => ({ ...personalInfo, ...associatedWith });

// requisito 5 // ajuda do Sergio
const isManager = (id) => employees.some(({ managers }) => managers.includes(id));

// requisito 6 // ajuda do Sergio
const addEmployee = (id, firstName, lastName, managers = [], responsibleFor = []) =>
  employees.push({ id, firstName, lastName, managers, responsibleFor });

// requisito 7 // ajuda do Sergio
function animalCount(species) {
  return species === undefined ? animals.map(({ name, residents }) =>
    ({ [name]: residents.length })).reduce((acc, cur) =>
    Object.assign(acc, cur), {}) : animals.find(({ name }) =>
    name === species).residents.length;
}

// requisito 8 // ajuda do Anderson (Andy)
function entryCalculator(entrants = 0) {
  const entrantsValue = Object.keys(entrants);
  return entrantsValue.reduce((previousValue, currentValue) =>
    previousValue + entrants[currentValue] * prices[currentValue], 0);
}

// requisito 9
/* function animalMap(options) { nao vou fzr
  // seu código aqui
} */

// requisito 10 // ajuda do Anderson (Andy)
const horary = (all) => ({ [all[0]]: all[0] === 'Monday' ? 'CLOSED'
  : `Open from ${all[1].open}am until ${all[1].close - 12}pm` });

function schedule(dayName) {
  const daysHour = Object.entries(hours);
  return dayName === undefined ? daysHour.reduce((acc, cur) =>
    Object.assign(acc, horary(cur)), {}) : daysHour.map((each) =>
    horary(each)).find((onlyOne) => onlyOne[dayName]);
}

// requisito 11 // ajuda do Anderson (Andy)
function oldestFromFirstSpecies(id) {
  const idAnimal = employees.find((employee) => id === employee.id).responsibleFor[0];
  return Object.values(animals.find((animal) => idAnimal === animal.id).residents
    .reduce((acc, cur) => (acc.age > cur.age ? acc : cur)));
}

// requisito 12
/* function increasePrices(percentage) {
  // seu código aqui
} */

// requisito 13
/* function employeeCoverage(idOrName) {
  // seu código aqui
} */

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
  oldestFromFirstSpecies,
  // increasePrices,
  createEmployee,
};
