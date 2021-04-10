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

const { animals, employees, prices, hours } = require('./data');

function animalsByIds(...ids) {
  if (!ids) return [];
  return animals.filter((animal) => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  const animalFromThatSpecies = animals.find(({ name }) => name === animal);
  return animalFromThatSpecies.residents.every((resident) => resident.age >= age);
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  return employees.find(((employee) =>
    employee.firstName === employeeName || employee.lastName === employeeName));
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return newEmployee;
}

function isManager(id) {
  return id === '0e7b460e-acf4-4e17-bcb3-ee472265db83';
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  employees.push(newEmployee);
}

function animalCount(species) {
  if (!species) {
    return animals.reduce((acc, { name, residents }) => {
      acc[name] = residents.length;
      return acc;
    }, {});
  }
  const animalFromThatSpecies = animals.find(({ name }) => name === species);
  return animalFromThatSpecies.residents.length;
}

function entryCalculator(entrants = {}) {
  if (!entrants || entrants === {}) return 0;
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  const finalPrice = (Adult * 49.99) + (Child * 20.99) + (Senior * 24.99);
  return finalPrice;
}

const locations = ['NE', 'NW', 'SE', 'SW'];

function categorizeAnimals() {
  const returnedValue = {};
  locations.forEach((lct) => {
    const filteredAnimals = animals.filter(({ location }) => location === lct);
    returnedValue[lct] = filteredAnimals.map((animal) => animal.name);
  });
  return returnedValue;
}

function categorizeAnimalsWithName(sexo, ordenar) {
  const returnedValue = {};
  locations.forEach((lct) => {
    const filteredAnimals = animals.filter(({ location }) => location === lct);
    const animalsArray = [];
    filteredAnimals.forEach(({ name, residents }) => {
      const animalObj = {};
      let residentsArr = residents;
      if (sexo !== false) {
        residentsArr = residents.filter((resident) => resident.sex === sexo);
      }
      animalObj[name] = (ordenar) ? residentsArr.map((resident) => resident.name)
        .sort() : residentsArr.map((resident) => resident.name);
      animalsArray.push(animalObj);
    });
    returnedValue[lct] = animalsArray;
  });
  return returnedValue;
}

function animalMap(options) {
  if (!options) {
    return categorizeAnimals();
  }
  const { includeNames = false, sex = false, sorted = false } = options;
  if (includeNames === true) {
    return categorizeAnimalsWithName(sex, sorted);
  }
  return categorizeAnimals();
}

function schedule(dayName) {
  const scheduleObj = {};
  const days = Object.keys(hours);
  if (!dayName) {
    days.forEach((day) => {
      scheduleObj[day] = ((hours[day].open - hours[day].close) === 0)
        ? 'CLOSED'
        : `Open from ${hours[day].open}am until ${hours[day].close - 12}pm`;
    });
    return scheduleObj;
  }
  const day = hours[dayName];
  scheduleObj[dayName] = ((day.close - day.open) === 0)
    ? 'CLOSED'
    : `Open from ${day.open}am until ${day.close - 12}pm`;
  return scheduleObj;
}

function oldestFromFirstSpecies(id) {
  const firstAnimal = employees.find((employee) => employee.id === id).responsibleFor[0];
  const animalObj = animals.find((animal) => animal.id === firstAnimal);
  const oldResidentAge = animalObj.residents.reduce((acc, curr) =>
    ((acc > curr.age) ? acc : curr.age));
  const { name, sex, age } = animalObj.residents.find((resident) =>
    resident.age === oldResidentAge);
  return [name, sex, age];
}

function increasePrices(percentage) {
  const perc = (percentage + 100) / 100;
  const keys = Object.keys(prices);
  keys.forEach((age) => {
    const num = (prices[age] * perc);
    const decimalPart = parseFloat((num % 1).toFixed(3));
    const serializedNum = (Math.ceil(decimalPart * 100) / 100) + Math.floor(num);
    prices[age] = serializedNum;
  });
}

function employeeCoverage(idOrName) {
  const employeeObject = {};
  if (!idOrName) {
    employees.forEach(({ firstName, lastName, responsibleFor }) => {
      const fullName = `${firstName} ${lastName}`;
      employeeObject[fullName] = responsibleFor.map((animalId) =>
        animals.find(({ id }) => animalId === id).name);
    });
    return employeeObject;
  }

  const especificEmployee = employees.find(({ firstName, lastName, id }) =>
    [firstName, lastName, id]
      .includes(idOrName));
  const fullName = `${especificEmployee.firstName} ${especificEmployee.lastName}`;
  employeeObject[fullName] = especificEmployee.responsibleFor.map((animalId) =>
    animals.find(({ id }) => animalId === id).name);
  return employeeObject;
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
