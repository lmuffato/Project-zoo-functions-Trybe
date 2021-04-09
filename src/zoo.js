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

// function animalMap(options = false) {

// }

// console.log(animalMap();

// function schedule(dayName) {
//   // seu código aqui
// }

function oldestFromFirstSpecies(id = false) {
  const idFunc = employees.find((employee) => employee.id === id).responsibleFor[0];
  return Object.values(animals.find((animal) => animal.id === idFunc).residents
    .sort((a, b) => b.age - a.age)[0]);
}

function increasePrices(percentage) {
  Object.keys(prices).forEach((categoryPrice) => {
    let newValue = parseFloat(prices[categoryPrice]);
    const add = newValue * (percentage / 100);
    newValue += add;
    prices[categoryPrice] = parseFloat(newValue.toFixed(0))
      + Math.ceil(((newValue - parseFloat(newValue.toFixed(0))) * 100)) / 100;
  });
}

const getAnimalsByIdEmployee = (id) => employees
  .find(({ id: idEmp }) => idEmp === id).responsibleFor
  .map((idAnimals) => animals
    .find((animal) => animal.id === idAnimals).name);

const getEmp = (idOrName) => employees
  .find(({ id, firstName, lastName }) => id === idOrName
    || firstName === idOrName
    || lastName === idOrName);

function employeeCoverage(idOrName = false) {
  if (!idOrName) {
    let obj = {};
    const ids = employees.map(({ id }) => id);
    ids.forEach((actualId) => {
      const { firstName, lastName } = employees.find((employee) => employee.id === actualId);
      obj = { ...obj, ...{ [`${firstName} ${lastName}`]: getAnimalsByIdEmployee(actualId) } };
    });
    return obj;
  }

  let obj = {};
  const emp = getEmp(idOrName);
  obj = { ...obj, ...{ [`${emp.firstName} ${emp.lastName}`]: getAnimalsByIdEmployee(emp.id) } };
  return obj;
}

employeeCoverage();

module.exports = {
  entryCalculator,
  // schedule,
  animalCount,
  // animalMap,
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
