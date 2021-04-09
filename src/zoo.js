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
// dica para desestruturar objetos vindos de outro arquivo obtida no plantão da Joicy
const { animals, employees, prices } = require('./data');
// fiz esse código com ajuda da Elisa França
function animalsByIds(...ids) {
  if (ids === null) return [];
  return animals.filter((animal, index) => animal.id === ids[index]);
}

function animalsOlderThan(animal, age) {
  const animalsNames = animals.find((arr) => arr.name === animal);
  const { residents } = animalsNames;
  return residents.every((ag) => ag.age > age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) return {};
  return employees
    .find((func) => func.firstName === employeeName || func.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
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
  const manager = employees.map((arr) => arr.managers);
  return manager.some((arr, index) => arr[index] === id); // implementei o index na função some com ajuda da Carolina Vasconcelos
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  employees.push({
    id,
    firstName,
    lastName,
    managers: managers || [], // implementei o operador || nessa parte da função vendo o código do Murilo Gonçalves.
    responsibleFor: responsibleFor || [],
  });
}

function animalCount(species) {
  if (species === undefined) {
  // reduce feito com auxílio do code pull request do Murilo Gonçalves
  // entendi foi feita uma desestruturação de name e residents do array animals e salvos nas constantes de mesmo nome
  // a cada iteração do reduce o accumulator verifica a quantidade de animais de acordo com o index do current name
    return animals.reduce((accumulator, { name, residents }) => {
      accumulator[name] = residents.length;
      return accumulator;
    }, {});
  }
  const arrayOfAnimals = animals.find((animal) => animal.name === species)
    .residents.length;
  return arrayOfAnimals;
}

function entryCalculator(entrants) {
  if (!entrants || Object.entries(entrants).length === 0) return 0;
  return Object.entries(entrants)
  // precisei pesquisar em como transformar um objeto em array e achei essa documentação sobre
  // Object.entries que retorna um array contendo o par chave e valor: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
    .map(([chave, valor]) => valor * prices[chave]) // map retornando um array contendo a multiplicação do número de pessoas informado no parâmetro pelo valor contido em prices de acordo com a chave obtida no parâmetro [49.99, 24.99]
    .reduce((acc, curr) => acc + curr); // reduce no array retorna o valor do somatório de cada índice 74,98
}
console.log(entryCalculator({ Adult: 1, Senior: 1 }));
// function animalMap(options) {
//   // seu código aqui
// }

// function schedule(dayName) {
//   // seu código aqui
// }

// function oldestFromFirstSpecies(id) {
//   // seu código aqu
// }

// function increasePrices(percentage) {
//   // seu código aqui
// }

// function employeeCoverage(idOrName) {
//   // seu código aqui
// }

module.exports = {
  entryCalculator,
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
