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

/* Requisito 1 */
function animalsByIds(...identificação) {
  return animals.filter(({ id }) => identificação.includes(id));
}
/* Requisito 2 */
function animalsOlderThan(animal, idadeMinima) {
  return animals.find((elemento) => elemento.name === animal).residents
    .every(({ age }) => age >= idadeMinima);
}
/* Requisito 3 */
function employeeByName(employeeName) {
  if (employeeName === undefined) return {};
  return employees.find((name) =>
    name.firstName === employeeName || name.lastName === employeeName);
}
/* Requisito 4 */
function createEmployee(pessoaInfo, associatedWithh) {
  return { ...pessoaInfo, ...associatedWithh };
}
/* Requisito 5 */
const isManager = ((pessoaADM) => employees.some(({ managers }) => managers.includes(pessoaADM)));

/* Requisito 6 */
function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const novofun = { id, firstName, lastName, managers, responsibleFor };
  return employees.push(novofun);
}

/* function animalCount(species) {
  // seu código aqui
} */

/* function entryCalculator(entrants) {
  // seu código aqui
} */

/* function animalMap(options) {
  // seu código aqui
} */

/* function schedule(dayName) {
  // seu código aqui
} */

/* function oldestFromFirstSpecies(id) {
  // seu código aqui
} */

/* function increasePrices(percentage) {
  // seu código aqui
} */

/* function employeeCoverage(idOrName) {
  // seu código aqui
} */

module.exports = {
  /* entryCalculator,
  schedule,
  animalCount,
  animalMap, */
  animalsByIds,
  employeeByName,
  /* employeeCoverage, */
  addEmployee,
  isManager,
  animalsOlderThan,
  /* oldestFromFirstSpecies,
  increasePrices, */
  createEmployee,
};
