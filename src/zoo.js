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

const { animals, employees, prices } = require('./data');
// const data = require('./data');

function animalsByIds(...ids) {
  return ids.map((element) => animals.find((animal) => animal.id === element));
}

function animalsOlderThan(specie, age) {
  const species = animals.filter((animal) => animal.name === specie);
  return species[0].residents.every((element) => element.age > age);
}

function employeeByName(employeeName) {
  return employees.reduce((accumulator, employee) => (employee.firstName === employeeName
  || employee.lastName === employeeName
    ? employee : accumulator), {});
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees
    .map((employee) => employee.managers)
    .reduce((accumulator, manager) => accumulator.concat(manager), [])
    .some((manager) => manager === id);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = { id, firstName, lastName, managers, responsibleFor };
  employees.push(newEmployee);
}

function animalCount(species) {
  const numbSpecies = () => animals.find((animal) => animal.name === species).residents.length;
  const allSpecies = () => animals.reduce((accumulator, animal) => (
    { ...accumulator, [animal.name]: animal.residents.length }), {});

  return (species !== undefined ? numbSpecies() : allSpecies());
}

function entryCalculator(entrants) {
  const totalPrice = () => {
    const { Adult = 0, Child = 0, Senior = 0 } = entrants;
    return ((prices.Adult * Adult) + (prices.Child * Child) + (prices.Senior * Senior));
  };
  return (entrants === undefined || entrants === {}
    ? 0
    : totalPrice());
}

// function animalMap(options) {
//   // seu código aqui
// }

// function schedule(dayName) {
//   // seu código aqui
// }

// function oldestFromFirstSpecies(id) {
//   // seu código aqui
// }

// function increasePrices(percentage) {
//   // seu código aqui
// }

// function employeeCoverage(idOrName) {
//   // seu código aqui
// }

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
