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
const data = require('./data');

function animalsByIds(ids) {

}

function animalsOlderThan(animal, age) {
  const findAnimalName = animals.find((animalSpecie) => animalSpecie.name === animal);
  const adults = findAnimalName.residents.every((adult) => adult.age >= age);
  return adults;
}

// console.log(animalsOlderThan('penguins', 10));

function employeeByName(employeeName) {
  const emptyArray = {};
  if (!employeeName) return emptyArray;
  return employees.find(({ firstName, lastName }) =>
    firstName === employeeName || lastName === employeeName);
}

// console.log(employeeByName());

function createEmployee(personalInfo, associatedWith) {

  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;

  const newObj = {
    id, firstName, lastName, managers, responsibleFor,
  };

  return newObj;
}

function isManager(id) {
  return employees.some((emp) => emp.managers.includes(id));
}

// console.log(isManager('9e7d4524-363c-416a-8759-8aa7e50c0992'));

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  employees.push(newEmployee);
  // return console.log(employees);
}

function animalCount(species) {
  // seu código aqui
}

function entryCalculator(entrants) {
  // seu código aqui
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // seu código aqui
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
