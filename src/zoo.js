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

function animalsByIds(ids) {
  const animalsFilterId = data.animals.filter((animal) => {
    const filterId = animal.includes(animal.id);
    return filterId;
  });
  return animalsFilterId;
}

function animalsOlderThan(animal, age) {
  const getAnimals = data.animals.find((animalN) => {
    animalN.name === animal
  });

  const olderThan = getAnimals.residents.every((animalA) => {
    animalA.age >= age
  });
  return olderThan;

}

function employeeByName(employeeName) {
  // seu código aqui
  const employeeFind = data.employees.find((employee) => {
    const employeeFirstName = employee.firstName;
    const employeeLastName = employee.lastName;
    return employeeFirstName === employeeName || employeeLastName === employeeName;
  });
  return employeeFind;

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
  // employeeByName,
  // employeeCoverage,
  // addEmployee,
  // isManager,
  // animalsOlderThan,
  // oldestFromFirstSpecies,
  // increasePrices,
  // createEmployee,
};
