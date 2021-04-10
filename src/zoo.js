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

const animalCount = (species) => {
  const ret = {};
  animals.forEach(({ name, residents }) => {
    ret[name] = residents.length;
  });
  return species === undefined
    ? ret
    : animals.find((animal) => animal.name === species).residents.length;
};

const entryCalculator = ({ Adult = 0, Child = 0, Senior = 0 } = 0) =>
  Adult * prices.Adult + Child * prices.Child + Senior * prices.Senior;

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
