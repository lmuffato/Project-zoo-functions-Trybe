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

const { animals } = require('./data');
const { employees } = require('./data');
// const data = require('./data');

function animalsByIds(...ids) {
  return animals.filter((animal) => ids.includes(animal.id));
}

/*
function animalsOlderThan(animal, age) {
const obj = animals.find((anim) => anim.name === animal); // nesse caso, o find sozinho retorna um obj, mas depois do .residents, ele vira array
return obj.residents.every((anim2) => anim2.age > age);
}
*/

function animalsOlderThan(animal, ageA) {
  return animals
    .find(({ name }) => name === animal).residents
    .every(({ age }) => age > ageA);
}

function employeeByName(employeeName) {
  if (!employeeName) {
    return {};
  }
  return employees.find((employee) =>
    employee.firstName === employeeName || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return {
    ...personalInfo,
    ...associatedWith,
  };
}

// function isManager(id) {
//  return employees.some((employee) => }

// function addEmployee(id, firstName, lastName, managers, responsibleFor) {}

// function animalCount(species) {}

// function entryCalculator(entrants) {}

// function animalMap(options) {}

// function schedule(dayName) {}

// function oldestFromFirstSpecies(id) {}

// function increasePrices(percentage) {}

// function employeeCoverage(idOrName) {}

module.exports = {
  // entryCalculator,
  // schedule,
  // animalCount,
  // animalMap,
  animalsByIds,
  employeeByName,
  // employeeCoverage,
  // addEmployee,
  // isManager,
  animalsOlderThan,
  // oldestFromFirstSpecies,
  // increasePrices,
  createEmployee,
};
