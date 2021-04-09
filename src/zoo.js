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
  if (ids.length === 0) return ids;
  if (ids.length === 1) return [data.animals.find((el) => ids[0] === el.id)];
  return data.animals.filter((el) => ids.includes(el.id));
}

function animalsOlderThan(animal, age) {
  return data.animals.find(({ name }) => name === animal)
    .residents.every(({ age: ageAnimal }) => ageAnimal >= age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) return {};
  return data.employees.find(({ firstName, lastName }) =>
    firstName === employeeName || lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return data.employees.some((employee) => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {
  const getAllAnimalsAndPopulation = (acc, currentAnimal) => {
    acc[currentAnimal.name] = currentAnimal.residents.length;
    return acc;
  };

  if (species === undefined) {
    return data.animals.reduce(getAllAnimalsAndPopulation, {});
  }

  return data.animals.find(({ name }) => name === species).residents.length;
}

function entryCalculator(entrants = 0) {
  return Object.entries(entrants).reduce((acc, [person, qty]) => {
    return acc + data.prices[person] * qty;
  }, 0);
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
