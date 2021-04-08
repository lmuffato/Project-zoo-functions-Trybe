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

// Requisito 1

// function animalsByIds(...ids) {
//   const searchById = data.animals.filter((animal) => ids.some((id) => id === animal.id) === true);
//   return searchById;
// }

// Requisito 2

// function animalsOlderThan(animal, age) {
//   const animalParametro = data.animals.find(({ name }) => name === animal);
//   const idadeMinima = animalParametro.residents.every((name) => name.age >= age);
//   return idadeMinima;
// }

// Requisito 3

// function employeeByName(employeeName) {
//   const funcionario = data.employees
//     .find((pessoa) => pessoa.lastName === employeeName || pessoa.firstName === employeeName);
//   if (funcionario === undefined) return {};
//   return funcionario;
// }

// Requisito 4

// function createEmployee(personalInfo, associatedWith) {
//   const newColaboration = {
//     ...personalInfo,
//     ...associatedWith,
//   };
//   return newColaboration;
// }

// Requisito 5

// function isManager(id) {
//   return data.employees.some((colaboration) => colaboration.managers
//     .some((item) => item === id) === true);
// }

// Requisito 6

// function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
//   data.employees.push({
//     id,
//     firstName,
//     lastName,
//     managers,
//     responsibleFor,
//   });
// }

// Requisito 7

const data = require('./data');

function animalCount(species) {
  const searchSpecie = data.animals.find((animal) => animal.name === species);
  if (searchSpecie !== undefined) {
    return searchSpecie.residents.length;
  }
  const quantAnimais = {};

  data.animals.forEach((item) => quantAnimais[item.name] = item.residents.length );
  
  return quantAnimais;
}

console.log(animalCount('cobra'));

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

// module.exports = {
//   // entryCalculator,
//   // schedule,
//   // animalCount,
//   // animalMap,
//   animalsByIds,
//   employeeByName,
//   // employeeCoverage,
//   // addEmployee,
//   isManager,
//   animalsOlderThan,
//   // oldestFromFirstSpecies,
//   // increasePrices,
//   createEmployee,
// };
