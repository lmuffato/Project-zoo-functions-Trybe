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

const { animals, employees, prices, hours } = data;

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
/* Requisito 7 - Obtive ajuda do Anderson Silva amigo da turma 10. */
const animalCount = ((species) => species === undefined ? animals.reduce((acc, bicho) =>
  Object.assign(acc, { [bicho.name]: bicho.residents.length }), {}) : animals.find((animal) => animal.name === species).residents.length);

/* Requisito 8 - Obtive ajuda do Anderson Silva amigo da turma 10. */
const entryCalculator = ((entrants = 0) => {
  const newArrOfCategories = Object.keys(entrants);
  return newArrOfCategories.reduce((acc, categories) =>
  acc + entrants[categories] * prices[categories], 0);  
});

/* function animalMap(options) {
  // seu código aqui
} */

/* Requisito 10 - Obtive ajuda do Anderson Silva amigo da turma 10. */
const horary = (all) => ({ [all[0]]: all[0] === 'Monday' ? 'CLOSED' :
  `Open from ${all[1].open}am until ${all[1].close - 12}pm` });

function schedule(dayName) {
  const daysHour = Object.entries(hours);
  return dayName === undefined ? daysHour.reduce((acc, curr) =>
    Object.assign(acc, horary(curr)), {}) :
      daysHour.map((each) => horary(each)).find((onlyOne) => onlyOne[dayName]);
}

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
  entryCalculator,
  schedule,
  animalCount,
  /* animalMap, */
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
