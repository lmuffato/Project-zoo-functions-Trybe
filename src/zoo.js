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
const { prices } = require('./data');
const { hours } = require('./data');
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
    managers: [],
    responsibleFor: [],
  };
  if (managers !== undefined) {
    newEmployee.managers = managers;
  }
  if (responsibleFor !== undefined) {
    newEmployee.responsibleFor = responsibleFor;
  }
  employees.push(newEmployee);
}
function animalCount(species) {
  let output;
  if (species !== undefined) {
    const animal = animals.filter((element) => element.name === species).shift();
    output = animal.residents.length;
  } else {
    output = {};
    animals.forEach((element) => {
      output[element.name] = element.residents.length;
    });
  }
  return output;
}
function entryCalculator(entrants) {
  let output = 0;
  if (entrants !== undefined && Object.entries(entrants).length > 0) {
    const keys = Object.entries(entrants);
    keys.forEach((key) => {
      output += prices[key[0]] * key[1];
    });
    output.toFixed(2);
  }
  return output;
}
// function animalMap(options) {
//   const output = {
//     NE: [
//       { lions: animals.filter((element) => element.name === 'lions')
//         .map((element) => element.residents).shift() }],
//     NW: [],
//     SE: [],
//     SW: [],
//   };
//   return output;
// }
function schedule(dayName) {
  const output = {};
  const sch = Object.values(hours[dayName]);
  if (sch.every((element) => element === 0)) {
    output[dayName] = 'CLOSED';
  } else {
    output[dayName] = `Open from ${sch[0]}am to ${sch[1]}pm`;
  }
  return output;
}
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
