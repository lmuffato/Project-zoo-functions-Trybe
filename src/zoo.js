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
  data.animals.forEach((animal) => animalCountObject[animal.name] = animal.residents.length);

  // Como faria com reduce?

  if (!species) return animalCountObject;
  return animalCountObject[species];
}

function entryCalculator(entrants) {
  if (!entrants) return 0;
  return Object.keys(entrants).reduce((accum, ageGroup) => accum + data.prices[ageGroup]*entrants[ageGroup], 0);
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  const scheduleObject = Object.keys(data.hours).reduce((accum, weekDay) => {
    const openTime = data.hours[weekDay].open;
    const closeTime = data.hours[weekDay].close - 12;
    let weekDayObject = { [weekDay]: `Open from ${openTime}am until ${closeTime}pm` }; 
      return Object.assign(accum, weekDayObject);
    }, {});
  
  scheduleObject.Monday = 'CLOSED';

  if (!dayName) return scheduleObject;
  return { [dayName]: scheduleObject[dayName] };
}

function oldestFromFirstSpecies(id) {
  const firstAnimalId = data.employees.find((employee) => employee.id === id).responsibleFor[0];
  console.log(firstAnimalId);
  const firstAnimalObject = animalsByIds(firstAnimalId)[0];
  console.log(firstAnimalObject);
  const oldestAnimal = firstAnimalObject.residents.sort((a, b) => b.age - a.age)[0];
  console.log(oldestAnimal);
  return [oldestAnimal.name, oldestAnimal.sex, oldestAnimal.age];
}

console.log(oldestFromFirstSpecies('9e7d4524-363c-416a-8759-8aa7e50c0992'));

function increasePrices(percentage) {
  // seu código aqui
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
