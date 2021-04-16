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
  if (ids.lenght === 0) return [];
  const animals = data.animals.filter(({ id }) => ids.some((idSearch) => id === idSearch));
  return animals;
}

function animalsOlderThan(animal, animalAge) {
  const animalsName = data.animals.find(({ name }) => name === animal);
  const checksAge = animalsName.residents.every(({ age }) => age >= animalAge);
  return checksAge;
}

function employeeByName(employeeName) {
  if (employeeName === undefined) return {};
  return data.employees.find(({ firstName, lastName }) =>
    firstName === employeeName || lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return data.employees.some((office) => office.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  if (species === undefined) {
    return data.animals.reduce((result, animal) =>
      Object.assign(result, { [animal.name]: animal.residents.length }), {});
  }
  return data.animals.find((animal) => animal.name === species).residents.length;
}

function entryCalculator(entrants = 0) {
  return Object.entries(entrants).reduce((result, number) =>
    result + data.prices[number[0]] * number[1], 0);
}

// function animalMap(options) {
//   // seu código aqui
// }

const menssage = (hour) => ({ [hour[0]]:
  hour[0] === 'Monday' ? 'CLOSED' : `Open from ${hour[1].open}am until ${hour[1].close - 12}pm` });

function schedule(dayName) {
  if (dayName === undefined) {
    return Object.entries(data.hours).reduce((result, dayHour) =>
      Object.assign(result, menssage(dayHour)), {});
  }
  return Object.entries(data.hours).map((checksDays) =>
    menssage(checksDays)).find((weekDay) => weekDay[dayName]);
}

function oldestFromFirstSpecies(idEmployee) {
  const searchId = data.employees.find((employee) => employee.id === idEmployee).responsibleFor[0];
  const searchAnimal = data.animals.find(({ id }) => id === searchId).residents
    .reduce((result, animal) => ((result.age > animal.age) ? result : animal));
  return Object.values(searchAnimal);
}

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
  oldestFromFirstSpecies,
  // increasePrices,
  createEmployee,
};
