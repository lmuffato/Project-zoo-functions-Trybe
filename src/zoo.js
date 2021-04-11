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
  const { animals } = data;
  return animals.filter(({ id }) => ids.includes(id));
}

function animalsOlderThan(animalName, animalAge) {
  const { animals } = data;
  return animals
    .find(({ name }) => name === animalName)
    .residents
    .every(({ age }) => age >= animalAge);
}

function employeeByName(employeeName) {
  const { employees } = data;
  if (!employeeName) return {};
  if (employees.some(({ firstName }) => firstName === employeeName)) {
    return employees.find(({ firstName }) => firstName === employeeName);
  }
  return employees.find(({ lastName }) => lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  const newObject = {
    ...personalInfo,
    ...associatedWith,
  };
  return newObject;
}

function isManager(id) {
  const { employees } = data;
  return employees.some(({ managers }) => managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  const { employees } = data;
  const obj = {
    id,
    firstName,
    lastName,
    managers: managers || [],
    responsibleFor: responsibleFor || [],
  };
  return employees.push(obj);
}

function animalCount(species) {
  const { animals } = data;
  if (!species) {
    return animals.reduce((acc, { name, residents }) => {
      acc[name] = residents.length;
      return acc;
    }, {});
  }
  const animal = animals.find(({ name }) => name === species);
  return animal.residents.length;
}

function entryCalculator(entrants) {
  if (!entrants || Object.entries(entrants).length === 0) return 0;
  const { prices } = data;
  return Object
    .entries(entrants)
    .map(([key, value]) => value * prices[key])
    .reduce((acc, cValue) => acc + cValue);
}

// function animalMap(options) {
// seu código aqui
// }

function schedule(dayName) {
  const { hours } = data;
  const obj = {};
  const value = Object.values(hours);
  const keys = Object.keys(hours);
  let day;
  let hour;
  for (let index = 0; index < keys.length - 1; index += 1) {
    day = keys[index];
    hour = value[index];
    Object.assign(obj, { [day]: `Open from ${hour.open}am until ${hour.close}am` });
  }
  Object.assign(obj, { Monday: 'CLOSED' });
  return (dayName !== undefined ? { [dayName]: obj[dayName] } : obj);
}

// function oldestFromFirstSpecies(id) {
// seu código aqui
// }

// function increasePrices(percentage) {
// seu código aqui
// }

// function employeeCoverage(idOrName) {
// seu código aqui
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
  // oldestFromFirstSpecies,
  // increasePrices,
  createEmployee,
};
