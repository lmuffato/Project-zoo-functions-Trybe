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
  return ids.map((idParam) => data.animals.find((animal) => animal.id === idParam));
}

function animalsOlderThan(animal, age) {
  const animalObject = data.animals.find((el) => el.name === animal);
  return animalObject.residents.every((resident) => resident.age > age);
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  return data.employees.find((employee) => employee.firstName === employeeName
  || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  let result = false;
  data.employees.forEach((employee) => {
    if (employee.managers.includes(id)) result = true;
  });
  return result;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = { id, firstName, lastName, managers, responsibleFor };
  data.employees.push(newEmployee);
}

function animalCount(species) {
  const animalCountObject = {};
  data.animals.forEach((animal) => {
    animalCountObject[animal.name] = animal.residents.length;
  });
  // Como faria com reduce?

  if (!species) return animalCountObject;
  return animalCountObject[species];
}

function entryCalculator(entrants) {
  if (!entrants) return 0;
  return Object.keys(entrants).reduce((accum, ageGroup) => {
    const newValue = data.prices[ageGroup] * entrants[ageGroup];
    return accum + newValue;
  }, 0);
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  const scheduleObject = Object.keys(data.hours).reduce((accum, weekDay) => {
    const openTime = data.hours[weekDay].open;
    const closeTime = data.hours[weekDay].close - 12;
    const weekDayObject = { [weekDay]: `Open from ${openTime}am until ${closeTime}pm` };
    return Object.assign(accum, weekDayObject);
  }, {});

  scheduleObject.Monday = 'CLOSED';

  if (!dayName) return scheduleObject;
  return { [dayName]: scheduleObject[dayName] };
}

function oldestFromFirstSpecies(id) {
  const firstAnimalId = data.employees.find((employee) => employee.id === id).responsibleFor[0];
  const firstAnimalObject = animalsByIds(firstAnimalId)[0];
  const oldestAnimal = firstAnimalObject.residents.sort((a, b) => b.age - a.age)[0];

  return [oldestAnimal.name, oldestAnimal.sex, oldestAnimal.age];
}

function increasePrices(percentage) {
  Object.keys(data.prices).forEach((ageGroup) => {
    data.prices[ageGroup] *= (1 + percentage/100);
    data.prices[ageGroup] = Math.round(data.prices[ageGroup]*100)/100;
  });
}

function employeeCoverage(idOrName) {
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
