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

const { animals } = require('./data');
// const data = require('./data');

function animalsByIds(...ids) {
  return animals.filter((animal) => ids.includes(animal.id));
}

// function animalsOlderThan(animal, age) {}

// function employeeByName(employeeName) {}

// function createEmployee(personalInfo, associatedWith) {}

// function isManager(id) {}

// function addEmployee(id, firstName, lastName, managers, responsibleFor) {}

// function animalCount(species) {}

// function entryCalculator(entrants) {}

// function animalMap(options) {}

// function schedule(dayName) {}

// function oldestFromFirstSpecies(id) {}

// function increasePrices(percentage) {}

// function employeeCoverage(idOrName) {}

module.exports = {
  // entryCalculator,
  // schedule,
  // animalCount,
  // animalMap,
  animalsByIds,
  // employeeByName,
  // employeeCoverage,
  // addEmployee,
  // isManager,
  // animalsOlderThan,
  // oldestFromFirstSpecies,
  // increasePrices,
  // createEmployee,
};
