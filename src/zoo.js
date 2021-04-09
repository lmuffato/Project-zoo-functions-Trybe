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
// os requisitos foram feitos colaborativamente com as colegas  , Heloisa , Thalia Cecillier, Débora Passos, Djaniza e Bia Zidioti, Ana Ventura, Marília,

const { animals } = require('./data');
const { employees } = require('./data');
// const data = require('./data');

function animalsByIds(...ids) {
  return animals.filter((animal) => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  return animals.find((animale) => animale.name === animal)
    .residents.every((res) => res.age >= age);
}

function employeeByName(employeeName) {
  if (!employeeName) {
    return {};
  }
  return employees.find((employee) =>
    employee.firstName === employeeName || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers = [], responsibleFor = [] } = associatedWith;
  return {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
}

function isManager(id) {
  return employees.some((employe) => employe.managers
    .some((item) => item === id) === true);
}

// function addEmployee(id, firstName, lastName, managers, responsibleFor) {
// seu código aqui
// }

function animalCount(species) {
  const quantityOFAnimals = animals.reduce((acc, animales) => {
    acc[animales.name] = animales.residents.length;
    return acc;
  }, {});

  if (!species) {
    return quantityOFAnimals;
  }
  const quantityOfResidents = animals.find((animales) => animales.name === species);
  const arrayOfResidents = quantityOfResidents.residents.length;
  return arrayOfResidents;
}

// function entryCalculator(entrants) {
// seu código aqui
// }

// function animalMap(options) {
// seu código aqui
// }

// function schedule(dayName) {
// seu código aqui
// }

// function oldestFromFirstSpecies(id) {
// seu código aqui
// }

// function increasePrices(percentage) {
// const percent = (1 + (percentage / 100));
// const keys = objects.keys(prices);
// }

// function employeeCoverage(idOrName) {
// seu código aqui
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
  createEmployee,
};
