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

/* ITEM vai receber tudo que vem de DATA.ANIMALS,
depois vai verificar se o que foi recebido em IDS
tem algo em comum com o recebido em ITEM,
tudo isso baseando-se pelo ID. */
function animalsByIds(...ids) {
  return data.animals.filter((item) => ids.includes(item.id));
}

/* Vai procurar (FIND) dentro de DATA.ANIMALS o primeiro
elemento na qual a propriedade NAME é igual ao parâmetro "nomeAnimals".
Depois vai verificar se TODAS (EVERY) as idades da propriedade AGE
são maiores que o parâmetro "idade" fornecido pelo teste. */
function animalsOlderThan(nomeAnimal, idade) {
  const verificarAnimal = data.animals.find(({ name }) => name === nomeAnimal);
  return verificarAnimal.residents.every(({ age }) => age > idade);
}

function employeeByName(employeeName) {
  return data.employees.filter(({ name }) => name.firstName === employeeName || name.lastName === employeeName);
}

/* function createEmployee(personalInfo, associatedWith) {
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
} */

module.exports = {
  /* entryCalculator, */
  /* schedule, */
  /* animalCount, */
  /* animalMap, */
  animalsByIds,
  employeeByName,
  /* employeeCoverage, */
  /* addEmployee, */
  /* isManager, */
  animalsOlderThan,
  /* oldestFromFirstSpecies, */
  /* increasePrices, */
  /* createEmployee, */
};
