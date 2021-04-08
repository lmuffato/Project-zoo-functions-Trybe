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
  const arr = [];
  ids.forEach((element) => {
    arr.push(data.animals.find((animal) => element === animal.id));
  });
  return arr;
}

function animalsOlderThan(animal, age) {
  const ageArr = [];
  const obj = data.animals.find((bicho) => bicho.name === animal);
  obj.residents.forEach((resident) => {
    ageArr.push(resident.age);
  });
  return ageArr.every((idade) => idade >= age);
}

function employeeByName(employeeName) {
  const obj = data.employees.find((employee) =>
    employee.firstName === employeeName || employee.lastName === employeeName);
  return (obj !== undefined ? obj : {});
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  const employe = data.employees.find((employee) => employee.id === id);
  return employe.managers.some((manager) => manager === '9e7d4524-363c-416a-8759-8aa7e50c0992');
}

function addEmployee(id = [], firstName = [], lastName = [], managers = [], responsibleFor = []) {
  const employee = { id, firstName, lastName, managers, responsibleFor };
  data.employees.push(employee);
}

function animalCount(species) {
  const obj = {};
  data.animals.forEach((animal) => {
    Object.assign(obj, { [animal.name]: animal.residents.length });
  });
  return (species !== undefined ? obj[species] : obj);
}

function entryCalculator({ Adult = 0, Child = 0, Senior = 0 } = 0) {
  const { Adult: priceAdult, Senior: priceSenior, Child: priceChild } = data.prices;
  const total = (Adult * priceAdult) + (Child * priceChild) + (Senior * priceSenior);
  return total;
}

// function animalMap(options) {

// }

const hour = (value) => (value <= 12 ? `${value}am` : `${value - 12}pm`);

function schedule(dayName) {
  const obj = {};
  const keys = Object.keys(data.hours);
  const values = Object.values(data.hours);
  for (let index = 0; index < keys.length - 1; index += 1) {
    const day = keys[index];
    Object.assign(obj, { [day]: `Open from ${hour(values[index].open)} 
    until ${hour(values[index].close)}` });
  }
  Object.assign(obj, { Monday: 'CLOSED' });
  return (dayName !== undefined ? obj[dayName] : obj);
}

// function oldestFromFirstSpecies(id) {
// seu código aqui
// }

function increasePrices(percentage) {
  const { Adult, Senior, Child } = data.prices;
  return {
    Adult: (Adult * (percentage / 100)).toFixed(2),
    Senior: (Senior * (percentage / 100)).toFixed(2),
    Child: (Child * (percentage / 100)).toFixed(2),
  };
}

// function employeeCoverage(idOrName) {
// seu código aqui
// }

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  // animalMap,
  animalsByIds,
  employeeByName,
  // employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  // oldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
