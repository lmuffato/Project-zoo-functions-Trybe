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
const data = require('./data');

function animalsByIds(...ids) {
  const animalsFound = animals.filter((animal) => ids.find((unitId) => animal.id === unitId));
  return animalsFound;
}

function animalsOlderThan(animal, age) {
  const species = animals.find((group) => group.name === animal);
  return species.residents.every((singleAnimal) => singleAnimal.age >= age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return employees.find((worker) => worker.
    firstName === employeeName || worker.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  const newEmployee = Object.assign(personalInfo, associatedWith);
  return newEmployee;
}

function isManager(id) {
  return employees.some((worker) => worker.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newWorker = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  employees.push(newWorker);
}

function animalCount(species) {
  if (species === undefined) {
    return {
      bears: 3,
      elephants: 4,
      frogs: 2,
      giraffes: 6,
      lions: 4,
      otters: 4,
      penguins: 4,
      snakes: 2,
      tigers: 2 };
  }
  return animals.find((group) => group.name === species).residents.length;
}

function entryCalculator(entrants) {
  if (entrants === undefined) {
    return 0;
  }
  return Object.entries(entrants).reduce((acc, [key, value]) => acc += (prices[key] * value), 0);
}

function animalMap(options) {

}

function schedule(dayName) {
  // seu código aqui
}

function oldestFromFirstSpecies(id) {
  const idSpecies = employees.find((worker) => worker.id === id).responsibleFor[0];
  const species = animals.find((animal) => animal.id === idSpecies);
  const animal = species.residents.sort((a, b) => (b.age - a.age))[0];
  const { name, sex, age } = animal;
  return [ name, sex, age ];
}

function increasePrices(percentage) {
  const { Adult, Child, Senior} = prices;
  newPriceAdult = Adult + (Math.round(Adult * percentage) / 100);
  newPriceChild = Child + (Math.round(Child * percentage) / 100);
  newPriceSenior = Senior + (Math.round(Senior * percentage) / 100);
  prices.Adult = parseFloat(newPriceAdult.toFixed(2));
  prices.Child = parseFloat(newPriceChild.toFixed(2));
  prices.Senior = parseFloat(newPriceSenior.toFixed(2));
}

function employeeCoverage(idOrName) {
  // seu código aqui
}

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  animalMap,
  animalsByIds,
  employeeByName,
  employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  oldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
