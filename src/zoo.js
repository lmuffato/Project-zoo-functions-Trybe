/* eslint-disable no-return-assign */
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

// const assert = require('assert');

const { animals, employees, hours, prices } = require('./data.js');

function animalsByIds(...ids) {
  // seu código aqui
  return animals.filter((animal) => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  return animals
    .find((specimen) => specimen.name === animal).residents
    .every((specimen) => specimen.age >= age);
}

function employeeByName(employeeName) {
  // seu código aqui
  if (employeeName === undefined) {
    return {};
  }

  return employees
    .find((employee) => employee.firstName === employeeName || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  const employee = { ...personalInfo, ...associatedWith };
  return employee;
}

function isManager(id) {
  // seu código aqui
  return employees.some(({ managers }) => managers.indexOf(id) !== -1);
}

function addEmployee(id = 0, firstName = 'None', lastName = 'None',
  managers = [], responsibleFor = []) {
  // seu código aqui
  employees[employees.length] = { id, firstName, lastName, managers, responsibleFor };
  return employees;
}

function animalCount(species) {
  // seu código aqui
  if (species === undefined) {
    const animalsObject = animals.reduce((acc, curr) => {
      acc[curr.name] = curr.residents.length;
      return acc;
    }, {});
    return animalsObject;
  }
  const specie = animals.find((animal) => animal.name === species);
  return specie.residents.length;
}

function entryCalculator(entrants) {
  // seu código aqui
  if (entrants === undefined || Object.keys(entrants).length === 0) {
    return 0;
  }
  const totalPrice = Object.keys(entrants).reduce((acc, curr) => (
    acc + (entrants[curr] * prices[curr])
  ), 0);
  return totalPrice;
}

function getLocation() {
  const newObjt = {};
  // const animalsLocation = animals
  animals.map((animal) => animal.location)
    .forEach((region) => {
      newObjt[region] = animals.filter((specimen) => specimen.location === region)
        .map((animal) => animal.name);
    });
  return newObjt;
}

function addNames() { }

function animalMap(options) {
  // Com funcionalidades sugeridas por Wanderson Sales
  // seu código aqui
  if (options === undefined) return getLocation();
  if (options.valueOf('includeNames') === true) return addNames();
}

// console.log(animalMap());

function returnDays(day) {
  const openHour = hours[day].open;
  const closeHour = hours[day].close;

  if (openHour === 0 && closeHour === 0) return 'CLOSED';
  return `Open from ${openHour}am until ${closeHour - 12}pm`;
}

function schedule(dayName) {
  // seu código aqui
  // Com alterações sugeridas por Orlando Flores
  const newObjt = {};
  const days = Object.keys(hours);
  if (dayName === undefined) {
    days.forEach((day) => { newObjt[day] = returnDays(day); });
    return newObjt;
  }
  if (dayName !== undefined) {
    newObjt[dayName] = returnDays(dayName);
    return newObjt;
  }
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
  let oldest = [];
  const specie = employees.find((employee) => employee.id === id).responsibleFor[0];
  animals.find((animal) => animal.id === specie).residents
    .forEach((spec, index) => {
      if (index === 0) {
        oldest = [spec.name, spec.sex, spec.age];
      }
      if (spec.age > oldest[2]) {
        oldest = [spec.name, spec.sex, spec.age];
      }
    });
  return oldest;
}

console.log(oldestFromFirstSpecies('9e7d4524-363c-416a-8759-8aa7e50c0992'));

// function increasePrices(percentage) {
//   // seu código aqui
// }

// function employeeCoverage(idOrName) {
//   // seu código aqui
// }

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  animalMap,
  animalsByIds,
  employeeByName,
  // employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  oldestFromFirstSpecies,
  // increasePrices,
  createEmployee,
};
