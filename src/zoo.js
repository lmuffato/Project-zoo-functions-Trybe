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
  return data.animals.filter(({ id }) => ids.includes(id));
}

function animalsOlderThan(animal, age) {
  const species = data.animals.find((animalItem) => animalItem.name === animal);
  return species.residents.every((resident) => resident.age >= age);
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  return data.employees.find((employee) =>
    employee.firstName === employeeName || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return {
    id,
    firstName,
    lastName,
    responsibleFor,
    managers,
  };
}

function isManager(id) {
  const manager = data.employees.find((employee) => employee.id === id);
  return manager.managers.length < 2;
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
  const speciesList = {};
  data.animals.forEach((animal) => Object.assign(speciesList, {
    [animal.name]: animal.residents.length,
  }));
  if (!species) { return speciesList; }
  return speciesList[species];
}

function entryCalculator(entrants) {
  if (!entrants) return 0;

  const people = Object.keys(entrants);
  const price = Object.values(entrants);
  let totalPrice = 0;

  people.forEach((person, index) => {
    if (person === 'Adult') {
      totalPrice += price[index] * data.prices.Adult;
    } else if (person === 'Child') {
      totalPrice += price[index] * data.prices.Child;
    } else if (person === 'Senior') {
      totalPrice += price[index] * data.prices.Senior;
    }
  });
  return totalPrice;
}

// function animalMap(options) {
//   // seu código aqui
// }

function schedule(dayName) {
  const dailySchedule = (day) => {
    const openTime = data.hours[day].open;
    const closingTime = data.hours[day].close;
    if (openTime === 0 && closingTime === 0) {
      return 'CLOSED';
    } return `Open from ${openTime}am until ${closingTime - 12}pm`;
  };

  const days = Object.keys(data.hours);
  const scheduleInformation = {};
  if (dayName === undefined) {
    days.forEach((day) => {
      scheduleInformation[day] = dailySchedule(day);
    });
  } else {
    scheduleInformation[dayName] = dailySchedule(dayName);
  }
  return scheduleInformation;
}

function oldestFromFirstSpecies(id) {
  const person = data.employees.find((employee) => employee.id === id);
  const personAndAnimal = data.animals.find((animal) => person.responsibleFor[0] === animal.id);

  const { residents } = personAndAnimal;
  const oldest = residents.reduce((older, younger) => {
    let olderAge = older;
    if (younger.age > olderAge.age) {
      olderAge = younger;
    }
    return olderAge;
  });

  const result = [];
  result.push(oldest.name);
  result.push(oldest.sex);
  result.push(oldest.age);
  return result;
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
