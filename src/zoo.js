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
const everyZero = (array) => {
  let output;
  if (array.every((element) => element === 0)) {
    output = true;
  } else {
    output = false;
  }
  return output;
};

function schedule(dayName) {
  const output = {};
  if (dayName !== undefined) {
    const sch = Object.values(hours[dayName]);
    if (everyZero(sch) === true) {
      output[dayName] = 'CLOSED';
    } else {
      output[dayName] = `Open from ${sch[0]}am until ${sch[1] - 12}pm`;
    }
  } else {
    const entries = Object.entries(hours);
    entries.forEach((element) => {
      const [day, sch] = element;
      const refSch = Object.values(sch);
      output[day] = `Open from ${refSch[0]}am until ${refSch[1] - 12}pm`;
    });
    output.Monday = 'CLOSED';
  }
  return output;
}
function oldestFromFirstSpecies(id) {
  const empResp = employees.filter((element) => element.id === id)
    .map((element) => element.responsibleFor).shift();
  const animal = [];
  empResp.forEach((element) => {
    animal.push(animals.filter((animalId) => animalId.id === element)
      .map((index) => index.residents).shift());
  });
  let ages = [];
  animal.forEach((element) => {
    ages.push(...element.map((el) => el.age));
  });
  ages = ages.reduce((x, y) => (x > y ? x : y));
  const output = [...animal[0], ...animal[1]].filter((element) => element.age === ages).shift();
  return Object.values(output);
}

function increasePrices(percentage) {
  const roundDecimal = (value) => Math.round(value * 100) / 100;
  const porcent = 0.01 * percentage;
  const values = Object.values(prices);
  const valuesIncreased = [];
  values.forEach((element) => valuesIncreased
    .push(roundDecimal((element + (element * porcent)))));
  const [Adult, Senior, Child] = valuesIncreased;
  prices.Adult = Adult;
  prices.Senior = Senior;
  prices.Child = Child;
}
function employeeCoverage(idOrName) {
  let output;
  if (idOrName !== undefined) {
    const name = idOrName;
    output = employees
      .filter((element) => element.firstName === name || element.lastName === name)
      .map((element) => element.responsibleFor);
    output = output.shift();
  }
  return output;
}
console.log(employeeCoverage('Sharonda'));
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
  oldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
