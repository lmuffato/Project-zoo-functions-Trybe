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

const { animals } = data;

function animalsByIds(ids) {
  const animalSearch = animals.find((animal) => animal.id === ids);
  return animalSearch;
}

function animalsOlderThan(animal, age) {
  const anima = animal;
  const ag = age;
  console.log(anima + ag); // seu código aqui
}

function employeeByName(employeeName) {
  const employ = employeeName;
  console.log(employ);
}

function createEmployee(personalInfo, associatedWith) {
  const employ = personalInfo;
  const b = associatedWith;
  console.log(employ + b);
}

function isManager(id) {
  const employ = id;
  console.log(employ);
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  const employ = id;
  const b = firstName;
  const c = lastName;
  const d = managers;
  const e = responsibleFor;
  console.log(employ + b + c + d + e);
}

function animalCount(species) {
  const employ = species;
  console.log(employ);
}

function entryCalculator(entrants) {
  const employ = entrants;
  console.log(employ);
}

function animalMap(options) {
  const employ = options;
  console.log(employ);
}

function schedule(dayName) {
  const employ = dayName;
  console.log(employ);
}

function oldestFromFirstSpecies(id) {
  const employ = id;
  console.log(employ);
}

function increasePrices(percentage) {
  const employ = percentage;
  console.log(employ);
}

function employeeCoverage(idOrName) {
  const employ = idOrName;
  console.log(employ);
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
