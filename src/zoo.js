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

function addEmployee(_id, _firstName, _lastName, _managers, _responsibleFor) {
  // seu código aqui
}

function animalCount(_species) {
  // seu código aqui
}

function entryCalculator(_entrants) {
  // seu código aqui
}

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
