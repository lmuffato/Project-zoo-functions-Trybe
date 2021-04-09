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
    const hours = values[index];
    Object.assign(obj, { [day]: `Open from ${hour(hours.open)} until ${hour(hours.close)}` });
  }
  Object.assign(obj, { Monday: 'CLOSED' });
  return (dayName !== undefined ? { [dayName]: obj[dayName] } : obj);
}

function oldestFromFirstSpecies(id) {
  const employe = data.employees.find((employee) => employee.id === id);
  const anim = data.animals.find((animal) => animal.id === employe.responsibleFor[0]);
  const old = anim.residents.reduce((oldest, resident) =>
    (resident.age > oldest.age ? resident : oldest));
  return [old.name, old.sex, old.age];
}

function increasePrices(percentage) {
  const increase = (1 + (percentage / 100));
  const { Adult, Senior, Child } = data.prices;
  data.prices = {
    Adult: Math.round(100 * (Adult * increase)) / 100,
    Senior: Math.round(100 * (Senior * increase)) / 100,
    Child: Math.round(100 * (Child * increase)) / 100,
  };
}

const idToSpecie = (array) => {
  const arr = [];
  array.forEach((element) => {
    arr.push(data.animals.find((animal) => animal.id === element).name);
  });
  return arr;
};

const employeeAnimals = () => {
  const obj = {};
  data.employees.forEach((employee) => {
    Object.assign(obj, { [`${employee.firstName} ${employee.lastName}`]:
    idToSpecie(employee.responsibleFor) });
  });
  return obj;
};

const ifUndefined = (obj, idOrName) => {
  const employe = data.employees.find((employee) => employee.id === idOrName
  || employee.firstName === idOrName || employee.lastName === idOrName);
  const name = `${employe.firstName} ${employe.lastName}`;
  return { [name]: obj[name] };
};

function employeeCoverage(idOrName) {
  const obj = employeeAnimals();
  return (idOrName === undefined ? obj : ifUndefined(obj, idOrName));
}

module.exports = {
  entryCalculator,
  schedule,
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
