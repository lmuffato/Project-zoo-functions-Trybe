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
  if (ids.length === 0) return [];

  return ids.map((id) => data.animals.find((animal) => animal.id === id));
}

function animalsOlderThan(animal, age) {
  const animals = data.animals.find((findAnimal) => findAnimal.name === animal).residents;
  return animals.every((eachAnimal) => eachAnimal.age >= age);
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  const empByFirstName = data.employees.find(((employee) => employee.firstName === employeeName));
  const empByLastName = data.employees.find(((employee) => employee.lastName === employeeName));
  if (empByFirstName) return empByFirstName;
  if (empByLastName) return empByLastName;
}

function createEmployee(personalInfo, associatedWith) {
  return {
    ...personalInfo,
    ...associatedWith,
  };
}

function isManager(id) {
  let manager = false;
  data.employees.forEach((employee) => {
    if (employee.managers.includes(id)) manager = true;
  });

  return manager;
}

/*
function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
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
*/
module.exports = {
  // entryCalculator,
  // schedule,
  // animalCount,
  // animalMap,
  animalsByIds,
  employeeByName,
  // employeeCoverage,
  // addEmployee,
  isManager,
  animalsOlderThan,
  // oldestFromFirstSpecies,
  // increasePrices,
  createEmployee,
};
