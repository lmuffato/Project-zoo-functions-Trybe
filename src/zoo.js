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
const {animals: [{residents}]} = data;

function animalsByIds(...ids) {
  const retornar = [];
  for (let index = 0; index < ids.length; index += 1) {
    retornar.push(...data.animals.filter((anima) => anima.id === ids[index]));
  }
  return retornar;
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  // olhei sintaxe de outros colegas para corrigir erros:
  // https://github.com/tryber/sd-010-a-project-zoo-functions/blob/LucasPedroso-project-zoo-functions/src/zoo.js
  // e outros
  return data
  .animals.find((animalData) => animal === animalData.name)
  .residents.every((resid) => resid.age >= age); 
}

/* function employeeByName(employeeName) {
  // seu código aqui
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
}

function isManager(id) {
  // seu código aqui
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
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
}*/
module.exports = {
  // entryCalculator,
  // schedule,
  // animalCount,
  // animalMap,
  animalsByIds,
  // employeeByName,
  // employeeCoverage,
  // addEmployee,
  // isManager,
  animalsOlderThan,
  // oldestFromFirstSpecies,
  // increasePrices,
  // createEmployee,
};
