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

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  const managersArray = employees.map((employee) => employee.managers);
  const verifyManager = managersArray.some((managers) => managers.includes(id));

  return verifyManager;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };

  return employees.push(newEmployee);
}

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

// parametro é um objeto - 3 idades  (detructuring?)
// fazer um condicionamento de acordo com idades
// percorrer objeto de preçoes, linkar com os condicionamentos
// retorno numérico: preço total da entrada

function entryCalculator(entries = 0) {
  if (entries === {}) return 0;

  const visistors = Object.entries(entries);
  const sumAll = visistors.map((person) => (prices[person[0]] * person[1]))
    .reduce((acc, currentValue) => acc + currentValue, 0);

  return sumAll;
}

// function animalMap(options) {
//   // seu código aquiS
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
  addEmployee,
  isManager,
  animalsOlderThan,
  // oldestFromFirstSpecies,
  // increasePrices,
  createEmployee,
};
