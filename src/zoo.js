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
  const { animals } = data;
  const arrAnimals = animals.filter(({ id }) => ids.includes(id));
  return arrAnimals;
}

function animalsOlderThan(animal, age) {
  const searchAnimal = data.animals.find(({ name }) => name === animal);
  return searchAnimal.residents.every(({ age: idade }) => idade > age);
}

function employeeByName(employeeName) {
  const objEmployee = data.employees.find(
    ({ firstName, lastName }) =>
      employeeName === firstName || employeeName === lastName,
  );
  return !employeeName ? {} : objEmployee;
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(thisId) {
  const checkIsManager = data.employees.some((manager) =>
    manager.managers.includes(thisId),
  );
  return checkIsManager;
}

function addEmployee(
  id,
  firstName,
  lastName,
  managers = [],
  responsibleFor = [],
) {
  const createObj = { id, firstName, lastName, managers, responsibleFor };
  const addObjEmployee = data.employees.push(createObj);
  return addEmployee;
}

function animalCount(species) {
  const animalObj = data.animals.find(({ name }) => name === species);
  const calcPopul = data.animals.reduce((acc, cur) => {
    acc[cur.name] = cur.residents.length;
    return acc;
  }, {});
  return !species ? calcPopul : animalObj.residents.length;
}

function entryCalculator(entrants) {
  const objIsEmpty = (obj) => Object.keys(obj).length === 0;
  if (!entrants || objIsEmpty(entrants)) return 0;
  const {
    Adult: priceAdult,
    Child: priceChild,
    Senior: princeSenior,
  } = data.prices;
  const listPrices = entrants;
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  const sumPrinces =
    Adult * priceAdult + Child * priceChild + Senior * princeSenior;
  return sumPrinces;
}

console.log(entryCalculator({ Adult: 2, Child: 3, Senior: 1 }));

function animalMap(_options) {
  // seu código aqui
}

function schedule(_dayName) {
  // seu código aqui
}

function oldestFromFirstSpecies(id) {
  /* Passado o id de um funcionário
  encontra a primeira espécie de animal gerenciado pelo funcionário
  e retorna um array com nome, sexo e idade do animal mais velho dessa espécie */
  // const firstAnimal = data.animals.find(({ id: specieId }) => specieId);
  // const oldestAnimal = firstAnimal.residents.reduce(
  //   (acc, { age }) => (acc > age ? acc : age),
  //   0,
  // );
  // const olderFind = firstAnimal.residents.find(
  //   ({ age }) => age === oldestAnimal,
  // );
  // return [olderFind.name, olderFind.sex, olderFind.age];
}

// console.log(oldestFromFirstSpecies('9e7d4524-363c-416a-8759-8aa7e50c0992'));
function increasePrices(_percentage) {
  // seu código aqui
}

function employeeCoverage(_idOrName) {
  // seu código aqui
}

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  animalMap,
  animalsByIds,
  employeeByName,
  employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  oldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
