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
const { animals, employees, prices, hours } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  return data.animals.filter((specie, index) => specie.id === ids[index]);
}

function animalsOlderThan(animal, age) {
  return data.animals
    .find((specie) => specie.name === animal)
    .residents.every((ageSpecie) => ageSpecie.age > age);
}
console.log(animalsOlderThan('otters', 7));

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return employees.find((managers) => managers.firstName === employeeName
  || managers.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return data.employees
    .some((gerente) => gerente.managers
      .some((manager) => manager === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const array = [];
  array.id = id;
  array.firstName = firstName;
  array.lastName = lastName;
  array.managers = [...managers];
  array.responsibleFor = [...responsibleFor];
  employees.push(array);
}

function animalCount(species) {
  const objChange = {};
  if (species) {
    return animals.find((specie) => specie.name === species).residents
      .reduce((acumulator) => acumulator + 1, 0);
  }
  animals.forEach((animal) => {
    const animalsN = animal.residents.reduce((acc) => acc + 1, 0);
    objChange[animal.name] = animalsN;
  });
  return objChange;
}

function entryCalculator(entrants = false) {
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  return !entrants || entrants === {} ?
    0 : (Adult * prices.Adult) + (Child * prices.Child) + (Senior * prices.Senior);
}

function animalMap(options) {
  return options;
}

function schedule(dayName) {
  let dayList = {};
  Object.keys(hours).forEach((day) =>
    day !== 'Monday' ? dayList[day] = `Open from ${hours[day].open}am until ${hours[day].close - 12}pm` 
      : dayList[day] = 'CLOSED');
    if (!dayName) {
      return dayList;
    }
    return { [dayName]: dayList[dayName] };
}

function oldestFromFirstSpecies(id) {
  return id;
}

function increasePrices(percentage) {
  return percentage;
}

function employeeCoverage(idOrName) {
  return idOrName;
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
