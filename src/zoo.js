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
// const data = require('./data');

function animalsByIds(...ids) {
  // seu código aqui
  return animals.filter((animal) => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  return animals
    .find((animalType) => animalType.name === animal)
    .residents.every((animalAge) => animalAge.age >= age);
}

function employeeByName(employeeName) {
  // seu código aqui
  if (employeeName === undefined) {
    return {};
  }
  return employees.find((employe) => employe.firstName === employeeName || employe
    .lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
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
  // seu código aqui
  return employees.some((employe) =>
    employe.managers.find((employeId) => employeId === id));
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers: managers || [],
    responsibleFor: responsibleFor || [],
  };

  return employees.push(newEmployee);
}

function animalCount(species) {
  // seu código aqui
  if (species === undefined) {
    const obj = {};
    animals.forEach((animal) => { obj[animal.name] = animal.residents.length; });
    return obj;
  }
  const animalFind = animals.find((animal) => animal.name === species).residents.length;
  return animalFind;
}

function entryCalculator(entrants) {
  // seu código aqui
  if (entrants !== undefined && entrants !== {}) {
    const entrantKeys = Object.keys(entrants);
    return entrantKeys.reduce((acc, curr) => {
      let accumulator = acc;
      accumulator += entrants[curr] * prices[curr];
      return accumulator;
    }, 0);
  }
  return 0;
}

// function animalMap(options) {
//   // seu código aqui
// }

function schedule(dayName) {
  if (dayName === undefined) {
    const humanHours = {
      Tuesday: 'Open from 8am until 6pm',
      Wednesday: 'Open from 8am until 6pm',
      Thursday: 'Open from 10am until 8pm',
      Friday: 'Open from 10am until 8pm',
      Saturday: 'Open from 8am until 10pm',
      Sunday: 'Open from 8am until 8pm',
      Monday: 'CLOSED',
    };
    return humanHours;
  }
  const currentDay = {};
  if (dayName === 'Monday') {
    currentDay[dayName] = 'CLOSED';
  } else {
    currentDay[dayName] = `Open from ${hours[dayName].open}am until ${hours[dayName].close - 12}pm`;
  } return currentDay;
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
  const employeAnimal = animals.find((animal) => animal.id === employees
    .find((employeId) => employeId.id === id).responsibleFor[0]);
  const oldestAnimal = employeAnimal.residents
    .reduce((acc, curr) => (acc.age > curr.age ? acc : curr));
  return [oldestAnimal.name, oldestAnimal.sex, oldestAnimal.age];
}

function increasePrices(percentage) {
  const values = Object.keys(prices);
  values.forEach((price) => {
    prices[price] = Math.ceil(prices[price] * (percentage + 100)) / 100;
    return prices;
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
