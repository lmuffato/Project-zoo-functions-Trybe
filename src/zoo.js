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
  return ids.map((idAnimal) => animals.find((animal) => animal.id === idAnimal));
}

function animalsOlderThan(animal, age) {
  return animals.find((nomeAnimal) =>
    nomeAnimal.name === animal).residents.every((idade) =>
    idade.age > age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) return { };
  return employees.find((empregado) =>
    empregado.firstName === employeeName || empregado.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.some((employee) => employee.managers.some((empregado) => empregado === id));
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
}

function animalCount(species) {
  if (species === undefined) {
    return animals.reduce((acc, animal) => (
      { ...acc, [animal.name]: animal.residents.length }
    ), {});
  }
  return animals.find((animal) => animal.name === species).residents.length;
}

function entryCalculator(entrants = {}) {
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  if (entrants !== undefined) {
    return ((prices.Adult * Adult) + (prices.Senior * Senior) + (prices.Child * Child));
  }
  return 0;
}
/*
function animalMap(options) {
  // seu código aqui
}
*/

function schedule(dayName) {
  const semanaCompleta = {
    Tuesday: `Open from ${hours.Tuesday.open}am until ${hours.Tuesday.close - 12}pm`,
    Wednesday: `Open from ${hours.Wednesday.open}am until ${hours.Wednesday.close - 12}pm`,
    Thursday: `Open from ${hours.Thursday.open}am until ${hours.Thursday.close - 12}pm`,
    Friday: `Open from ${hours.Friday.open}am until ${hours.Friday.close - 12}pm`,
    Saturday: `Open from ${hours.Saturday.open}am until ${hours.Saturday.close - 12}pm`,
    Sunday: `Open from ${hours.Sunday.open}am until ${hours.Sunday.close - 12}pm`,
    Monday: 'CLOSED',
  };
  if (dayName === undefined) return semanaCompleta;
  return { [dayName]: semanaCompleta[dayName] };
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
