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

const { animals } = require('./data');
const { employees } = require('./data');
const data = require('./data');

// Feito colaborativamente com as colegas: Nathi Zebral, Thalita Cecilier, Debora PAssos, Djaniza Vasques Ferreira e Bia Zidioti. <3
function animalsByIds(...ids) {
  return animals.filter((animal) => ids.includes(animal.id));
}

// Inspirado na resolução do NilsonRCS > https://github.com/tryber/sd-010-a-project-zoo-functions/pull/80/files
/* Entende-se que o primeiro passo é criar uma constante que busque
qual dos animais dentro de .data, que tenham seu name igual ao parametro passado.
A segunda etapa, retorna true (every), quando a idade de todos os animais, dos passados como parametro
sejam maior ou igual do que a idade passada como parametro. */
// Feito colaborativamente com as colegas: Nathi Zebral, Thalita Cecilier, Debora PAssos. <3

function animalsOlderThan(animal, age) {
  const animalName = data.animals.find((bixo) => bixo.name === animal);
  return animalName.residents.every((idadeAnimal) => idadeAnimal.age >= age);
}

function employeeByName(employeeName) {
  if (!employeeName) {
    return {};
  }
  return employees.find((elem) =>
    elem.lastName === employeeName || elem.firstName === employeeName);
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
  // entryCalculator,
  // schedule,
  // animalCount,
  // animalMap,
  animalsByIds,
  employeeByName,
  // employeeCoverage,
  // addEmployee,
  // isManager,
  animalsOlderThan,
  // oldestFromFirstSpecies,
  // increasePrices,
  // createEmployee,
};
