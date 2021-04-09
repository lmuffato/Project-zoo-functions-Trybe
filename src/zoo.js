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

const filterAnimals = (animal) => [animals.find((eachAnimal) => eachAnimal.name === animal)];

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

// Para essa função utilizei o repositório do Anderson Nascimento como fonte.
function animalsListBySpecies() {
  return animals.reduce((acc, { name, residents }) => {
    acc[name] = residents.length;
    return acc;
  }, {});
}

function animalCount(specie) {
  if (!specie) {
    return animalsListBySpecies();
  }
  return animals.find((animal) => animal.name === specie).residents.length;
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
  addEmployee,
  isManager,
  animalsOlderThan,
  // oldestFromFirstSpecies,
  // increasePrices,
  createEmployee,
};
