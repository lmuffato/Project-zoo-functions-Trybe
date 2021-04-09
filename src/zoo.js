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

const { animals, employees, prices, hours } = require('./data');

// Ok
function animalsByIds(...ids) {
  if (!ids) {
    return [];
  }
  const result = animals.filter((animal, index) => animal.id === ids[index]);
  return result;
}

// Ok
function animalsOlderThan(animal, age) {
  return animals.find((creature) => creature.name === animal).residents
    .every((resident) => resident.age >= age);
}

// Ok
function employeeByName(employeeName) {
  if (!employeeName) {
    return {};
  }
  const result = employees.find(({ firstName, lastName }) => firstName === employeeName
  || lastName === employeeName);
  return result;
}

// Ok
function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

// Ok
function isManager(id) {
  return employees.some(({ managers }) => managers.includes(id));
}

// Ok
function addEmployee(id = '', firstName = '', lastName = '', managers = [], responsibleFor = []) {
  const personalInfo = { id, firstName, lastName };
  const associatedWith = { managers, responsibleFor };
  const employee = createEmployee(personalInfo, associatedWith);
  employees.push(employee);
}

// Ok
function animalCount(species) {
  const result = animals.reduce((acc, animal) => {
    const { name, residents } = animal;
    acc[name] = residents.length;
    return acc;
  }, {});
  if (species !== undefined) return result[species];
  return result;
}

// Ok
function entryCalculator(entrants) {
  if (!entrants) return 0;

  let result = 0;
  const ticketPrice = Object.values(entrants);
  const arrayPeapleType = Object.keys(entrants);
  arrayPeapleType.forEach((person, index) => {
    result += prices[person] * ticketPrice[index];
  });
  return result;
}

function animalMap(options) {
  // seu código aqui
}

// Ok
function schedule(dayName) {
  const obj = {};
  const days = Object.keys(hours);
  days.forEach((day) => {
    const { open, close } = hours[day];
    if (day === 'Monday') {
      obj[day] = 'CLOSED';
    } else {
      obj[day] = `Open from ${open}am until ${close % 12}pm`;
    }
  });
  return dayName ? { [dayName]: obj[dayName] } : obj;
}

// const { animals, employees, prices, hours } = require('./data');

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
