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
const animalPorresidencia = (animal, sorted, sex) => {
  const obj = {};
  obj[animal] = data.animals.find((valor) => valor.name === animal).residents;
  if (sex) obj[animal] = obj[animal].filter((bichos) => bichos.sex === sex);
  obj[animal] = obj[animal].map((valor) => valor.name);
  if (sorted) obj[animal].sort();
  return obj;
};

function animalMap(options) {

  const { includeNames, sex, sorted } = options;
  const objeto = {};
  data.animals.forEach((valor1) => {
    objeto[valor1.location] = data.animals.filter((valor2) =>
      valor2.location === valor1.location).map((valor3) => {
      if (!includeNames) return valor3.name;
      return animalPorresidencia(valor3.name, sorted, sex);
    });
  });
  return objeto;
}
// options = {  includeNames: true, sex: 'female', sorted: true  }
// console.log(animalMap(options));

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

function increasePrices(percentage) {
  const { Adult: adultPrice, Senior: seniorPrice, Child: childPrice } = data.prices;
  data.prices.Adult = Math.round(adultPrice * (1 + (percentage / 100)) * 100) / 100;
  data.prices.Senior = Math.round(seniorPrice * (1 + (percentage / 100)) * 100) / 100;
  data.prices.Child = Math.round(childPrice * (1 + (percentage / 100)) * 100) / 100;
  return data.prices;
}

// function employeeCoverage(idOrName) {
//   // seu código aqui
// }

module.exports = {
  entryCalculator,
  // schedule,
  animalCount,
  animalMap,
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
