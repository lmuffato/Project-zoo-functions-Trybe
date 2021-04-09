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

const { animals, employees, prices } = require('./data');

// const data = require('./data');

function animalsByIds(...ids) {
  return ids.map((animal) => animals.find((item) => item.id === animal));
}

/* Source: https://github.com/tryber/sd-08-project-zoo-function/tree/e59c4d832c334495d2e92b9a128eb8a97dbe70d6 */
function animalsOlderThan(animal, age) {
  return animals
    .find((item) => item.name === animal)
    .residents.every((some) => some.age > age);
}

function employeeByName(employeeName) {
  if (!employeeName) return {};

  return employees
    .find((employee) => employee.firstName === employeeName || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

/* Source: https://github.com/tryber/sd-010-a-project-zoo-functions/blob/e77b3c388c20903360c859b9cc026659e4efa3ff/src/zoo.js */
function isManager(id) {
  return employees.some((employee) => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

/* Source: https://github.com/tryber/sd-07-project-zoo-functions/tree/c944172ee11837b1158809ad1c8498b3456efd0f */
function animalCount(species) {
  if (!species) {
    return animals.reduce((acc, cur) => {
      Object.assign(acc, { [cur.name]: cur.residents.length });
      return acc;
    }, {});
  }
  return animals.find((animal) => animal.name === species).residents.length;
}

/*
function entryCalculator(entrants) {
  // seu código aqui
}

function animalMap(options) {
  // seu código aqui
}
*/

/* Source: https://github.com/tryber/sd-08-project-zoo-function/tree/6ba553f978bbba190e79284981a064395c610d15 */
function schedule(dayName) {
  const scheduleList = {
    Tuesday: 'Open from 8am until 6pm',
    Wednesday: 'Open from 8am until 6pm',
    Thursday: 'Open from 10am until 8pm',
    Friday: 'Open from 10am until 8pm',
    Saturday: 'Open from 8am until 10pm',
    Sunday: 'Open from 8am until 8pm',
    Monday: 'CLOSED',
  };

  if (typeof dayName === 'string') return { [dayName]: scheduleList[dayName] };
  return scheduleList;
}

/* Source: https://github.com/tryber/sd-08-project-zoo-function/tree/5e99ab4c1f0b23aab684f400dcf5dcfb3f69e506 */
function oldestFromFirstSpecies(id) {
  const employeeId = employees.find((item) => item.id === id);
  const animal = animals.find((item) => employeeId.responsibleFor[0] === item.id);
  const oldest = animal.residents.map((item) => item.age).sort((a, b) => a - b);

  return Object.values(animal.residents.find((item) => item.age === oldest[0]));
}

/* Source: https://github.com/tryber/sd-08-project-zoo-function/blob/624454bd864d9badf6bdaeabfc2c929e8103720a/src/zoo.js */
function increasePrices(percentage) {
  Object.keys(prices).forEach((element) => {
    prices[element] = Math.round(prices[element] * (1 + (percentage / 100)) * 100) / 100;
  });
}

/*
function employeeCoverage(idOrName) {
  // seu código aqui
}
*/

module.exports = {
  /*
  entryCalculator,
  */

  schedule,
  animalCount,

  /*
  animalMap,
  */

  animalsByIds,
  employeeByName,

  /*
  employeeCoverage,
  */

  addEmployee,
  isManager,
  animalsOlderThan,
  oldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
