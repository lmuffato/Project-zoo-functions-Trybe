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
  return animals.filter((animal) => ids.some((id) => animal.id === id));
}

function animalsOlderThan(animalName, age) {
  const animalsFiltered = animals.find((animal) => animal.name === animalName).residents;
  return animalsFiltered.every((animal) => animal.age >= age);
}

function employeeByName(employeeName) {
  if (employeeName !== undefined) {
    return employees
      .find((name) => name.firstName === employeeName || name.lastName === employeeName);
  }
  return {};
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
  const employeeById = employees.find((employee) => employee.id === id);
  return employees.some((employee) => employee.managers
    .includes(employeeById.name || employeeById.id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

// function animalCount(species) {
//   if (species !== undefined) {
//     const animalsSpecies = animals.find((animal) => animal.name === species);
//     return animalsSpecies.residents.length;
//   }

//   return animals.reduce((obj, animal) => { 
//     obj = {};
//     obj[animal.name] = animal.residents.length
//   }, {});

// }
// animalCount();

function entryCalculator(entryPeople) {
  if (entryPeople !== undefined) {
    const { Adult = 0, Child = 0, Senior = 0 } = entryPeople;
    const sum = Adult * prices.Adult + Child * prices.Child + Senior * prices.Senior;
    return sum;
  } return 0;
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
