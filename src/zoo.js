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
// const { animals } = require('./data');
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

function schedule(dayName) {
  const hour = Object.entries(data.hours);
  const openingHours = Object.values(data.hours);

  return hour.reduce((acc, animal, index) => {
    const { open, close } = openingHours[index];
    if (dayName === animal[0]) {
      acc[dayName] = `Open from ${open}am until ${close - 12}pm`;
      if (animal[0] === 'Monday') acc[dayName] = 'CLOSED';
    }
    if (!dayName) {
      acc[animal[0]] = `Open from ${open}am until ${close - 12}pm`;
      if (animal[0] === 'Monday') acc[animal[0]] = 'CLOSED';
    }
    return acc;
  }, {});
}

// const hour = Object.entries(data.hours);
//   const objDays = {};
//   hour.forEach(([day, { open, close }]) => {
//     if (open !== close) objDays[day] = `Open from ${open}am until ${close - 12}pm`;
//     if (open === close) objDays[day] = 'CLOSED';
//   });
//   if (!dayName) return objDays;
//   return dayParametro(dayName);

// function oldestFromFirstSpecies(id) {
//   // seu código aqui
// }

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
  // oldestFromFirstSpecies,
  // increasePrices,
  createEmployee,
};
