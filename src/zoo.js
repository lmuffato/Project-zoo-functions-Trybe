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
const data = require('./data');

function animalsByIds(...ids) {
  const animalsSpecies = ids.map((elem) => animals.find((elem2) => elem === elem2.id));
  return animalsSpecies;
}

function animalsOlderThan(animal, age) {
  const animalsAge = animals.filter((elem) => animal === elem.name)
    .forEach((elem2) => elem2.residents.every((elem3) => elem3.age >= age));
  return animalsAge;
}

function employeeByName(employeeName = {}) {
  return employees.find((elem) =>
    elem.lastName === employeeName || elem.firstName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return {
    ...personalInfo,
    ...associatedWith,
  };
}

function isManager(id) {
  return employees.some((elem) => elem.managers.some((elem2) => elem2 === id));
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {
  if (!species) {
    return animals.reduce((acc, elem) => {
      acc[elem.name] = elem.residents.length;
      return acc;
    }, {});
  }
  return animals.find((elem) => elem.name === species).residents.length;
}

function entryCalculator(entrants) {
  if (!entrants || Object.keys(entrants).length === 0) return 0;
  const { Adult, Child, Senior } = entrants;
  return Adult * prices.Adult + Child * prices.Child + Senior * prices.Senior;
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  const obj = {};
  Object.keys(hours).forEach((elem) => {
    if (elem !== 'Monday') {
      obj[elem] = `Open from ${hours[elem].open}am until ${hours[elem].close - 12}pm`;
    } else {
      obj[elem] = 'CLOSED';
    }
  });
  if (!dayName) {
    return obj;
  }
  return { [dayName]: obj[dayName] };
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
