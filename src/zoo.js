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
const { animals } = require('./data');
const { employees } = require('./data');
const { prices } = require('./data');
// const { hours } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  // seu código aqui
  if (ids.length === 0) {
    return [];
  }
  return animals
    .filter((animal) => ids
      .some((id) => animal.id === id));
}

function animalsOlderThan(animalName, age) {
  // seu código aqui
  return animals
    .find((animal) => animal.name === animalName).residents
    .every((animal) => animal.age >= age);
}

function employeeByName(employeeName) {
  // seu código aqui
  if (employeeName === undefined) return {};
  return employees
    .find((employee) => employee.firstName === employeeName || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
}

function isManager(id) {
  // seu código aqui
  return employees
    .some(({ managers }) => managers.indexOf(id) !== -1);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  return employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species = false) {
  // seu código aqui
  const obj = {};
  if (species === false) {
    animals.forEach((animal) => {
      const residentsNumber = animal.residents.length;
      obj[animal.name] = residentsNumber;
    });
  } else {
    return animals.find((animal) => animal.name === species).residents.length;
  }
  return obj;
}

function entryCalculator(entrants) {
  // seu código aqui
  if (entrants === undefined) return 0;
  if (entrants === {}) return 0;
  const { Adult = 0, Senior = 0, Child = 0 } = entrants;
  const resultado = (Adult * prices.Adult) + (Senior * prices.Senior) + (Child * prices.Child);
  return resultado;
}
// console.log(entryCalculator());
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
  const obj = {};
  if (idOrName === undefined) {
    employees.forEach(({ firstName, lastName, responsibleFor }) => {
      const fullName = `${firstName} ${lastName}`;
      // console.log(fullName);
      const idsAnimals = (responsibleFor
        .map((x) => animals
          .find((animal) => animal.id === x).name));
      obj[fullName] = idsAnimals;
    });
  }
  return obj;
}
console.log(employeeCoverage());
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
