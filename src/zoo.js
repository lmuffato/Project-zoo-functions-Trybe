const data = require('./data');

function animalsByIds(...ids) {
  const animals = [];
  ids.forEach((id) => {
    animals.push(data.animals.find((animal) => animal.id === id));
  });
  return animals;
}

function animalsOlderThan(animal, age) {
  return `${animal} ${age}`;
}

function employeeByName(employeeName) {
  return `${employeeName}`;
}

function createEmployee(personalInfo, associatedWith) {
  return `${personalInfo} ${associatedWith}`;
}

function isManager(id) {
  return `${id}`;
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  return `${id} ${firstName} ${lastName} ${managers} ${responsibleFor}`;
}

function animalCount(species) {
  return `${species}`;
}

function entryCalculator(entrants) {
  return `${entrants}`;
}

function animalMap(options) {
  return `${options}`;
}

function schedule(dayName) {
  return `${dayName}`;
}

function oldestFromFirstSpecies(id) {
  return `${id}`;
}

function increasePrices(percentage) {
  return `${percentage}`;
}

function employeeCoverage(idOrName) {
  return `${idOrName}`;
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
