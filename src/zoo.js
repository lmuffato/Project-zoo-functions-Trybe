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

const { employees, animals, prices } = require('./data');
// const data = require('./data');

function animalsByIds(...ids) {
  const foundAnimals = animals.filter((animal) => ids.some((id) => id === animal.id));
  return foundAnimals;
}

function animalsOlderThan(animal, age) {
  return animals.find((dataAnimal) => dataAnimal.name === animal)
    .residents.every((dataAge) => dataAge.age >= age);
}

function employeeByName(name) {
  const employee = employees
    .find((option) => (name === option.firstName || name === option.lastName));
  if (employee === undefined) {
    return {};
  }
  return employee;
}

// function createEmployee(personalInfo, associatedWith) {
//   // seu código aqui
// }

function isManager(id) {
  return employees.some((option) => (option.managers.includes(id)));
}

// function addEmployee(id, firstName, lastName, managers, responsibleFor) {
//   // seu código aqui
// }

function animalCount(species) {
  if (species === undefined) {
    const allSpecies = {};
    animals.forEach((animal) => {
      allSpecies[animal.name] = animal.residents.length;
    });
    return allSpecies;
  }
  const specie = animals.find((animal) => (species === animal.name));
  return specie.residents.length;
}

function entryCalculator(entrants) {
  if (entrants === undefined || entrants.length === 0) {
    return 0;
  }
  let sumAllEntrants = 0;

  const entrantsType = Object.keys(entrants);
  entrantsType.forEach((property) => {
    sumAllEntrants += prices[property] * entrants[property];
  });
  return sumAllEntrants;
}

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
