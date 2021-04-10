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

const { animals, prices } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  return data.animals.filter(({ id }) => ids.includes(id));
}

animalsByIds();

function animalsOlderThan(animal, animalAge) {
  const especie = data.animals.find(({ name }) => name === animal);
  return especie.residents.every(({ age }) => age > animalAge);
}
console.log(animalsOlderThan('otters', 8));

function employeeByName(employeeName) {
  if (!employeeName) return {};
  return data.employees.find(({ firstName, lastName }) => firstName === employeeName
  || lastName === employeeName);
}
console.log(employeeByName('Burl'));

function createEmployee(personalInfo, associatedWith) {
  const employee = { ...personalInfo, ...associatedWith };
  return employee;
}

function isManager(id) {
  return data.employees.some(({ managers }) => managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const employee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  data.employees.push(employee);
}

function animalCount(species) {
  if (!species) {
    return animals.reduce((acc, animal) => {
      acc[animal.name] = animal.residents.length;
      return acc;
    }, {});
  }
  return animals.find(({ name }) => name.includes(species)).residents.length;
}
console.log(animalCount('lions'));

function entryCalculator(entrants) {
  if (!entrants || Object.keys(entrants).length === 0) return 0;
  const { Adult, Senior, Child } = data.prices;
  const { Adult: qntAdult = 0, Senior: qntSenior = 0, Child: qntChild = 0 } = entrants;
  return Adult * qntAdult + Senior * qntSenior + Child * qntChild;
}

entryCalculator();

// function animalMap(options) {
//   // seu código aqui
// }

const message = (openHour, closeHour) => (openHour === 0 && closeHour === 0
  ? 'CLOSED' : `Open from ${openHour}am until ${closeHour - 12}pm`);

function makingObj(hours, obj) {
  const daysObj = obj;
  Object.entries(hours).forEach((item) => {
    const [weekday, dayObj] = item;
    const { open, close } = dayObj;
    daysObj[weekday] = message(open, close);
  });
}

function schedule(dayName) {
  const { hours } = data;
  const obj = {};
  makingObj(hours, obj);
  if (!dayName) return obj;
  return { [dayName]: obj[dayName] };
}

console.log(schedule('Monday'));

function oldestFromFirstSpecies(id) {
  const employ = data.employees.find((person) => person.id === id).responsibleFor[0];
  const animalSearch = animals.find((animalFound) => animalFound.id === employ);
  const { residents } = animalSearch;
  const result = residents.sort((a, b) => b.age - a.age)[0];
  const { name, sex, age } = result;

  return [name, sex, age];
}

// contribuição para desenvolvimento da lógica com 'Lucas Pedroso'
function increasePrices(percentage) {
  const percents = (1 + (percentage / 100));
  const ObjKey = Object.keys(prices);
  ObjKey.forEach((key) => {
    prices[key] = (Math.round(prices[key] * percents * 100) / 100);
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
