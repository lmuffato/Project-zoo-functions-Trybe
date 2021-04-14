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

const obj = {
  lions: 4,
  tigers: 2,
  bears: 3,
  penguins: 4,
  otters: 4,
  frogs: 2,
  snakes: 2,
  elephants: 4,
  giraffes:6,
};

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

function employeeByName(employeeName) {
  // seu código aqui
  if (!employeeName) return {};
  return data.employees
    .find((employee) => employee.firstName === employeeName || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
}

function isManager(id) {
  // seu código aqui
  return data
    .employees.find((employee) => id === employee.id)
    .managers.some((m) => m === '9e7d4524-363c-416a-8759-8aa7e50c0992');
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  return data
    .employees.push({
      id,
      firstName,
      lastName,
      managers,
      responsibleFor,
    });
}

function animalCount(species) {
  // seu código aqui
  if (!species) return obj;
  return data
    .animals.find(({ name }) => name === species)
    .residents.length
}

/* function entryCalculator(entrants) {
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
} */
module.exports = {
  // entryCalculator,
  // schedule,
  animalCount,
  // animalMap,
  animalsByIds,
  employeeByName,
  // employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  // oldestFromFirstSpecies,
  // increasePrices,
  createEmployee,
};
