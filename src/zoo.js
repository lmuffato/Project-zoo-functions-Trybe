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

const { animals, prices, employees, hours } = require('./data');

// Requisito 1
function animalsByIds(...ids) {
  return animals.filter((animal) => ids.includes(animal.id));
}

// Requisito 2
function animalsOlderThan(animal, age) {
  const animalsList = animals.find((index) => index.name === animal);
  return animalsList.residents.every((index) => index.age >= age);
}

// Requisito 3
function employeeByName(employeeName) {
  if (employeeName === undefined) return {};
  const employee = employees
    .find((name) => name.firstName === employeeName || name.lastName === employeeName);
  return employee;
}

// Requisito 4
function createEmployee(personalInfo, associatedWith) {
  const employee = { ...personalInfo, ...associatedWith };
  return employee;
}

// Requisito 5
function isManager(id) {
  return employees.some((employee) => employee.managers.includes(id));
}

// Requisito 6
function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const employee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  employees.push(employee);
}

// Requisito 7
function animalCount(species) {
  if (species === undefined) {
    const allAnimals = {};
    animals.forEach((animal) => {
      allAnimals[animal.name] = animal.residents.length;
    });
    return allAnimals;
  }
  return animals.find((animal) => animal.name === species).residents.length;
}

// Requisito 8
function entryCalculator(entrants) {
  if (entrants === undefined) return 0;

  const { Adult = 0, Senior = 0, Child = 0 } = entrants;

  const adults = prices.Adult * Adult;
  const seniors = prices.Senior * Senior;
  const childs = prices.Child * Child;

  return adults + seniors + childs;
}

// Requisito 9
// function animalMap(options) {
//   // seu código aqui
// }

// Requisito 10
const checkOpenOrClose = (open, close) => {
  if (open === 0 && close === 0) {
    return 'CLOSED';
  }
  return `Open from ${open}am until ${close - 12}pm`;
};

function schedule(dayName) {
  if (dayName === undefined) {
    const result = Object.keys(hours).reduce((acc, curr) => {
      const { open, close } = hours[curr];
      acc[curr] = checkOpenOrClose(open, close);
      return acc;
    }, {});
    return result;
  }
  const { open, close } = hours[dayName];
  return { [dayName]: checkOpenOrClose(open, close) };
}

// Requisito 11
function oldestFromFirstSpecies(id) {
  const firstSpecieId = employees.find((employee) => employee.id === id).responsibleFor[0];
  const residentsSpecie = animals.find((animal) => animal.id === firstSpecieId).residents;
  const olderAnimal = residentsSpecie.reduce((acc, curr) => (acc.age > curr.age ? acc : curr));
  const { name, sex, age } = olderAnimal;

  return [name, sex, age];
}

// Requisito 12
function increasePrices(percentage) {
  const calculeteThePercentage = (price) => (price / 100) * percentage + price;
  const round = (number) => Math.round(number * 100) / 100;
  const { Adult, Senior, Child } = prices;

  const newPriceAdult = calculeteThePercentage(Adult);
  const newPriceSenior = calculeteThePercentage(Senior);
  const newPriceChild = calculeteThePercentage(Child);

  prices.Adult = round(newPriceAdult);
  prices.Senior = round(newPriceSenior);
  prices.Child = round(newPriceChild);
}

// Requisito 13
const findEmployee = (idOrName) => {
  const employee = employees.find(({ id, firstName, lastName }) =>
    id === idOrName || firstName === idOrName || lastName === idOrName);
  return employee;
};

const findAnimalName = (responsibleFor) => {
  const result = responsibleFor.map((animalId) => animals.find(({ id }) => animalId === id).name);
  return result;
};

function employeeCoverage(idOrName) {
  if (idOrName === undefined) {
    const employeesList = employees.reduce((acc, { firstName, lastName, responsibleFor }) => {
      acc[`${firstName} ${lastName}`] = findAnimalName(responsibleFor);
      return acc;
    }, {});
    return employeesList;
  }
  const { firstName, lastName, responsibleFor } = findEmployee(idOrName);
  const result = {};
  result[`${firstName} ${lastName}`] = findAnimalName(responsibleFor);
  return result;
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
