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

const { employees } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  return data.animals.filter((specie, index) => specie.id === ids[index]);
}

function animalsOlderThan(animal, age) {
  return data.animals
    .find((specie) => specie.name === animal)
    .residents.every((ageSpecie) => ageSpecie.age > age);
}
console.log(animalsOlderThan('otters', 7));

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return employees.find((managers) => managers.firstName === employeeName
  || managers.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return data.employees
    .some((gerente) => gerente.managers
      .some((manager) => manager === id));
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  const array = [];
  array.id = id;
  array.firstName = firstName;
  array.lastName = lastName;
  array.manager = [...managers];
  array.responsibleFor = [...responsibleFor];
  employees.push(array);
}

function animalCount(species) {
  const animalPop = {};
  data.animals.forEach((animal) => animalPop[animal.name] = animal.residents.length);
  if (species === undefined) return animalPop;
  return animalPop[species];
}

function entryCalculator(...entrants) {
  
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
