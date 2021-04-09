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

const { hours } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  // seu código aqui
  return data.animals.filter(({ id }) => ids.includes(id));
}

function animalsOlderThan(animal, animalAge) {
  // seu código aqui
  const especie = data.animals.find(({ name }) => name === animal);
  return especie.residents.every(({ age }) => age >= animalAge);
}

function employeeByName(employeeName) {
  // seu código aqui
  if (!employeeName) return {};
  return data.employees.find(({ firstName, lastName }) =>
    firstName === employeeName || lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  const employee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return employee;
}

function isManager(id) {
  // seu código aqui
  return data.employees.some(({ managers }) => managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  const employee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  data.employees.push(employee);
}

function animalCount(species) {
  // feito com auxilio de: Lucas Pedroso
  if (species === undefined) {
    return data.animals.reduce((acc, currentAnimal) => {
      acc[currentAnimal.name] = currentAnimal.residents.length;
      return acc;
    }, {});
  }
  return data.animals.find(({ name }) => name === species).residents.length;
}

function entryCalculator(entrants) {
  // feito com auxilio de: Rafael Medeiros
  // seu código aqui
  if (typeof entrants === 'undefined' || entrants === {}) return 0;
  const { Adult = 0, Senior = 0, Child = 0 } = entrants;
  const { Adult: adulto, Senior: idosos, Child: criança } = data.prices;
  return (adulto * Adult) + (idosos * Senior) + (criança * Child);
}

// function animalMap(options) {
//   // seu código aqui
// }

const getScheduleDay = (day) => {
  const openTime = hours[day].open;
  const closingTime = hours[day].close;
  if (openTime === 0 && closingTime === 0) return 'CLOSED';
  return `Open from ${openTime}am until ${closingTime - 12}pm`;
};
function schedule(dayName) {
  // feito com auxilio de: Orlando Flores, Lucas Pedroso, Murilo Gonsalves e Rafael Medeiros
  // seu código aqui
  const result = {};
  const days = Object.keys(hours);

  if (dayName === undefined) {
    days.forEach((day) => { result[day] = getScheduleDay(day); });
  } else {
    result[dayName] = getScheduleDay(dayName);
  }
  return result;
}

function oldestFromFirstSpecies(params) {
  // feito com auxilio de: Iago Ferreira, Rafael Medeiros
  // seu código aqui
  let oldest = [];
  const specie = data.employees.find(({ id }) => id === params).responsibleFor[0];

  data.animals.find(({ id }) => id === specie)
    .residents.forEach((spec, index) => {
      if (index === 0) {
        oldest = [spec.name, spec.sex, spec.age];
      }
      if (spec.age > oldest[2]) {
        oldest = [spec.name, spec.sex, spec.age];
      }
    });
  return oldest;
}

function increasePrices(percentage) {
  // feito com auxilio de: Iago Ferreira, Lucas Pedroso, Murilo Gonsalves e Rafael Medeiros
  // seu código aqui
  const increase = (percentage / 100) + 1;
  let increased = 0;

  Object.entries(data.prices).forEach(([key, value]) => {
    increased = value * increase;
    data.prices[key] = Math.round(parseFloat(increased) * 100) / 100;
  });
  return data.prices;
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
