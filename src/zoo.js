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

const { animals, employees } = require('./data');

function animalsByIds(...ids) {
  const foundedAnimals = [];

  ids.forEach((parameter) => {
    const selectAnimals = animals.find((animal) => animal.id === parameter);
    foundedAnimals.push(selectAnimals);
  });

  return foundedAnimals;
}

function animalsOlderThan(animal, age) {
  const findAnimal = animals.find((species) => species.name === animal);
  const { residents } = findAnimal;

  return residents.every((eachAnimal) => eachAnimal.age >= age);
}

function employeeByName(employeeName) {
  if (!employeeName) {
    return {};
  }

  const firstName = employees.find((object) => object.firstName === employeeName);
  const lastName = employees.find((object) => object.lastName === employeeName);

  if (firstName === undefined) {
    return lastName;
  }

  return firstName;
}

// function createEmployee(personalInfo, associatedWith) {
//   // seu código aqui
// }

// function isManager(id) {
//   // seu código aqui
// }

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
  // isManager,
  animalsOlderThan,
  // oldestFromFirstSpecies,
  // increasePrices,
  // createEmployee,
};
