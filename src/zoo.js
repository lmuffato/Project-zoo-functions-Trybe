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
// const data = require('./data');

const animalsByIds = (...ids) =>
  animals.filter((animal) => ids.some((id) => animal.id === id));

const animalsOlderThan = (animal, age) =>
  animals
    .find((name) => name.name === animal)
    .residents.every((ageOfAnimal) => ageOfAnimal.age >= age);

const employeeByName = (employeeName) => {
  const employeeObj = employees.find(
    (employee) =>
      employeeName === employee.firstName || employeeName === employee.lastName,
  );

  return employeeObj === undefined ? {} : employeeObj;
};

const createEmployee = (
  { id, firstName, lastName },
  { managers, responsibleFor },
) => ({ id, firstName, lastName, managers, responsibleFor });

const isManager = (id) =>
  employees.some((employee) =>
    employee.managers.some((idManager) => idManager === id));

const addEmployee = (id, firstName, lastName, managers = [], responsibleFor = []) => {
  const newObj = { id, firstName, lastName, managers, responsibleFor };
  employees.push(newObj);
};

// function animalCount(species) {
//   // seu código aqui
// }

// function entryCalculator(entrants) {
//   // seu código aqui
// }

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
  // entryCalculator,
  // schedule,
  // animalCount,
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
