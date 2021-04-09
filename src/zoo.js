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

const { animals, employees } = require('./data');
const data = require('./data');

const managersId = [
  '9e7d4524-363c-416a-8759-8aa7e50c0992',
  'fdb2543b-5662-46a7-badc-93d960fdc0a8',
  '0e7b460e-acf4-4e17-bcb3-ee472265db83',
];

const filterId = (value) =>
  value.map((id) => animals.find((el) => el.id === id));

function animalsByIds(...ids) {
  if (ids === undefined) return [];
  return filterId(ids);
}

function animalsOlderThan(animal, ageInput) {
  const animalFind = animals.find(({ name }) => animal === name);
  const { residents } = animalFind;
  const youngerThan = residents.filter(({ age }) => age < ageInput);
  return youngerThan.length === 0;
}

const findName = (name) =>
  employees.find((el, { firstName }, { lastName }) =>
    (el.firstName === name || el.lastName === name ? el : ''));

function employeeByName(employeeName) {
  if (employeeName === undefined) return {};
  return findName(employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  const { managers, responsibleFor } = associatedWith;
  const employee = { ...personalInfo };
  employee.managers = managers.map((manager) => manager);
  employee.responsibleFor = responsibleFor.map((responsible) => responsible);
  return employee;
}

function isManager(id) {
  return !!managersId.find((manager) => manager === id);
  // const employee = employees.find(({ managers }) => managers.includes(id));
  // return managers; // managers.length === 0;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const employee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };

  employees.push(employee);
  return data.employees;
}

function animalCount(species) {
  // seu código aqui
}

function entryCalculator(entrants) {
  // seu código aqui
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
