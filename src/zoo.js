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
  const animalsIds = [...ids];
  if (!animalsIds) return [];
  return animalsIds.map((uniqueId) => data.animals.find((animalId) => animalId.id === uniqueId));
}
function animalsOlderThan(animal, age) {
  const getAnimals = data.animals.find((animalData) => animalData.name === animal);
  const isOlderThan = getAnimals.residents.every((animalAge) => animalAge.age >= age);
  return isOlderThan;
}
function employeeByName(employeeName) {
  if (!employeeName) return {};
  return data.employees
    .find((name) => name.firstName === employeeName || name.lastName === employeeName);
}
function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return newEmployee;
}
function isManager(id) {
  return data.employees.some((managerName) => managerName.managers.includes(id));
}
function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  const manager = managers || [];
  const resp = responsibleFor || [];
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers: manager,
    responsibleFor: resp,
  };
  return data.employees.push(newEmployee);
}
function animalCount(species) {
  const animalObj = {};
  data.animals.map((animal) => {
    animalObj[animal.name] = animal.residents.length;
    return animalObj;
  });
  if (!species) return animalObj;
  return animalObj[species];
}
function entryCalculator(entrants) {
  if (!entrants || Object.keys(entrants).length === 0) return 0;
  return Object.keys(entrants).map((entrant) => {
    const { prices } = data;
    return prices[entrant] * entrants[entrant];
  }).reduce((acc, currVal) => acc + currVal);
}
// function animalMap(options) {
//   const geo = {};
//   data.animals.map((animal) => {
//     geo[animal.location] = data.animals.map((names) => names[animal.name]);
//     return geo;
//   });
//   if (!options) return geo;
// }

function schedule(dayName) {
  const returnedObj = {};
  Object.keys(data.hours).map((day) => {
    returnedObj[day] = data.hours[day].open < 6
      ? 'CLOSED'
      : `Open from ${data.hours[day].open}am until ${data.hours[day].close - 12}pm`;
    return returnedObj;
  });
  if (!dayName) return returnedObj;
  return { [dayName]: returnedObj[dayName] };
}
function oldestFromFirstSpecies(id) {
  const getAnimalId = data.employees.filter((employee) => employee.id === id)[0].responsibleFor[0];
  const getResidents = data.animals.find((animal) => animal.id === getAnimalId).residents;
  const setResults = getResidents.reduce((acc, currVal) => {
    if (acc.age > currVal.age) return acc;
    return currVal;
  });
  return [setResults.name, setResults.sex, setResults.age];
}

function increasePrices(percentage) {
  Object.keys(data.prices).forEach((price) => {
    (data.prices[price] = Math.round(data.prices[price] * ((percentage / 100) + 1) * 100) / 100);
  });
}
// function employeeCoverage(idOrName) {
//   // seu código aqui
// }

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  // animalMap,
  animalsByIds,
  employeeByName,
  // employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  oldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
