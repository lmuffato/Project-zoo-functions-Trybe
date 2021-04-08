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

function animalsByIds(...ids) {
  if (!ids) return [];
  return animals.filter((animal) => {
    return ids.includes(animal.id);
  });
}

function animalsOlderThan(animal, age) {
  const animalFromThatSpecies = animals.find(({name}) => {return name === animal});
  return animalFromThatSpecies.residents.every((resident) => resident.age >= age);
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  return employees.find((employee => {
    return employee.firstName === employeeName || employee.lastName === employeeName;
  }));
}

function createEmployee(personalInfo, associatedWith) {
  const {id, firstName, lastName} = personalInfo;
  const {managers, responsibleFor} = associatedWith;
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor
  };
  return newEmployee;
}

function isManager(id) {
  const manager = employees.find(({managers}) => managers.length === 0);
  return manager.id === id;
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  
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
