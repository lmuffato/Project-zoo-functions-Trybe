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

const { animals, employees, prices, hours } = data;

function animalsByIds(...ids) {
  return animals.filter((animal) => ids.find((some) => animal.id === some));
}

function animalsOlderThan(specie, age) {
  const animalName = animals.find((animmal) => animmal.name === specie);
  const result = animalName.residents.every((animalSelected) => animalSelected.age > age);
  return result;
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  return employees.find(({ firstName, lastName }) =>
    firstName === employeeName || lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.some((employee) => employee.managers.includes(id) === true);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {
  if (!species) {
    return animals.reduce((acc, animal) => {
      acc[animal.name] = animal.residents.length;
      return acc;
    }, {});
  }
  return animals
    .filter((animal) => animal.name === species)
    .reduce((acc, animal) => acc + animal.residents.length, 0);
}

function entryCalculator(entrants = 0) {
  let total = 0;
  Object.keys(entrants).forEach((entrant) => {
    total += prices[entrant] * entrants[entrant];
  });
  return total;
}

// function animalMap(options) {
// }

function schedule(dayName) {
  const allSchedule = {
    Tuesday: `Open from ${hours.Tuesday.open}am until ${hours.Tuesday.close - 12}pm`,
    Wednesday: `Open from ${hours.Wednesday.open}am until ${hours.Wednesday.close - 12}pm`,
    Thursday: `Open from ${hours.Thursday.open}am until ${hours.Thursday.close - 12}pm`,
    Friday: `Open from ${hours.Friday.open}am until ${hours.Friday.close - 12}pm`,
    Saturday: `Open from ${hours.Saturday.open}am until ${hours.Saturday.close - 12}pm`,
    Sunday: `Open from ${hours.Sunday.open}am until ${hours.Sunday.close - 12}pm`,
    Monday: 'CLOSED',
  };
  if (!dayName) {
    return allSchedule;
  } if (dayName === 'Monday') {
    return { Monday: 'CLOSED' };
  }
  return { [dayName]: `Open from ${hours[dayName].open}am until ${hours[dayName].close - 12}pm` };
}

// Ajuda Raphael Rodrigues
function oldestFromFirstSpecies(id) {
  const employeeResp = employees.find((employee) => employee.id === id).responsibleFor[0];
  const animalsById = animals.find((animal) => animal.id === employeeResp);
  const theOldest = animalsById.residents.sort((animalA, animalB) => animalB.age - animalA.age)[0];
  return [theOldest.name, theOldest.sex, theOldest.age];
}

// function increasePrices(percentage) {
//   // seu código aqui
// }

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
  // increasePrices,
  createEmployee,
};
