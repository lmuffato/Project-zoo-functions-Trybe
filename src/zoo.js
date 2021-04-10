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

const data = require('./data');

const { animals, employees } = data;

function animalsByIds(...ids) {
  return animals.filter(({ id }) => ids.includes(id));
}

function animalsOlderThan(animal, age) {
  const filterAnimal = animals.find(({ name }) => name === animal);

  const { residents } = filterAnimal;

  const checkAge = residents.every((resident) => resident.age > age);

  return checkAge;
}

function employeeByName(employeeName) {
  if (!employeeName) {
    return {};
  }

  return employees.find(({ firstName, lastName }) =>
    firstName === employeeName || lastName === employeeName);
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
// const findEmployee =  employees.find((employee) => employee.id === id);
  return employees.some((employee) => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  return {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
}

function animalCount(species) {
  const findAnimal = animals.find(({ name }) => name === species);
  const objectOfAnimals = {};

  if (species === undefined) {
    for (let i = 0; i < animals.length; i += 1) {
      objectOfAnimals[animals[i].name] = animals[i].residents.length;
    }
    return objectOfAnimals;
  }

  if (animals.find(({ name }) => name === species)) {
    const animalCounting = findAnimal.residents.length;
    return animalCounting;
  }
}

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
  //   entryCalculator,
  //   schedule,
  animalCount,
  //   animalMap,
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
