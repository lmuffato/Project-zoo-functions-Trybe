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
  if (ids.length === 0) return [];

  return ids.map((id) => data.animals.find((animal) => animal.id === id));
}

function animalsOlderThan(animal, age) {
  const animals = data.animals.find((findAnimal) => findAnimal.name === animal).residents;
  return animals.every((eachAnimal) => eachAnimal.age >= age);
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  const empByFirstName = data.employees.find(((employee) => employee.firstName === employeeName));
  const empByLastName = data.employees.find(((employee) => employee.lastName === employeeName));
  if (empByFirstName) return empByFirstName;
  if (empByLastName) return empByLastName;
}

function createEmployee(personalInfo, associatedWith) {
  return {
    ...personalInfo,
    ...associatedWith,
  };
}

// Refatoração para utilizar some inspirada no código do André Barroso,
// conforme apresentado no fechamento do dia 10 de abril de 2021.
function isManager(id) {
  return data.employees.some((employee) => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };

  data.employees.push(newEmployee);
}

function animalCount(species) {
  if (!species) {
    const allSpecies = {};
    data.animals.forEach((animal) => {
      allSpecies[animal.name] = animal.residents.length;
    });
    return allSpecies;
  }

  return data.animals.find((animal) => animal.name === species).residents.length;
}

function hasPeopleCalculation(people) {
  const { Adult, Child, Senior } = people;

  return (Adult ? (Adult * data.prices.Adult) : 0)
    + (Child ? (Child * data.prices.Child) : 0)
    + (Senior ? (Senior * data.prices.Senior) : 0);
}

function entryCalculator(entrants) {
  if (!entrants) return 0;
  if (Object.entries(entrants).length === 0) return 0;

  return hasPeopleCalculation(entrants);
}

/*
function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // seu código aqui
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
  // seu código aqui
}

function employeeCoverage(idOrName) {
  // seu código aqui
}
*/
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
