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
  return data.animals.filter((animal) => ids.some((id) => animal.id === id));
}

function animalsOlderThan(animal, age) {
  const especie = data.animals.find((specie) => specie.name === animal);
  return especie.residents.every((obj) => obj.age > age);
}

function employeeByName(name) {
  let employee = data.employees.find((emp) => emp.firstName === name || emp.lastName === name);
  if (!name) employee = {};
  return employee;
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return { id, firstName, lastName, managers, responsibleFor };
}

function isManager(id) {
  return data.employees.some((employee) =>
    employee.managers.some((idEmployee) =>
      idEmployee === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalNum() {
  return data.animals.reduce((acc, animal) => {
    acc[animal.name] = animal.residents.length;
    return acc;
  }, {});
}

function animalCount(species) {
  const countAnimalSpecies = animalNum();
  if (!species) {
    return countAnimalSpecies;
  }
  return countAnimalSpecies[species];
}

function entryCalculator(entrants) {
  if (!entrants) return 0;
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  return (data.prices.Adult * Adult) + (data.prices.Child * Child) + (data.prices.Senior * Senior);
}

/*
function animalMap(options) {
  // seu código aqui
}
*/

function schedule(dayName) {
  let workDay;
  if (dayName) workDay = { [dayName]: data.hours[dayName] };
  else workDay = data.hours;
  return Object.entries(workDay)
    .reduce((agenda, day) => Object.assign(agenda, { [day[0]]: (day[1].open !== 0)
      ? `Open from ${day[1].open}am until ${day[1].close - 12}pm` : 'CLOSED' }), {});
}
// uso de reduce visto no plantão

function oldestFromFirstSpecies(id) {
  const helper = data.employees.find((person) => person.id === id).responsibleFor[0];
  const answer = data.animals.find((creature) => creature.id === helper).residents
    .sort((creature1, creature2) => creature2.age - creature1.age)[0];
  return [answer.name, answer.sex, answer.age];
}

function increasePrices(percentage) {
  Object.keys(data.prices).forEach((category) => {
    data.prices[category] *= (1 + (percentage / 100));
    data.prices[category] = Math.round(data.prices[category] * 100) / 100;
  });
}

/*
function employeeCoverage(idOrName) {
  // seu código aqui
}
*/

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
