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
  return data.animals.filter(({ id }) => ids.includes((id)));
}

function animalsOlderThan(animal, minimumAge) {
  const animalName = data.animals.find(({ name }) => name === animal);
  return animalName.residents.every(({ age }) => age >= minimumAge);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) return {};
  return data.employees.find(({ firstName, lastName }) =>
    employeeName === firstName || employeeName === lastName);
}

function createEmployee({ id, firstName, lastName }, { managers, responsibleFor }) {
  return {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
}

function isManager(id) {
  return data.employees.some(({ managers }) => managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(...species) {
  if (species.length === 0) {
    const animals = data.animals.map((animal) => animal.name);
    const count = data.animals.map((animal) => animal.residents.length);
    const allAnimals = {};
    animals.forEach((animal, index) => { allAnimals[animal] = count[index]; });
    return allAnimals;
  }
  const searchAnimals = data.animals.filter((animal) => species.includes(animal.name));
  return searchAnimals.reduce((result, each) => each.residents.length, 0);
}

function entryCalculator(entrants) {
  if (!entrants) return 0;
  const people = Object.keys(entrants);
  return people.reduce((result, key) => result + entrants[key] * data.prices[key], 0);
}

const getLocations = () => {
  const locations = [];
  data.animals.forEach((animal) => {
    if (!locations.includes(animal.location)) locations.push(animal.location);
  });
  return locations;
};

const notIncludeNames = (locations) => {
  const map = {};
  locations.forEach((loc) => map[loc] = data.animals
    .filter((animal) => animal.location.includes(loc)).map((animal) => animal.name));
  return map;
}

const animalSpecie = (animalName) => {
  const teste = {};
  animalName.forEach((animal) => teste[animal] = 'teste');
  console.log(teste);
}

const filterAnimals = (loc) => {
  const animals = data.animals.filter((animal) => animal.location.includes(loc)).map((animal) => animal.name);
  const animalNames = animalSpecie(animals);
  return animalNames;
}

const includeLocations = (locations) => {
  const obj = {};
  locations.forEach((location) => obj[location] = filterAnimals(location));
  return obj;
}

function animalMap(options = { includeNames: false, sex: 'both', sorted: false }) {
  const locations = getLocations();
  if (!options.includeNames) return notIncludeNames(locations);
  return includeLocations(locations);
}

console.log(animalMap({ includeNames: true }));

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
