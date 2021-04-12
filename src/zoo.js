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
// function animalCount(species) {
//   // seu código aqui
// }

// function entryCalculator(entrants) {
//   // seu código aqui
// }

// function animalMap(options) {
//   // seu código aqui
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
  schedule,
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
