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

const data = require('./data');

const { animals, employees, prices } = data;

function animalsByIds(...ids) {
  const resultArray = [];
  ids.forEach((idParam, index) =>
    (animals[index].id === idParam ? resultArray.push(animals[index]) : resultArray));
  return resultArray;
}

function animalsOlderThan(animalName, age) {
  const objAnimal = animals.find((animal) => animal.name === animalName);
  const result = objAnimal.residents.every((secondAnimal) => secondAnimal.age >= age);
  return result;
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  return employees.find((em) => (em.firstName === employeeName || em.lastName === employeeName));
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;

  const resultObj = { id, firstName, lastName, managers, responsibleFor };
  return resultObj;
}

function isManager(id) {
  const managersArray = [];
  employees.forEach((em) => (
    em.managers.length > 0 ? managersArray.push(...em.managers) : em.managers
  ));
  const check = managersArray.find((managerId) => managerId === id);
  const bool = check !== undefined;
  return bool;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  const listAnimals = {};
  animals.forEach((animal) =>
    Object.assign(listAnimals, {
      [animal.name]: animal.residents.length,
    }));
  if (!species) { return listAnimals; }
  return listAnimals[species];
}

function entryCalculator(entrants) {
  if (typeof entrants === 'undefined') return 0;
  if (Object.keys(entrants).length === 0) return 0;
  return Object.entries(entrants).reduce((acc, [key, value]) => acc + prices[key] * value, 0);
}

// function animalMap(options) {
// // seu código aqui
// }

// function schedule(dayName) {
//   // seu código aqui
// }

function oldestFromFirstSpecies(id) {
  const specie = employees.find((emp) => (emp.id === id)).responsibleFor[0];
  const obj = animals.find((animal) => animal.id === specie);
  const { name, sex, age } = obj.residents.reduce((arr, curr) => (arr.age > curr.age ? arr : curr));
  return [name, sex, age];
}

function increasePrices(percentage) {
  const keyPrices = Object.keys(prices);
  keyPrices.forEach((key) => {
    const increased = (prices[key] + (prices[key] * percentage) / 100);
    const finalPrice = Math.floor(increased)
    + Math.ceil((increased - Math.floor(increased)) * 100) / 100;
    prices[key] = finalPrice;
  });
}

function employeeCoverage(idOrName) {
  if (!idOrName) {
    employees.forEach((em) =>
      Object.assign(obj, { [`${em.firstName} ${em.lastName}`]:
      getAnimalName(em.responsibleFor) }));
    return obj;
  }
  return selectEmployee(idOrName);
}

module.exports = {
  entryCalculator,
  // schedule,
  animalCount,
  // animalMap,
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
