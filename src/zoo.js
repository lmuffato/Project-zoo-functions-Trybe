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

// Requisito 1

function animalsByIds(...ids) {
  const searchById = data.animals.filter((animal) => ids.some((id) => id === animal.id) === true);
  return searchById;
}

// Requisito 2

function animalsOlderThan(animal, age) {
  const animalParametro = data.animals.find(({ name }) => name === animal);
  const idadeMinima = animalParametro.residents.every((name) => name.age >= age);
  return idadeMinima;
}

// Requisito 3

function employeeByName(employeeName) {
  const funcionario = data.employees
    .find((pessoa) => pessoa.lastName === employeeName || pessoa.firstName === employeeName);
  if (funcionario === undefined) return {};
  return funcionario;
}

// Requisito 4

function createEmployee(personalInfo, associatedWith) {
  const newColaboration = {
    ...personalInfo,
    ...associatedWith,
  };
  return newColaboration;
}

// Requisito 5

function isManager(id) {
  return data.employees.some((colaboration) => colaboration.managers
    .some((item) => item === id) === true);
}

// Requisito 6

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

// Requisito 7

function animalCount(species) {
  const searchSpecie = data.animals.find((animal) => animal.name === species);
  if (searchSpecie !== undefined) {
    return searchSpecie.residents.length;
  }
  const quantAnimais = {};

  data.animals.forEach((item) => { quantAnimais[item.name] = item.residents.length; });
  return quantAnimais;
}

// Requisito 8

// function entryCalculator(entrants) {
//   // const [adult, child, senior] = [data.prices.Adult, data.prices.Child, data.prices.Senior];
//   if (typeof entrants === 'object' && entrants) {
//     return 5;
//   }
//   return 0;
// }

// console.log(entryCalculator({ 'Adult': 2, 'Child': 3, 'Senior': 1 }));

// Requisito 9

// function animalMap(options) {
//   const localizacao = data.animals.map((animal) => animal.location);
//   return {
//     NE: [],
//     NW: []
//   };
// }

// console.log(animalMap());

// Requisito 10

// function schedule(dayName) {

// }

// console.log(schedule());
// console.log(data.hours);

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
