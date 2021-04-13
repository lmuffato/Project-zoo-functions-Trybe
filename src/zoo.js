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

// const { animals } = require('./data');
// const { employees } = require('./data');
const { animals } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  return data.animals.filter((animal, index) => animal.id === ids[index]);
}

function animalsOlderThan(animal, age) {
  return data.animals
    .find((arrayAnimal) => arrayAnimal.name === animal).residents
    .every((objAnimal) => objAnimal.age > age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) return {};
  return data.employees
    .find((employee) => employee.firstName === employeeName || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
}

function isManager(id) {
  return data.employees.some(({ managers }, index) => managers[index] === id);
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
  if (!species) {
    return data.animals.reduce((acc, animal) => {
      acc[animal.name] = animal.residents.length;
      return acc;
    }, {});
  }
  return data.animals.find((animal) => animal.name === species).residents.length;
}

function entryCalculator(entrants) {
  if (!entrants) return 0;

  const visitants = Object.entries(entrants);

  if (!visitants.length) return 0;

  return visitants
    .map(([ageRange, quant]) => quant * data.prices[ageRange])
    .reduce((acc, value) => acc + value);
}

// function schedule(dayName) {
//   const hour = Object.entries(data.hours);

//   return hour.reduce((acc, day) => {
//     const { open, close } = day[1];
//     if (dayName === day[0]) {
//       acc[dayName] = `Open from ${open}am until ${close - 12}pm`;
//       if (day[0] === 'Monday') acc[dayName] = 'CLOSED';
//     }
//     if (!dayName) {
//       acc[day[0]] = `Open from ${open}am until ${close - 12}pm`;
//       if (day[0] === 'Monday') acc[day[0]] = 'CLOSED';
//     }
//     return acc;
//   }, {});
// }
// console.log(schedule('Monday'));

function oldestFromFirstSpecies(id) {
  const findFirstSpecieId = data.employees.find((employee) => id === employee.id).responsibleFor[0];
  const findAllOfTheSpecie = animals.find((animal) => findFirstSpecieId === animal.id).residents;
  const findTheOldestAnimal = findAllOfTheSpecie.reduce((acc, animal) => {
    if (acc.age > animal.age) return acc;
    return animal;
  }, 0);
  return Object.values(findTheOldestAnimal);
}

// function increasePrices(percentage) {
//   const arrayPrices = Object.entries(data.prices);

//   return arrayPrices.reduce((acc, price) => {
//     acc[price[0]] = Math.round((price[1] * (percentage / 100) + price[1]) * 100) / 100;
//     return acc;
//   }, {});
// }
// console.log(increasePrices(50));

// function employeeCoverage(idOrName) {
//   // seu código aqui
// }

module.exports = {
  entryCalculator,
  // schedule,
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
