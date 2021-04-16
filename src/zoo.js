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

const { animals, employees } = data;

function animalsByIds(...ids) {
  return animals.filter((animal) => ids.find((id) => id === animal.id));
}

function animalsOlderThan(animal, age) {
  return animals.find((anml) => anml.name === animal).residents.every((anim) => anim.age >= age);
}

function employeeByName(employeeName) {
  const employee = employees
    .find((emply) => employeeName === emply.firstName || employeeName === emply.lastName);
  const employeeObj = { ...employee };
  return employeeObj;
}

function createEmployee(personalInfo, associatedWith) {
  const employeeObj = {
    id: personalInfo.id,
    firstName: personalInfo.firstName,
    lastName: personalInfo.lastName,
    managers: associatedWith.managers,
    responsibleFor: associatedWith.responsibleFor,
  };
  return employeeObj;
}

function isManager(searchId) {
  return employees.find((employee) => employee.id === searchId).managers.length === 1;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };

  employees.push(newEmployee);
}

/* eslint-disable no-param-reassign */
function animalCount(species) {
  if (species) {
    return animals.find((animal) => animal.name === species).residents.length;
  }

  const allAnimals = animals.reduce((objAnimal, currAnimal) => {
    objAnimal[currAnimal.name] = currAnimal.residents.length;
    return objAnimal;
  }, {});
  return allAnimals;
}
/* eslint-disable no-param-reassign */

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
