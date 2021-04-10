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
const data = require('./data');

// function animalsByIds(ids) {

// }

function animalsOlderThan(animal, age) {
  const findAnimalName = animals.find((animalSpecie) => animalSpecie.name === animal);
  const adults = findAnimalName.residents.every((adult) => adult.age >= age);
  return adults;
}

// console.log(animalsOlderThan('penguins', 10));

function employeeByName(employeeName) {
  const emptyArray = {};
  if (!employeeName) return emptyArray;
  return employees.find(({ firstName, lastName }) =>
    firstName === employeeName || lastName === employeeName);
}

// console.log(employeeByName());

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;

  const newObj = {
    id, firstName, lastName, managers, responsibleFor,
  };

  return newObj;
}

function isManager(id) {
  return employees.some((emp) => emp.managers.includes(id));
}

// console.log(isManager('9e7d4524-363c-416a-8759-8aa7e50c0992'));

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  employees.push(newEmployee);
  // return console.log(employees);
}

function animalCount(species) {
  const allAnimals = {};
  if (!species) {
    animals.forEach((animal) => {
      allAnimals[animal.name] = animal.residents.length;
    });
    return allAnimals;
  }
  const getAnimal = animals.find((animal) => animal.name === species);
  return getAnimal.residents.length;
}

function entryCalculator(entrants) {
  if ((entrants === undefined) || Object.keys(entrants).length === 0) return 0;
  let childPrice = 0;
  let adultPrice = 0;
  let seniorPrice = 0;
  const arrayEntrants = Object.entries(entrants);
  arrayEntrants.forEach((item) => {
    if (item[0] === 'Adult') {
      adultPrice = item[1] * prices.Adult;
    }
    if (item[0] === 'Child') {
      childPrice = item[1] * prices.Child;
    }
    if (item[0] === 'Senior') {
      seniorPrice = item[1] * prices.Senior;
    }
  });
  return childPrice + adultPrice + seniorPrice;
}
console.log(entryCalculator({ Child: 0, Senior: 0, Adult: 1 }));
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
  entryCalculator,
  // schedule,
  animalCount,
  // animalMap,
  // animalsByIds,
  employeeByName,
  // employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  // oldestFromFirstSpecies,
  // increasePrices,
  createEmployee,
};
