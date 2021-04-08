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

// const allSpeciesCount = () => {
//   const speciesCount = {};
//   animals.forEach((animal) => {
//     speciesCount.animal.name = animal.residents.length;
//   });
//   return speciesCount;
// };

// function animalCount(species = allSpeciesCount) {
//   if (species !== undefined) {
//     const animalsSpecies = animals.find((animal) => animal.name === species);
//     console.log(animalsSpecies.residents.length);
//     return animalsSpecies.residents.length;
//   }
//   animals.reduce((acc, cv) => ({ acc.cv.name: acc[cv.residents.length]}),{} );
// }
// animalCount('snakes');
// function entryCalculator(entrants) {
// seu código aqui
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
  addEmployee,
  isManager,
  animalsOlderThan,
  // oldestFromFirstSpecies,
  // increasePrices,
  createEmployee,
};
