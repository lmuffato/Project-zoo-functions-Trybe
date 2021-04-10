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
const { animals } = require('./data');
const { employees } = require('./data');
const { allManagers } = require('./data');
// const data = require('./data');

function animalsByIds(...ids) {
  const result = [];
  if (ids !== undefined) {
    ids.forEach((id) => {
      result.push(...animals.filter((element) => element.id === id).map((element) => element));
      return result;
    });
  }
  return result;
}
function animalsOlderThan(animal, age) {
  let output = animals
    .filter((element) => element.name === animal)
    .map((element) => element.residents);
  output = output.shift().map((element) => element.age > age);
  return output.every((element) => element === true);
}
function employeeByName(employeeName) {
  let output;
  if (employeeName !== undefined) {
    const name = employeeName;
    output = employees
      .filter((element) => element.firstName === name || element.lastName === name);
    output = output.shift();
  } else {
    output = {};
  }
  return output;
}
function createEmployee(personalInfo, associatedWith) {
  const info = [personalInfo, associatedWith];
  const [pF, aW] = info;
  pF.managers = aW.managers;
  pF.responsibleFor = aW.responsibleFor;
  employees.push(pF);
  return pF;
}
function isManager(id) {
  const output = allManagers.map((element) => element === id);
  return output.includes(true);
}
function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  employees.push(newEmployee);
  return [];
}
// cara eu to com muito sono
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
