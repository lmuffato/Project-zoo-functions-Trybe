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

function animalsByIds(...ids) {
  return data.animals.filter(({ id }) => ids.includes(id));
}

function animalsOlderThan(animal, age) {
  const especies = data.animals.find((especie) => especie.name === animal);
  return especies.residents.every((idd) => idd.age > age);
}

// Código implementado com base no código de Nilson Ribeiro
function employeeByName(employeeName) {
  if (!employeeName) return {};
  return data.employees.find(({ firstName, lastName }) => firstName === employeeName
  || lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return newEmployee;
}

function isManager(id) {
  return data.employees.some((employee) => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  data.employees.push(newEmployee);
}

function animalCount(species) {
  if (species === undefined) {
    return data.animals.reduce((acc, curAnimal) => {
      acc[curAnimal.name] = curAnimal.residents.length;
      return acc;
    }, {});
  }
  return data.animals.find(({ name }) => name === species).residents.length;
}

function entryCalculator(entrants) {
  if (typeof entrants === 'undefined' || entrants === {}) return 0;
  const { Adult = 0, Senior = 0, Child = 0 } = entrants;
  const { Adult: numberAdult, Senior: numberSenior, Child: numberChild } = data.prices;
  return (numberAdult * Adult) + (numberSenior * Senior) + (numberChild * Child);
}

// function animalMap(options) {
//   // seu código aqui
// }

function schedule(dayName) {
  const { hours } = data;
  const obj = {};
  createObj(hours, obj);
  if (!dayName) return obj;
  return { [dayName]: obj[dayName] };
}

function oldestFromFirstSpecies(id) {
  const employee = data.employees.find((person) => person.id === id).responsibleFor[0];
  const animalSearch = animals.find((animalFound) => animalFound.id === employee);
  const { residents } = animalSearch;
  const result = residents.sort((a, b) => b.age - a.age)[0];
  const { name, sex, age } = result;

  return [name, sex, age];
}

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
  // animalMap,
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
