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

// const { animals } = require('./data');
const data = require('./data');
const { animals, employees } = data;

function animalsByIds(...ids) {
  const resultArray = [];
  ids.forEach((idParam, index) =>
    (animals[index].id === idParam ? resultArray.push(animals[index]) : resultArray));
  return resultArray;
}

function animalsOlderThan(animalName, age) {
  const objAnimal = animals.find((animal) => animal.name === animalName);
  const result = objAnimal.residents.every((secondAnimal) => secondAnimal.age >= age);
  return result;
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  return employees.find((em) => (em.firstName === employeeName || em.lastName === employeeName));
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
