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
// const data = require('./data');

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

function isManager(id) {
  const managersArray = employees.map((employee) => employee.managers);
  const verifyManager = managersArray.some((managers) => managers.includes(id));

  return verifyManager;
}

// function addEmployee(id, firstName, lastName, managers, responsibleFor) {
//   // seu código aqui
// }

const getSpecies = () => {
  const counted = {};
  animals.forEach((animal) => {
    counted[animal.name] = Object.entries(animal.residents).length;
  });

  return counted;
};

function animalCount(species) {
  const listedAnimals = getSpecies();

  if (!species) {
    return getSpecies();
  }

  return listedAnimals[species];
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
  // entryCalculator,
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
