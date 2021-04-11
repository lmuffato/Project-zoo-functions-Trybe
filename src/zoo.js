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

const { employees } = require('./data');
const { prices } = require('./data');
const data = require('./data');

const { animals } = data;

function animalsByIds(...ids) {
  // seu código aqui
  const animalArray = animals.filter((animal) => ids.includes(animal.id));
  return animalArray;
}

function animalsOlderThan(animalName, ageAnimal) {
  // seu código aqui
  const nameAnimal = animals.find((animal) => animalName === animal.name);
  const ageCheck = nameAnimal.residents;
  return ageCheck.every((animal) => ageAnimal <= animal.age);
}

function employeeByName(employeeName) {
  // seu código aqui
  if (employeeName === undefined) {
    const emptyObject = {};
    return emptyObject;
  }
  return employees.find((employe) => employe.firstName === employeeName
  || employe.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  const newEmployee = { ...personalInfo, ...associatedWith };
  return newEmployee;
}

function isManager(id) {
  // seu código aqui
  // const { managers } = employees;
  const personCheck = employees.filter((employ) => employ.managers.includes(id));
  return personCheck.some(() => id);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return employees.push(newEmployee);
}

// function animalCount(species) {
//   // seu código aqui
//   // const animalQuantity = animals.filter((animal) => animal.residents.length);
//   const speciesObject = [];
//   if (species === undefined) {
//     return animals.map((animal) => {
//       const obj = {
//         animal.name: animal.residents.length,
//       }
//     });
//     // ...animalQuantity,
//   }
//   return 'Vou implementar';
// }

// console.log(animalCount('lions'));
// console.log(animalCount());

// function entryCalculator(entrants) {
//   // seu código aqui
//   if (entrants === 0 || entrants === {}) {
//     return 0;
//   }
//   const summAdult = prices.Adult * entrants;
//   return summAdult;
// }

// console.log(entryCalculator());

// function animalMap(options) {
//   // seu código aqui
// }

// function schedule(dayName) {
//   // seu código aqui
// }

// function oldestFromFirstSpecies(id) {
//   // seu código aqui
// }

function increasePrices(percentage) {
  // seu código aqui
  const { Adult, Child, Senior } = prices;
  prices.Adult = parseFloat((Adult + (Math.ceil(Adult * percentage) / 100)).toFixed(2));
  prices.Child = parseFloat((Child + (Math.ceil(Child * percentage) / 100)).toFixed(2));
  prices.Senior = parseFloat((Senior + (Math.ceil(Senior * percentage) / 100)).toFixed(2));
  return prices;
}

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
  increasePrices,
  createEmployee,
};
