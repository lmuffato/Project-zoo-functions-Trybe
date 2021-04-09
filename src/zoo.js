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
// const lionId = '0938aa23-f153-4937-9f88-4858b24d6bce';
// const ottersId = '533bebf3-6bbe-41d8-9cdf-46f7d13b62ae';
// const elephantsId = 'bb2a76d8-5fe3-4d03-84b7-dba9cfc048b5';
// const snakesId = '78460a91-f4da-4dea-a469-86fd2b8ccc84';
// const frogsId = '89be95b3-47e4-4c5b-b687-1fabf2afa274';
// const bearsId = 'baa6e93a-f295-44e7-8f70-2bcdc6f6948d';
// const tigersId = 'e8481c1d-42ea-4610-8e11-1752cfc05a46';
// /* ============================================================ */
// const stephanieId = '9e7d4524-363c-416a-8759-8aa7e50c0992';
// const olaId = 'fdb2543b-5662-46a7-badc-93d960fdc0a8';
// const burlId = '0e7b460e-acf4-4e17-bcb3-ee472265db83';

const data = require('./data');

function animalsByIds(...ids) {
  if (ids.length === 0) return [];
  return ids.map((id) => data.animals.find((animal) => animal.id === id));
}

function animalsOlderThan(animalName, age) {
  return data.animals.find((animal) =>// Encontra o objeto do animal com o nome animalName
    animal.name === animalName).residents.map((resident) =>// Acessa a propriedade residents e cria um array com as idades
    resident.age).every((howOld) => howOld > age);// Por fim verifica se cada uma dessas idades são maiores que age
}

// Pega todos os objetos dentro de data.employees, obtem os valores das chaves e verifica se está incluído employeeName
function employeeByName(employeeName) {
  if (employeeName === undefined) return {};
  return data.employees.find((employee) => Object.values(employee).includes(employeeName));
}

function createEmployee(personalInfo, associatedWith) {
  return {
    ...personalInfo,
    ...associatedWith,
  };
}

function isManager(id) {
  return (data.employees.find((employee) => employee.managers.includes(id)) !== undefined);
}

// function addEmployee(id, firstName, lastName, managers, responsibleFor) {
//   // seu código aqui
// }

// function animalCount(species) {
//   // seu código aqui
// }

// function entryCalculator(entrants) {
//   // seu código aqui
// }

// function animalMap(options) {
//   // seu código aqui
// }

// function schedule(dayName) {
//   // seu código aqui
// }

// function oldestFromFirstSpecies(id) {
//   // seu código aqui
// }

// function increasePrices(percentage) {
//   // seu código aqui
// }

// function employeeCoverage(idOrName) {
//   // seu código aqui
// }

module.exports = {
  // entryCalculator,
  // schedule,
  // animalCount,
  // animalMap,
  animalsByIds,
  employeeByName,
  // employeeCoverage,
  // addEmployee,
  isManager,
  animalsOlderThan,
  // oldestFromFirstSpecies,
  // increasePrices,
  createEmployee,
};
