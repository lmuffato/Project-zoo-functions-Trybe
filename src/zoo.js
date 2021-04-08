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
  // seu código aqui
  return (ids !== []) ? ids.map((id) => data.animals.find((animal) => animal.id === id)) : ids;
}

const isOlder = (res, age) => !res.reduce((test, re) => (!test ? re.age < age : test), false);

function animalsOlderThan(nAnimal, age) {
  // seu código aqui
  const animalsChoiced = data.animals.find((animal) => animal.name === nAnimal);
  let result = false;
  if (animalsChoiced !== undefined) {
    result = isOlder(animalsChoiced.residents, age);
  }
  return result;
}

console.log(animalsOlderThan('lions', 7));

function employeeByName(empName) {
  // seu código aqui
  const empS = data.employees.find((emp) => emp.firstName === empName || emp.lastName === empName);
  return empS !== undefined ? empS : {};
}

console.log(employeeByName());

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return { ...personalInfo, ...associatedWith };
}

const infoPer = {
  id: '56d43ba3-a5a7-40f6-8dd7-cbb05082383f',
  firstName: 'Wilburn',
  lastName: 'Wishart',

};
const assoc = {
  managers: ['burlId', 'olaId'],
  responsibleFor: ['snakesId', 'elephantsId'],
};

console.log(createEmployee(infoPer, assoc));

function isManager(id) {
  // seu código aqui
  const managers = [];
  data.employees.forEach((emp) => managers.push(...emp.managers));
  return managers.find((idMan) => idMan === id) !== undefined;
}

console.log(isManager('b0dc644a-5335-489b-8a2c-4e086c7819a2'));
// function addEmployee(id, firstName, lastName, managers, responsibleFor) {
//   // seu código aqui
// }

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
  // addEmployee,
  isManager,
  animalsOlderThan,
  // oldestFromFirstSpecies,
  // increasePrices,
  // createEmployee,
};
