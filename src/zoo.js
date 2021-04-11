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

/* essa porra não quer adicionar o arquivo, por isso estou escrevendo essa merda de cometario */

const { animals, employees } = require('./data');

function animalsByIds(...idsRest) {
  // seu código aqui
  return animals.filter(({ id }) => idsRest.includes(id));
}

function animalsOlderThan(animal, ageAnimal) {
  // seu código aqui
  const nameAnimal = animals.find(({ name }) => animal.includes(name)).residents;
  return nameAnimal.every(({ age }) => age > ageAnimal);
}

function employeeByName(employeeName) {
  // seu código aqui
  if (employeeName === undefined) return {};
  return employees.find(({ firstName, lastName }) => (
    firstName === employeeName || lastName === employeeName
  ));
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  // seu código aqui
  return employees.some((idManager) => idManager.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  const newEmployee = employees;
  newEmployee.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

// function animalCount(species) {
//   if ( species === undefined){
// return animals.reduce((obj, animalValue) => {
//   obj[animalValue.name] = animalValue.residents.length;
//   return obj;
// },{})
//   }
// return animals.find(({name}) => species === name).residents.length;
// }
// console.log(animalCount('lions'));

/*function entryCalculator(entrants) {
  // seu código aqui
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // seu código aqui
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
  // seu código aqui
}

function employeeCoverage(idOrName) {
  // seu código aqui
}*/

module.exports = {
  // entryCalculator,
  // schedule,
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
