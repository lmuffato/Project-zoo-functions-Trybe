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
const data = require('./data');

function animalsByIds(...ids) {
  return animals.filter(({ id }) => ids.includes(id));
}

function animalsOlderThan(animalSelect, ageSelect) {
  return animals
    .find(({ name }) => name === animalSelect)
    .residents
    .every(({ age }) => age >= ageSelect);
}

function employeeByName(nome) {
  if (!nome) return {};
  const i = data.employees;
  return i.find(({ firstName, lastName }) => firstName === nome || lastName === nome);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return data.employees
    .some(({ managers }) => managers
      .includes(id));
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

function animalCount(species) {
  if (species === undefined) {
    return animals.reduce((acc, curr) => {
      acc[curr.name] = curr.residents.length;
      return acc;
    }, {});
  }
  return data.animals.find(({ name }) => name === species).residents.length;
}

function entryCalculator(entrants) {
  if (typeof entrants === 'undefined' || entrants === {}) return 0;
  const { Adult = 0, Senior = 0, Child = 0 } = entrants;
  const { Adult: adulto, Senior: idosos, Child: criança } = data.prices;
  return (adulto * Adult) + (idosos * Senior) + (criança * Child);
}

// function animalMap(options) {
//   // seu código aqui
// }

function schedule(dayName) {
  const cronograma = {};
  const { hours } = data;
  const days = Object.keys(hours);
  if (!dayName) {
    days.forEach((day) => {
      const { open, close } = hours[day];
      const isOpen = open - close !== 0 ? `Open from ${open}am until ${close - 12}pm` : 'CLOSED';
      cronograma[day] = isOpen;
    });
    return cronograma;
  }
  const day = days.find((dia) => dia === dayName);
  if (dayName === 'Monday') {
    cronograma[day] = 'CLOSED';
    return cronograma;
  }
  cronograma[day] = `Open from ${hours[day].open}am until ${hours[day].close - 12}pm`;
  return cronograma;
}

// function oldestFromFirstSpecies(id) {
//   // seu código aqui
// }

function increasePrices(percentage) {
  const multiply = (percentage / 100) + 1;
  let currKeyValue = 0;
  Object.entries(data.prices).forEach(([key, value]) => {
    currKeyValue = value * multiply;
    data.prices[key] = Math.round(currKeyValue * 100) / 100;
  });
  return data.prices;
}

// function employeeCoverage(idOrName) {
//   const { animals, employees } = data;
//   const resultKeyValue
//   if (idOrName === undefined) {
//     employees.map((value) => firstName === idOrName);
//   }
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
  increasePrices,
  createEmployee,
};
