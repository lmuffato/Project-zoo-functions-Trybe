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

const { prices } = require('./data');
const data = require('./data');

const { animals, employees } = data;

function animalsByIds(...ids) {
  const animalsArray = [];
  ids.forEach((idParam, index) =>
    (animals[index].id === idParam ? animalsArray.push(animals[index]) : animalsArray));
  return animalsArray;
}

function animalsOlderThan(name, age) {
  const objAnimal = animals.find((animal) => animal.name === name);
  const result = objAnimal.residents.every((animal2) => animal2.age >= age);
  return result;
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  return employees.find((emp) => (emp.firstName === employeeName || emp.lastName === employeeName));
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;

  const obj = { id, firstName, lastName, managers, responsibleFor };
  return obj;
}

function isManager(id) {
  const managerList = [];
  employees.forEach((emp) => (
    emp.managers.length > 0 ? managerList.push(...emp.managers) : emp.managers
  ));
  const check = managerList.find((gerenteId) => gerenteId === id);
  const bool = check !== undefined;
  return bool;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  const listAnimals = {};
  animals.forEach((animal) =>
    Object.assign(listAnimals, {
      [animal.name]: animal.residents.length,
    }));
  if (!species) { return listAnimals; }
  return listAnimals[species];
}

function entryCalculator(entrants) {
  if (!entrants) { return 0; }

  const keys = Object.keys(entrants);
  const value = Object.values(entrants);
  let total = 0;

  keys.forEach((key, index) => {
    if (key === 'Adult') {
      total += value[index] * prices.Adult;
    } else if (key === 'Senior') {
      total += value[index] * prices.Senior;
    } else if (key === 'Child') { total += value[index] * prices.Child; }
  });
  return total;
}

//  function animalMap(options) {
//   const obj = {}
//   if (!options) {
//     animals.forEach((animal) => {
//       if (animal.location === 'NE') {
//         Object.assign(obj, {NE:[animal.name]})
//       } else if (animal.location === 'NW') {
//         Object.assign(obj, {NW:[animal.name]})
//       }
//     })
//   }
//   return obj;
//  }

//  function schedule(dayName) {
//  seu código aqui
//  }

//  function oldestFromFirstSpecies(id) {
//  seu código aqui
//  }

function increasePrices(percentage) {
  const keyPrices = Object.keys(prices);
  keyPrices.forEach((key) => {
    const increased = (prices[key] + (prices[key] * percentage) / 100);
    const finalPrice = Math.floor(increased)
    + Math.ceil((increased - Math.floor(increased)) * 100) / 100;
    prices[key] = finalPrice;
  });
}

//  function employeeCoverage(idOrName) {
//  seu código aqui
//  }

module.exports = {
  entryCalculator,
  //  schedule,
  animalCount,
  //  animalMap,
  animalsByIds,
  employeeByName,
  //  employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  //  oldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
