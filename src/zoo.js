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

const { animals } = data;
const { employees } = data;
const { prices } = data;

function animalsByIds(...ids) {
  return ids.map((id) => animals.find(({ id: idAnimal }) => idAnimal === id));
}

function animalsOlderThan(animal, age) {
  return animals.find((el) => el.name === animal).residents.every((res) => res.age >= age);
}

function employeeByName(employeeName = false) {
  return employeeName
    ? employees
      .find((employee) => employee.firstName === employeeName || employee.lastName === employeeName)
    : {};
}

function createEmployee({ id, firstName, lastName } = {}, { managers, responsibleFor } = {}) {
  employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
  return employeeByName(firstName);
}

function isManager(id) {
  return employees.some((employee) => employee.managers.some((emp) => emp === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species = false) {
  const obj = {};
  if (species) {
    return animals.find((animal) => animal.name === species).residents
      .reduce((acc) => acc + 1, 0);
  }
  animals.forEach((animal) => {
    const qtdAnimals = animal.residents.reduce((acc) => acc + 1, 0);
    obj[animal.name] = qtdAnimals;
  });
  return obj;
}

function entryCalculator(entrant = false) {
  const { Adult = 0, Child = 0, Senior = 0 } = entrant;
  return !entrant || entrant === {}
    ? 0
    : (Adult * prices.Adult) + (Child * prices.Child) + (Senior * prices.Senior);
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
