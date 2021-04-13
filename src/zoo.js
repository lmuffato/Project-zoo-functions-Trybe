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
const { animals, employees, prices, hours } = require('./data');
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

// function animalMap(options) {
//   // seu código aqui
// }

const getWeek = (dayName) => (acc, [key, value]) => {
  if (dayName === undefined || dayName === key) {
    acc[key] = value.open !== 0
      ? `Open from ${value.open}am until ${value.close - 12}pm`
      : 'CLOSED';
  }
  return acc;
};
// código feito baseado no pull request do Lucas Pedroso. Pude lembrar a importância de separar as funções em outras menores.
function schedule(dayName) {
  return Object.entries(hours).reduce(getWeek(dayName), {});
}
// console.log(schedule());

function oldestFromFirstSpecies(idEmployee) {
  const employee = employees.find((idsearch) => idsearch.id === idEmployee);
  const firstAnimal = employee.responsibleFor[0];
  const animal = animals.find(({ id }) => id === firstAnimal);
  const { residents } = animal;
  // código feito baseado no pull request do Murilo Gonçalves. Pude perceber que era necessário guardar os resultados das Hof em constantes. Aprendi bastante na análise dos destructuring feitos nas chaves a serem usadas nos filtros buscados, o que resultou em um código muito mais limpo.
  const { name, sex, age } = residents
    .sort((a, b) => b.age - a.age)[0];
  // muito inteligênte o uso dessa lógica de organizar os números e com eles organizados pegar o que ficará na primeira posição que corresponde ao maior número.
  return [name, sex, age];
}

function increasePrices(percentage) {
  const { Adult, Child, Senior } = prices;
  // código desenvolvido com ajuda da Carolina Vasconcelos
  prices.Adult = (Math.ceil(Adult * (percentage + 100))) / 100;
  prices.Child = (Math.ceil(Child * (percentage + 100))) / 100;
  prices.Senior = (Math.ceil(Senior * (percentage + 100))) / 100;
}

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  // animalMap,
  animalsByIds,
  employeeByName,
  // employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  oldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
