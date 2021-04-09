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

// const { animals } = require('./data');
// const { employees } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  return data.animals.filter((animal, index) => animal.id === ids[index]);
}

function animalsOlderThan(animal, age) {
  return data.animals
    .find((arrayAnimal) => arrayAnimal.name === animal).residents
    .every((objAnimal) => objAnimal.age > age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) return {};
  return data.employees
    .find((employee) => employee.firstName === employeeName || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
}

function isManager(id) {
  return data.employees.some(({managers}, index) => managers[index] === id);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

// function animalCount(species) {
//   if (species === undefined) {
//     const animalList = data.animals.reduce((acc, animal) => {
//       Object.assign({}, animal.name, animal.popularity);
//       console.log(animal.name, animal.popularity);
//       const animals = animal.name;
//       const quantAnimals = animal.popularity;
//       return acc + {[animals] : quantAnimals };
//       }, {});
//     return animalList;
//   }
//   return data.animals.find((animal) => animal.name === species).popularity;
// }
// console.log(animalCount());

// data.animals.map((animal) => {
//   const animals = animal.name;
//   const quantAnimals = animal.popularity;
//   return {[animals] : quantAnimals };
// });

// data.animals.reduce((acc, animal) => {
//   console.log(animal.name, animal.popularity);
//   const propertyAnimal = {[animal.name] : animal.popularity};
//   return acc + propertyAnimal;
// }, {});

// function entryCalculator(entrants) {
//   for (let key in entrants) {
//     const calculo = data.prices.Adult

//     return calculo;
//   }
// }

// console.log(entryCalculator({ 'Adult': 2, 'Child': 3, 'Senior': 1 }));

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
