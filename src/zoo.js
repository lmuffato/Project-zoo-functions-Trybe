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

const { animals, employees, hours, prices } = data;

function animalsByIds(...ids) {
  if (ids === null || ids === undefined) return [];
  return animals.filter((animal, index) => animal.id === ids[index]);
}

function animalsOlderThan(animal, age) {
  return animals.find((animale) => animale.name === animal)
    .residents.every((resident) => (resident.age >= age));
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  return employees.find((employee) =>
    employee.firstName === employeeName || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.some((employee) => employee.managers.some((manager) => manager === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  return animals.reduce((accumulator, currentValue) => {
    if (currentValue.name === species) {
      return currentValue.residents.length;
    }
    accumulator[currentValue.name] = currentValue.residents.length;
    return accumulator;
  }, {});
}

// function entryCalculator(entrants) {
//   // seu código aqui
// }

// function animalMap(options) {
//   // seu código aqui
// }

function schedule(dayName) {
  const weekSchedule = {};
  const weekDays = Object.keys(hours);

  weekDays.forEach((day) => {
    if (day === 'Monday') {
      weekSchedule[day] = 'CLOSED';
    } else {
      weekSchedule[day] = `Open from ${hours[day].open}am until ${(hours[day].close) - 12}pm`;
    }
  });
  if (!dayName) {
    return weekSchedule;
  }
  return {
    [dayName]: weekSchedule[dayName],
  };
}

function oldestFromFirstSpecies(id) {
  const soughtId = employees.find((employee) => employee.id === id);
  const speciesId = soughtId.responsibleFor.find((res) => res);
  const discoverAnimal = animals.find((animal) => animal.id === speciesId);
  const oldest = discoverAnimal.residents.reduce((firstAnimal, animal) => {
    if (firstAnimal.age > animal.age) return firstAnimal;
    return animal;
  });
  const { name, sex, age } = oldest;
  return [name, sex, age];
}

function increasePrices(percentage) {
  Object.keys(prices).forEach((agePrice) => {
    prices[agePrice] = (Math.round(prices[agePrice] * percentage) + (prices[agePrice] * 100)) / 100;
  });
}

// function employeeCoverage(idOrName) {
//   // seu código aqui
// }

module.exports = {
  // entryCalculator,
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
