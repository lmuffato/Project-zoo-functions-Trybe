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
const { hours } = data;

function animalsByIds(...ids) {
  const arr = [];
  ids.forEach((elements) => {
    arr.push(animals.find((animal) => elements === animal.id));
  });
  return arr;
}

function animalsOlderThan(animal, age) {
  return animals.find((element) => element.name === animal)
    .residents.every((elementAge) => elementAge.age >= age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return employees.find((employee) => employeeName === employee.firstName
  || employeeName === employee.lastName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return data.employees.some(({ managers }) => managers.includes(id));
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

function animalCount(species) {
  if (species) {
    return animals.find((animal) => animal.name === species).residents.length;
  }
  const animalQTN = {};
  animals.forEach(({ name, residents }) => {
    animalQTN[name] = residents.length;
  });
  return animalQTN;
}

function entryCalculator(entrants) {
  if (entrants === undefined || Object.entries(entrants).length === 0) {
    return 0;
  }
  const adultos = prices.Adult * entrants.Adult;
  const crianças = prices.Child * entrants.Child;
  const velhos = prices.Senior * entrants.Senior;
  const totalAray = [adultos, crianças, velhos];
  return totalAray.filter((valor) => valor > 0)
    .reduce((x, y) => x + y);
}
/*
function animalMap(options) {
  // seu código aqui
}
*/
const manhaTarde = (hour) => {
  if (hour > 12) {
    return `${hour - 12}pm`;
  } if (hour === 12) {
    return '12pm';
  }
  return `${hour}am`;
};
function schedule(dayName) {

}
/*
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
  // increasePrices,
  createEmployee,
};
