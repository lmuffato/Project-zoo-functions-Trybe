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
// Questão resolvida com o apoio fundamental do meu amigo Luan Ramalho!

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
// Questão resolvida com o apoio do PH - TRIBO A, que me fez sentir ir além com essa questão... hahhaaha

// function animalMap(options) {
//   // seu código aqui
// }

function openAndCloseToText(open, close) {
  if (open === close) {
    return 'CLOSED';
  }
  return `Open from ${open}am until ${close - 12}pm`;
}

function schedule(dayName) {
  const hour = Object.entries(data.hours);

  return hour.reduce((acc, day) => {
    const { open, close } = day[1];

    if (dayName === day[0]) {
      acc[dayName] = openAndCloseToText(open, close);
    }

    if (!dayName) {
      acc[day[0]] = openAndCloseToText(open, close);
    }

    return acc;
  }, {});
}

function oldestFromFirstSpecies(id) {
  const findFirstSpecieId = data.employees.find((employee) => id === employee.id).responsibleFor[0];
  const findAllOfTheSpecie = animals.find((animal) => findFirstSpecieId === animal.id).residents;
  const findTheOldestAnimal = findAllOfTheSpecie.reduce((acc, animal) => {
    if (acc.age > animal.age) return acc;
    return animal;
  }, 0);
  return Object.values(findTheOldestAnimal);
}

function increasePrices(percentage) {
  const { Adult, Child, Senior } = data.prices;

  data.prices.Adult = (Math.ceil(Adult * (percentage + 100))) / 100;
  data.prices.Child = (Math.ceil(Child * (percentage + 100))) / 100;
  data.prices.Senior = (Math.ceil(Senior * (percentage + 100))) / 100;
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
