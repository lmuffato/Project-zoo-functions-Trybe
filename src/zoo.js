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

const { animals, employees } = require('./data');
// const data = require('./data');

function animalsByIds(...ids) {
  if (ids.length >= 1) {
    return animals.filter((animal) => ids.some((id) => animal.id === id));
  }
  return [];
}

// function animalsOlderThan(animalName, age) {
//   animals.every((animal) => )
// }
// employees: [
//   {
//     id: 'c5b83cb3-a451-49e2-ac45-ff3f54fbe7e1',
//     firstName: 'Nigel',
//     lastName: 'Nelson',
//     managers: [burlId, olaId],
//     responsibleFor: [lionId, tigersId],
//   },
function employeeByName(employeeName) {
  if (employeeName !== undefined) {
    return employees.find((name) => name.firstName === employeeName
    || name.lastName === employeeName);
  }
  return {};
}

// function createEmployee(personalInfo, associatedWith) {
//   // seu código aqui
// }

// function isManager(id) {
//   // seu código aqui
// }

// function addEmployee(id, firstName, lastName, managers, responsibleFor) {
//   // seu código aqui
// }

// function animalCount(species) {
//   // seu código aqui
// }

// function entryCalculator(entrants) {
//   // seu código aqui
// }

// function animalMap(options) {
//   // seu código aqui
// }

// function schedule(dayName) {
//   // seu código aqui
// }

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
  // entryCalculator,
  // schedule,
  // animalCount,
  // animalMap,
  animalsByIds,
  employeeByName,
  // employeeCoverage,
  // addEmployee,
  // isManager,
  // animalsOlderThan,
  // oldestFromFirstSpecies,
  // increasePrices,
  // createEmployee,
};
