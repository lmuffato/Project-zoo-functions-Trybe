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
  return animals.filter((animal) => ids.find((id) => id === animal.id));
}

function animalsOlderThan(animal, age) {
  return animals.find((anml) => anml.name === animal).residents.every((anim) => anim.age >= age);
}

function employeeByName(employeeName) {
  const employee = employees
    .find((emply) => employeeName === emply.firstName || employeeName === emply.lastName);
  const employeeObj = { ...employee };
  return employeeObj;
}

function createEmployee(personalInfo, associatedWith) {
  const employeeObj = {
    id: personalInfo.id,
    firstName: personalInfo.firstName,
    lastName: personalInfo.lastName,
    managers: associatedWith.managers,
    responsibleFor: associatedWith.responsibleFor,
  };
  return employeeObj;
}

function isManager(searchId) {
  return employees.find((employee) => employee.id === searchId).managers.length === 1;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };

  employees.push(newEmployee);
}

/* eslint-disable no-param-reassign */
function animalCount(species) {
  if (species) {
    return animals.find((animal) => animal.name === species).residents.length;
  }

  const allAnimals = animals.reduce((objAnimal, currAnimal) => {
    objAnimal[currAnimal.name] = currAnimal.residents.length;
    return objAnimal;
  }, {});
  return allAnimals;
}
/* eslint-disable no-param-reassign */

function entryCalculator(entrants = 0) {
  if (entrants === 0) return 0;
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;

  return (Adult * 49.99) + (Child * 20.99) + (Senior * 24.99);
}

function animalMap() {
  // seu código aqui
}

function schedule(dayName) {
  const dailySchedule = {};
  const selectedDay = (day) => {
    if (day === 'Monday') {
      dailySchedule[day] = 'CLOSED';
    } else {
      dailySchedule[day] = `Open from ${hours[day].open}am until ${hours[day].close - 12}pm`;
    }
  };
  if (dayName) {
    selectedDay(dayName);
  } else {
    const newObject = Object.keys(hours).forEach((key) => {
      selectedDay(key);
    });
    Object.assign(dailySchedule, newObject);
  }
  return dailySchedule;
}

function oldestFromFirstSpecies(id) {
  const firstSpecie = employees.find((empl) => empl.id === id).responsibleFor[0];
  const animalsFromThatSpecie = animals.find((animal) => animal.id === firstSpecie).residents;
  const oldestAnimal = animalsFromThatSpecie.sort((a, b) => b.age - a.age)[0];
  return Object.values(oldestAnimal);
}

function increasePrices(percentage) {
  const source = {};
  Object.keys((prices)).forEach((key) => {
    const priceTimesPercentage = prices[key] * percentage;
    const pricePlusPercentage = prices[key] + (priceTimesPercentage / 100);
    const setDecimalPoints = pricePlusPercentage + Number.EPSILON;
    const biggerRoundedPrice = Math.round(setDecimalPoints * 100);
    source[key] = biggerRoundedPrice / 100;
  });
  Object.assign(prices, source);
}

function employeeCoverage() {
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
