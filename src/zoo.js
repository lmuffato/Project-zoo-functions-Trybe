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
  // seu código aqui
  const ani = [];
  data.animals.forEach((el, i) => {
    if (el.id === ids[i]) {
      ani.push(el);
    }
  });
  return ani;
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  const ani = data.animals.find((cate) => cate.name === animal);
  return ani.residents.every((arr) => arr.age > age);
}

function employeeByName(emp) {
  // seu código aqui
  let pessoa = data.employees.find((trab) => trab.firstName === emp || trab.lastName === emp);
  if (!emp) pessoa = {};
  return pessoa;
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  // seu código aqui
  return data.employees.some(({ managers }) => managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  const Funcionario = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  data.employees.push(Funcionario);
  return Funcionario;
}

function animalCount(species) {
  // seu código aqui
  if (!species) {
    let especie = 0;
    data.animals.forEach((animalSpecie) => {
      if (animalSpecie.name === species) {
        especie = animalSpecie.residents.length;
      }
    });
    return especie;
  }
  const animalsList = data.animals.map((animal) => ({ [animal.name]: animal.residents.length }));
  const animalToObj = animalsList.reduce((obj, item) => Object.assign(obj, item), {});
  return animalToObj;
}

function entryCalculator(entrants) {
  // seu código aqui
  if (!entrants || Object.entries(entrants).length === 0) return 0;
  const { prices } = data;
  return Object
    .entries(entrants)
    .map(([key, value]) => value * prices[key])
    .reduce((acc, cValue) => acc + cValue);
}

/*
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
}
*/

module.exports = {
  entryCalculator,
  //  schedule,
  animalCount,
  //  animalMap,
  animalsByIds,
  employeeByName,
  //  employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  //  oldestFromFirstSpecies,
  //  increasePrices,
  createEmployee,
};
