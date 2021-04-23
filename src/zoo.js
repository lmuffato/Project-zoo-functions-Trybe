// const data = require('./data');
const { animals, employees } = require('./data'); // object destructuring

function animalsByIds(...ids) { // rest
  if (!ids) { // ! = negação
    return [];
  }
  return animals.filter(({ id }) => ids.some((a) => id === a));
}

function animalsOlderThan(animal, idade) {
  return animals
    .find(({ name }) => name === animal)
    .residents.every(({ age }) => age >= idade);
}

function employeeByName(employeeName) {
  if (!employeeName) {
    return {};
  }
  return employees.find((empregado) => (
    (empregado.firstName === employeeName || empregado.lastName === employeeName)));
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
  animalsOlderThan,
  // oldestFromFirstSpecies,
  // increasePrices,
  // createEmployee,
};
