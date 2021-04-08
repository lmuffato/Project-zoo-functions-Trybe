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

const functionsAnimals = require('./functions/animals');
const functionsEmployee = require('./functions/employee');

function animalsByIds(...ids) {
  const emptyParams = ids.length === 0;
  const justOneId = ids.length === 1;

  const { find } = functionsAnimals;

  if (emptyParams) return [];

  if (justOneId) {
    const id = ids[0];
    const foundAnimal = find.byId.oneId(id);
    return [foundAnimal];
  }

  const foundAnimals = find.byId.multipleIds(ids);
  return foundAnimals;
}

function animalsOlderThan(animal, age) {
  const { verify } = functionsAnimals;
  const haveMinimumAge = verify.age.minimumAge(animal, age);
  if (haveMinimumAge) return true;
  return false;
}

function employeeByName(employeeName) {
  const { find } = functionsEmployee;
  const byFirstName = find.byName.firstName(employeeName);
  const byLastName = find.byName.lastName(employeeName);

  if (byFirstName.found) return byFirstName.result;
  if (byLastName.found) return byLastName.result;
  return {};
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;

  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };

  return newEmployee;
}

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
  animalsOlderThan,
  // oldestFromFirstSpecies,
  // increasePrices,
  createEmployee,
};
