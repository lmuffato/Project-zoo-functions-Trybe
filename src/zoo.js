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

/* const data = require('./data'); */
const { animals, employees, prices } = require('./data');
/* const data = require('./data'); */

// require 01
function animalsByIds(...ids) {
  return animals.filter(({ id }) => ids.includes(id)); // this includes was based in Murilo Goncalves
}

// require 02
function animalsOlderThan(animal, animalsAge) {
  return animals
    .find(({ name }) => name === animal)
    .residents.every(({ age }) => age >= animalsAge);
}

// require 03
function employeeByName(employeeName) {
  if (!employeeName) return {};
  return employees
    .find(({ firstName, lastName }) => [firstName, lastName].includes(employeeName));
}

// require 04
function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

// require 05
function isManager(id) {
  return employees.some(({ managers }) => managers.find((manager) => manager === id));
}

// require 06
function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({ id, firstName, lastName, managers, responsibleFor });
}

// require 07
function animalCount(species) {
  const howMannyAnimals = animals.reduce((acc, crr) => { // function inspired by Lucas Pedroso
    acc[crr.name] = crr.residents.length;
    return acc;
  }, {});

  if (!species) return howMannyAnimals;
  return howMannyAnimals[species];
}

// require 08
// entrie: { 'Adult': 2, 'Child': 3, 'Senior': 1 }

// using Object.entries to transform the object in array:
function entryCalculator(entrants = 0) {
  const priceCalc = (acc, [category, qnt]) => acc + prices[category] * qnt;
  return value = Object.entries(entrants).reduce(priceCalc, 0);
}

/* function entryCalculator(entrants = 0) {
  const { Adult: adultQnt, Child: childQnt, Senior: seniorQnt } = entrants;
  const validCalc = (a, b) => (!a) ? 0 : a * b;
  return (validCalc(adultQnt, prices.Adult)) + (validCalc(childQnt, prices.Child)) + (validCalc(seniorQnt, prices.Senior));
} */

// require 09
/* function animalMap(options) {
  // seu código aqui
} */

// require 10
/* function schedule(dayName) {
  // seu código aqui
} */

// require 11
/* function oldestFromFirstSpecies(id) {
  // seu código aqui
} */

// require 12
/* function increasePrices(percentage) {
  // seu código aqui
} */

// require 13
/* function employeeCoverage(idOrName) {
  // seu código aqui
} */

module.exports = {
  animalsByIds,
  animalsOlderThan,
  employeeByName,
  createEmployee,
  isManager,
  addEmployee,
  animalCount,
  entryCalculator,
  /* schedule,
  animalMap,
  employeeCoverage,
  oldestFromFirstSpecies,
  increasePrices, */
};
