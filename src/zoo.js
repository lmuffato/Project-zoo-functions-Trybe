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
  const arr = [];
  const selectAnimals = ids.reduce((array, currentValue, index) => {
    const valueId = ids[index];
    const validade = animals.find((search) => search.id === valueId);
    arr.push(validade);
    return arr;
  }, []);
  return selectAnimals;
}

function animalsOlderThan(animal, age) {
  const check = animals.find((currentValue) => currentValue.name === animal);
  const testCheck = check.residents.every((value) => value.age >= age);
  return testCheck;
}

function employeeByName(employeeName) {
  if (typeof employeeName === 'undefined') {
    return {};
  }
  if (data.employees.some((value) => value.firstName === employeeName)) {
    return employees.find((value) => value.firstName === employeeName);
  }
  if (data.employees.some((value) => value.lastName === employeeName)) {
    return employees.find((value) => value.lastName === employeeName);
  }
}

function createEmployee(personalInfo, associatedWith) {
  return Object.assign(personalInfo, associatedWith);
}

function isManager(id) {
  const idResponsible = employees.find((current) => current.id === id);
  return idResponsible.managers[0] === '9e7d4524-363c-416a-8759-8aa7e50c0992';
}

// function addEmployee(id, firstName, lastName, managers, responsibleFor) {

// }

function animalCount(species) {
  const objectAnimals = {};
  const noParameters = () => animals.reduce((acc, value) => {
    const arrAnimals = value.name;
    const arrNumbers = value.residents.length;
    objectAnimals[arrAnimals] = arrNumbers;
    return objectAnimals;
  }, {});
  const parameters = (nameAnimals) => {
    let numberAnimals = 0;
    animals.find((currentValue, index) => {
      if (currentValue.name === nameAnimals) {
        numberAnimals = currentValue.residents.length;
      }
      return numberAnimals;
    });
    return numberAnimals;
  };
  return typeof species === 'undefined' ? noParameters() : parameters(species);
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
// seu código aqui
// }

// function employeeCoverage(idOrName) {
// seu código aqui
// }

module.exports = {
//   entryCalculator,
//  schedule,
   animalCount,
//   animalMap,
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
