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
const data = require('./data');

function animalsByIds(...ids) {
  return data.animals.filter(({ id }) => ids.includes(id));
}

animalsByIds();

function animalsOlderThan(animal, animalAge) {
  const especie = data.animals.find(({ name }) => name === animal);
  return especie.residents.every(({ age }) => age > animalAge);
}
console.log(animalsOlderThan('otters', 8));

function employeeByName(employeeName) {
  if (!employeeName) return {};
  return data.employees.find(({ firstName, lastName }) => firstName === employeeName
  || lastName === employeeName);
}
console.log(employeeByName('Burl'));

function createEmployee(personalInfo, associatedWith) {
  const employee = { ...personalInfo, ...associatedWith };
  return employee;
}

function isManager(id) {
  return data.employees.some(({ managers }) => managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  const employee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  data.employees.push(employee);
}

function animalCount(species) {
  if (!species) {
    return animals.reduce((acc, animal) => {
      acc[animal.name] = animal.residents.length;
      return acc;
    }, {});
  }
  return animals.find(({ name }) => name.includes(species)).residents.length;
}
console.log(animalCount('lions'));

// // function entryCalculator(entrants) {
// //   // seu código aqui
// // }

// // function animalMap(options) {
// //   // seu código aqui
// // }

// // function schedule(dayName) {
// //   // seu código aqui
// // }

// // function oldestFromFirstSpecies(id) {
// //   // seu código aqui
// // }

// // function increasePrices(percentage) {
// //   // seu código aqui
// // }

// // function employeeCoverage(idOrName) {
// //   // seu código aqui
// // }

module.exports = {
  // entryCalculator,
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
