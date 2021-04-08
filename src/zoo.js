/*
eslint no-unused-vars: [
  "error",
  {
    "args": "none",
    "vars": "local"
    "varsIgnorePattern": "data"
  }
]
*/
const { animals, employees, prices, hours } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  return animals.filter((animal, index) => animal.id === ids[index]);
}

function animalsOlderThan(animal, age) {
  return animals
    .find((specie) => specie.name === animal)
    .residents.every((specie) => specie.age > age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) return {};
  return data.employees
    .find((employee) => employee.firstName === employeeName || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees
    .some((employee) => employee.managers
      .some((gerente) => gerente === id));
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
  const animalPopulation = {};
  animals.forEach((animal) => animalPopulation[animal.name] = animal.residents.length);
  if (species === undefined) return animalPopulation;
  return animalPopulation[species];
}

function entryCalculator(entrants) {
  if (entrants === undefined) return 0;
  if (Object.keys(entrants).length === 0) return 0;
  const { Adult = 0, Senior = 0, Child = 0 } = entrants;
  const total = (Adult * prices.Adult) + (Child * prices.Child) + (Senior * prices.Senior);
  return total;
}

/* function animalMap(options) {
  // seu código aqui
} */

function schedule(dayName) {
  const dayObj = {};
  Object.keys(hours).forEach((day) => {
    if (day !== 'Monday') {
      dayObj[day] = `Open from ${hours[day].open}am until ${(hours[day].close) - 12}pm`;
    } else {
      dayObj[day] = 'CLOSED';
    }
  });
  if (!dayName) {
    return dayObj;
  }
  return { [dayName]: dayObj[dayName] };
}

function oldestFromFirstSpecies(id) {
  const firstAnimalId = employees.find((employee) => employee.id === id)
    .responsibleFor[0];
  const residents = animals.find((animal) => animal.id === firstAnimalId)
    .residents;
  const oldestAnimal = residents.reduce((older, resident) =>
    older.age < resident.age ? resident : older);
  return Object.values(oldestAnimal);
}

/* function increasePrices(percentage) {
  // seu código aqui
}

function employeeCoverage(idOrName) {
  // seu código aqui
} */

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
  // increasePrices,
  createEmployee,
};
