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

function animalsByIds(...ids) {
  const { animals } = data;
  const arrayIdAnimal = [];
  if (ids.length === 0) return [];
  ids.forEach((idsAnimals) => {
    arrayIdAnimal.push(animals.find((animal) => animal.id === idsAnimals));
  });
  return arrayIdAnimal;
}

function animalsOlderThan(animal, ageMin) {
  const { animals } = data;
  const animalSelect = animals.find((animalBuscado) => animalBuscado.name === animal);
  const trueFalse = animalSelect.residents.every((nAnimal) => nAnimal.age >= ageMin);
  return trueFalse;
}

function employeeByName(employeeName) {
  const { employees } = data;
  // const objetVazio = {};
  // const employeeFirst = employees.find((employeeBuscado) =>employeeBuscado.firstName === employeeName);
  // const employeeLast = employees.find((employeeBuscado) =>employeeBuscado.lastName === employeeName);
  if (employeeName === undefined) return {};
  return employees.find((nam) => nam.firstName === employeeName || nam.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  const { employees } = data;
  return employees.some(({ managers }) => managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const { employees } = data;
  const addeNewEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return employees.push(addeNewEmployee);
}

function animalCount(species) {
  const { animals } = data;
  if (!species) {
    const arrayVazio = {};
    animals.forEach((animal) => {
      arrayVazio[animal.name] = animal.residents.length;
    });
    return arrayVazio;
  }
  return animals.find((animal) => animal.name === species).residents.length;
}

function entryCalculator(entrants) {
  if (typeof entrants === 'undefined' || entrants === {}) return 0;
  const { prices } = data;
  const { Adult = 0, Senior = 0, Child = 0 } = entrants;
  const tAdults = Adult * prices.Adult;
  const tSeniors = Senior * prices.Senior;
  const tChilds = Child *prices.Child;
  return tAdults + tSeniors + tChilds;
}
console.log(entryCalculator({}));

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
  addEmployee,
  isManager,
  animalsOlderThan,
  // oldestFromFirstSpecies,
  // increasePrices,
  createEmployee,
};
