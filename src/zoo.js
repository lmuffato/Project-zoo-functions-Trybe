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

function animalsByIds(...ids) {
  // 1 - seu código aqui
  const resposta = data.animals.filter((valor) => {
    const resposta2 = ids.find((valor2) => valor2 === valor.id);
    return resposta2;
  });
  return resposta;
}

function animalsOlderThan(animal, age) {
  // 2 - seu código aqui
  const resposta = data.animals.find((valor) => valor.name === animal);
  const resposta2 = resposta.residents.every((valor2) => valor2.age > age);
  return resposta2;
}

function employeeByName(employeeName) {
  // 3 - seu código aqui
  const resposta = data.employees.find((valor) =>
    valor.firstName === employeeName || valor.lastName === employeeName) || {};
  return resposta;
}

// console.log(employeeByName('Wishart'));

function createEmployee(personalInfo, associatedWith) {
  // 4- seu código aqui
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  // 5 - seu código aqui
  return data.employees.some((valor2) => valor2.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // 6 - Seu cógigo aqui
  const newEmployee = { id, firstName, lastName, managers, responsibleFor };
  data.employees.push(newEmployee);
  return data.employees;
}

function animalCount(species) {
  // 7 - seu código aqui
  if (species) {
    return data.animals.find((valor) =>
      valor.name === species).residents.length;
  }
  const resposta = {};
  data.animals.forEach((valor) => {
    resposta[valor.name] = valor.residents.length;
  });
  return resposta;
}

function entryCalculator(entrants) {
  // 8 - seu código aqui
  if (typeof (entrants) === 'undefined' || Object.keys(entrants).length === 0) { return 0; }
  let total = 0;

  const { Adult = 0, Child = 0, Senior = 0 } = entrants;

  total += Adult * data.prices.Adult;
  total += Child * data.prices.Child;
  total += Senior * data.prices.Senior;

  return total;
}

// function animalMap(options) {
//   // seu código aqui
// }

// function schedule(dayName) {
//   // seu código aqui
// }

function oldestFromFirstSpecies(id) {
  // 11- seu código aqui
  const procurandoAnimal = data.employees.find(({ id: employeeId }) =>
    id === employeeId).responsibleFor[0];

  const todosAnimais = data.animals.find(({ id: animalId }) =>
    animalId === procurandoAnimal).residents;

  const animalMaisVelho = todosAnimais.sort(({ age: valorA }, { age: valorB }) =>
    valorB - valorA)[0];  

    return Object.values(animalMaisVelho);
}
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
  oldestFromFirstSpecies,
  // increasePrices,
  createEmployee,
};
