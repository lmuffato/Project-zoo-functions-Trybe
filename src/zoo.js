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

const { employees } = data;
const { animals } = data;

function animalsByIds(...ids) {
  return animals.filter((animal, index) => animal.id === ids[index]);
}

const filterAnimals = (animal) => {
  return [
    animals.find((eachAnimal) => eachAnimal.name === animal),
  ];
};

function animalsOlderThan(animalName, animalAge) {
  const foundAnimal = filterAnimals(animalName);
  const [{ residents }] = foundAnimal;
  return residents.every((eachAnimal) => eachAnimal.age > animalAge);
}

function employeeByName(employeeName) {
  if (!employeeName) {
    return {};
  }
  return employees.find((eachEmployee) =>
    eachEmployee.firstName === employeeName || eachEmployee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  const [{ managers }] = employees;
  return managers.some((eachManager) => (eachManager === id));
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
//   if (!species) {
//     return {[animals].name}
//   }
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
  addEmployee,
  isManager,
  animalsOlderThan,
  // oldestFromFirstSpecies,
  // increasePrices,
  createEmployee,
};
