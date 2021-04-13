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

const { prices, employees, animals, hours } = require('./data');
// const data = require('./data');

function animalsByIds(...ids) {
  return animals.filter((animal) => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  return animals.find((oneAnimal) => oneAnimal.name === animal)
    .residents.every((resident) => resident.age >= age);
}

function employeeByName(employeeName) {
  if (!employeeName) {
    return {};
  }
  return employees.find((employee) =>
    employee.firstName === employeeName || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return { id, firstName, lastName, managers, responsibleFor };
}

function isManager(id) {
  return employees.some((employee) => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers: managers || [],
    responsibleFor: responsibleFor || [],
  };
  employees.push(newEmployee);
}

function animalCount(species) {
  if (!species) {
    const animalObj = {};
    animals.forEach((animal) => {
      animalObj[animal.name] = animal.residents.length;
    });
    return animalObj;
  }
  return animals.find((animal) => animal.name === species).residents.length;
}

function entryCalculator(entrants) {
  if (!entrants || entrants === {}) {
    return 0;
  }
  return Object.entries(entrants)
    .map(([entrant, qty]) => qty * prices[entrant])
    .reduce(((acc, curr) => acc + curr), 0);
}

// function animalMap(options) {
// seu código aqui
// }

function schedule(dayName) {
  const arrayDays = Object.keys(hours);
  const openHours = Object.values(hours);
  const scheduleObj = {};
  arrayDays.forEach((hour, i) => {
    scheduleObj[hour] = `Open from ${openHours[i].open}am until ${(openHours[i].close) - 12}pm`;
  });
  scheduleObj.Monday = 'CLOSED';
  if (!dayName) {
    return scheduleObj;
  } if (dayName === 'Monday') {
    return { Monday: 'CLOSED' };
  }
  const asArray = Object.entries(scheduleObj);
  const withDayName = asArray.filter(([key]) => key === dayName);
  const objFiltered = Object.fromEntries(withDayName);
  return objFiltered;
}

function oldestFromFirstSpecies(id) {
  const employeeData = employees.find((employee) => employee.id === id);
  const firstAnimal = employeeData.responsibleFor[0];
  const animalData = animals.filter((animal) => animal.id === firstAnimal)[0].residents;
  const sorted = animalData.sort((a, b) => (a.age < b.age ? 1 : -1));
  return Object.values(sorted[0]);
}

function increasePrices(percentage) {
  const percent = (1 + (percentage / 100));
  const keys = Object.keys(prices);
  keys.forEach((key) => {
    prices[key] = (Math.round(prices[key] * percent * 100) / 100);
  });
}

function employeeCoverage(idOrName) {
  const empObj = {};
  if (!idOrName) {
    employees.forEach(({ firstName, lastName, responsibleFor }) => {
      const fullName = `${firstName} ${lastName}`;
      const animalList = responsibleFor.map((animalId) =>
        animals.find(({ id }) => animalId === id).name);
      empObj[fullName] = animalList;
    });
    return empObj;
  }
  const empFind = employees.find(({ firstName, lastName, id }) => [id, firstName, lastName]
    .includes(idOrName));
  const fullName = `${empFind.firstName} ${empFind.lastName}`;
  const animalList = empFind.responsibleFor.map((animalId) =>
    animals.find(({ id }) => animalId === id).name);
  empObj[fullName] = animalList;
  return empObj;
}

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  // animalMap,
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
