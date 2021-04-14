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

const { animals, employees, prices } = data;
// console.log(animals);
function animalsByIds(...ids) {
  return animals
    .filter((animal) => ids.find((id) => id === animal.id));
}
// console.log(animalsByIds('0938aa23-f153-4937-9f88-4858b24d6bce', 'e8481c1d-42ea-4610-8e11-1752cfc05a46'));
//----------------------------------------------------------

function animalsOlderThan(animal, age) {
  // recuperar os animais e comparar o nome com o animal passado por parametro
  // recuparar a idade dos animais
  // comparar se todos os animais de uma especie tem a idade minima
  // seu código aqui
  // const species = [animals.name];
  return animals.find(({ name }) => name === animal).residents
    .every(({ age: animalAge }) => animalAge >= age);
}

//----------------------------------------------------------
// Dica fechamento dia 09/04 Guilherme e V.

function employeeByName(employeeName) {
  // const { employees } = data;
  if ((!employeeName)) {
    return {};
  }
  return employees
    .find((employee) => employee.firstName === employeeName || employee.lastName === employeeName);
  // seu código aqui
}
//----------------------------------------------------------
function createEmployee(personalInfo, associatedWith) {
  // 1º A partir dos objetos recebidos por parametros cria um novo objeto
  // seu código aqui
  const newEmployee = {
    ...personalInfo,
    ...associatedWith,
  };
  return newEmployee;
}
//----------------------------------------------------------
function isManager(id) {
  // se o array manager está vazio
  // retornar true se estiver vazio,  falso caso esteja preenchido
  return employees.map(({ managers }) => [managers])
    .some(([managers], index) => managers[index] === id);
}
//----------------------------------------------------
function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  employees.push(newEmployee);
}
//----------------------------------------------------------
// Esta função é responsável por contabilizar a quantidade de animais.
function animalCount(species) {
  // seu código aqui
  // Sem parâmetros, retorna um objeto com animais e suas quantidades
  const newObject = {};
  animals.forEach(({ name, residents }) => {
    newObject[name] = residents.length;
  });
  if (!species) {
    return newObject;
  }
  // Com o nome de uma espécie de animal, retorna um número com somente a quantidade
  // O que será avaliado
  return newObject[species];
}

//----------------------------------------------------------
function entryCalculator({ Adult = 0, Child = 0, Senior = 0 } = 0) {
  const sumAdult = Adult * prices.Adult;
  const sumSenior = Senior * prices.Senior;
  const sumChild = Child * prices.Child;
  const totalSum = [sumAdult, sumSenior, sumChild];
  return totalSum.reduce(((acumulador, valorAtual) => acumulador + valorAtual), 0);
}
//----------------------------------------------------------
// function animalMap(options) {
//   // seu código aqui
// }
//----------------------------------------------------------
// function schedule(dayName) {
//   // seu código aqui
// }
//----------------------------------------------------------
// function oldestFromFirstSpecies(id) {
//   // seu código aqui
// }
//----------------------------------------------------------
// function increasePrices(percentage) {
//   // seu código aqui
// }
//----------------------------------------------------------
// function employeeCoverage(idOrName) {
//   // seu código aqui
// }
//----------------------------------------------------------
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
