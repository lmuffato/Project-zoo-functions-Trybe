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

// Requisito 1
const animalsByIds = (...ids) =>
  animals.filter((animal) => ids.some((id) => animal.id === id));

// Requisito 2
const animalsOlderThan = (animal, age) =>
  animals
    .find((name) => name.name === animal)
    .residents.every((ageOfAnimal) => ageOfAnimal.age >= age);

// Requisito 3
const employeeByName = (employeeName) => {
  const employeeObj = employees.find(
    (employee) =>
      employeeName === employee.firstName || employeeName === employee.lastName,
  );
  return employeeObj === undefined ? {} : employeeObj;
};

// Requisito 4
const createEmployee = (
  { id, firstName, lastName },
  { managers, responsibleFor },
) => ({ id, firstName, lastName, managers, responsibleFor });

// Requisito 5
const isManager = (id) =>
  employees.some((employee) =>
    employee.managers.some((idManager) => idManager === id));

// Requisito 6
const addEmployee = (
  id,
  firstName,
  lastName,
  managers = [],
  responsibleFor = [],
) => {
  const newObj = { id, firstName, lastName, managers, responsibleFor };
  employees.push(newObj);
};

// Requisito 7
const animalCount = (species) => {
  const ret = {};
  animals.forEach(({ name, residents }) => {
    ret[name] = residents.length;
  });
  return species === undefined
    ? ret
    : animals.find((animal) => animal.name === species).residents.length;
};

// Requisito 8
const entryCalculator = ({ Adult = 0, Child = 0, Senior = 0 } = 0) =>
  Adult * prices.Adult + Child * prices.Child + Senior * prices.Senior;

// function animalMap(options) {

// }

// Requisito 11

const getBigger = (bigger, number) => ((bigger > number.age) ? bigger : number.age);

const oldestFromFirstSpecies = (id) => {
  const employeeObj = employees.find((employee) => employee.id === id);
  const animalId = employeeObj.responsibleFor[0];
  const animalResidents = animals.find((animal) => animal.id === animalId)
    .residents;
  const oldestAnimalYears = animalResidents.reduce(getBigger, 0);
  const oldestAnimal = animalResidents.find((animal) => animal.age === oldestAnimalYears);
  return [oldestAnimal.name, oldestAnimal.sex, oldestAnimal.age];
};

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
  oldestFromFirstSpecies,
  // increasePrices,
  createEmployee,
};
