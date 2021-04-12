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
  return data.animals.filter(({ id }) => ids.includes(id));
}

function animalsOlderThan(animal, age) {
  const animalFound = data.animals.find(({ name }) => name === animal);
  return animalFound.residents.every(({ age: ageAnimal }) => ageAnimal >= age);
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  return data.employees.find(
    ({ firstName, lastName }) =>
      employeeName === firstName || employeeName === lastName,
  );
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return data.employees.some(({ managers }) => managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const add = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  data.employees.push(add);
}

function animalCount(species) {
  const animalFound = data.animals.find(
    ({ name: nameOfSpecie }) => nameOfSpecie === species,
  );
  const namesAndQtde = data.animals.reduce((acc, { name, residents }) => {
    acc[name] = residents.length;
    return acc;
  }, {});
  if (!species) {
    return namesAndQtde;
  }
  return animalFound.residents.length;
}

function entryCalculator(entrants) {
  const objIsEmpty = (obj) => Object.keys(obj).length === 0;
  if (!entrants || objIsEmpty(entrants)) return 0;
  const { prices } = data;
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  const sumOfTotalPrice = Adult * prices.Adult + Child * prices.Child + Senior * prices.Senior;
  return sumOfTotalPrice;
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // seu código aqui
}

function oldestFromFirstSpecies(id) {
  const manager = data.employees.find(({ id: managerId }) => managerId === id);
  const identifiedAnimal = data.animals.find(
    ({ id: animalId }) => animalId === manager.responsibleFor[0],
  );
  const oldAnimalAge = identifiedAnimal.residents.reduce(
    (acc, { age }) => (acc > age ? acc : age),
    0,
  );
  const animalObj = identifiedAnimal.residents.find(
    ({ age }) => age === oldAnimalAge,
  );
  return [animalObj.name, animalObj.sex, animalObj.age];
}

function increasePrices(percentage) {
  // seu código aqui
}

function employeeCoverage(idOrName) {
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
