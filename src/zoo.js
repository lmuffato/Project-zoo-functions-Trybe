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

const { animals, employees, prices } = require('./data');
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
  return '0e7b460e-acf4-4e17-bcb3-ee472265db83' === id;
}

function addEmployee(id, firstName, lastName, managers=[], responsibleFor=[]) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor
  };
  employees.push(newEmployee);
}

function animalCount(species) {
  if (!species) {
    return animals.map(({name, residents}) => {
      {`${name}: ${residents.length}`};
    });
  };
  const animalFromThatSpecies = animals.find(({name}) => name === species);
  return animalFromThatSpecies.residents.length;
}

console.log(animalCount())

function entryCalculator(entrants={}) {
  if (!entrants || entrants === {}) return 0;
  const {Adult=0, Child=0, Senior=0} = entrants;
  const finalPrice = (Adult * 49.99) + (Child * 20.99) + (Senior * 24.99);
  return finalPrice;
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
