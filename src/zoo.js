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

function animalsByIds(ids) {
  // seu código aqui
}

function animalsOlderThan(animal, age) {
 //   const animalSearch = data.animals.forEach(thisAnimal => {
   //   if (thisAnimal.name === animal ) {
     //   const ageVerification = (thisAge) => {
       //   Object.values(thisAge).every((thisAnimal) => thisAge > age);
       // };
      //  return ageVerification;
     // };
   // });
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
  // seu código aqui
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
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
