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
const { animals, employees } = data;

function animalsByIds(...ids) {
  const animalsArray = [];
  ids.forEach((idParam, index) => (animals[index].id === idParam ? animalsArray.push(animals[index]):animalsArray))
  return animalsArray;
}

function animalsOlderThan(name, age) {
  const objAnimal = animals.find((animal) => animal.name === name);
  return result = objAnimal.residents.every((animal) => animal.age >= age ? true:false);
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  return employees.find((emp) => (emp.firstName === employeeName || emp.lastName === employeeName))
}

function createEmployee(personalInfo, associatedWith) {
  const {id, firstName, lastName} = personalInfo;
  const {managers, responsibleFor} = associatedWith;

  const obj = {id,firstName,lastName,managers,responsibleFor};
  return obj;
}

function isManager(id) {
  const managerList = [];
  employees.forEach((emp) => (emp.managers.length > 0 ? managerList.push(...emp.managers):emp.managers))
  const check = managerList.find((gerenteId) => gerenteId === id)
  return check ? true:false;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return employees.push({id, firstName, lastName, managers, responsibleFor})
}

function animalCount(species) {
  const listAnimals = {};
  data.animals.forEach((animal) => Object.assign(listAnimals, {[animal.name]:animal.residents.length}));
  if (!species) {return listAnimals}
  return listAnimals[species]
}

function entryCalculator(entrants) {
  // seu código aqui
  if (!entrants || entrants.length === 0 || entrants.length === undefined) {return 0} 
  return 'test'
  
}
console.log(entryCalculator({}));

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
