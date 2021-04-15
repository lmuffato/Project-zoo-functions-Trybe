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
const data = require('./data');

function animalsByIds(...ids) {
  return list = animals.filter(({ id }, index) => id === ids[index]);
}

function animalsOlderThan(animal, age) {
  const verifyAnimalName = animals.find((thisAnimal) =>
    (thisAnimal.name === animal));
 return verifyAnimalName.residents.every(animalAge => (animalAge.age > age));
 };

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  } else {
  return foundEmployee = data.employees.find((employee) => {
     if (employee.firstName === employeeName || employee.lastName === employeeName)
      return employee;
    });
  }
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
}

function isManager(id) {
  return foundManager = data.employees.some((employeeIsManager) => employeeIsManager.managers.find((managers) =>
  managers === id));
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  return {
    id: id,
    firstName: firstName,
    lastName: lastName,
    managers: [managers],
    responsibleFor: [responsibleFor],
  }
}

function animalCount(species) {
  // seu código aqui
}

function entryCalculator(entrants) {
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
