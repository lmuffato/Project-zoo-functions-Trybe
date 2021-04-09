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
  // seu código aqui
  const idAnimal = [];
  ids.forEach((id) => {
    data.animals.forEach((animal) => {
      if (id === animal.id) {
        idAnimal.push(animal);
      }
    });
  });
  return idAnimal;
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  const animalVerify = data.animals.find((animalName) => animalName.name === animal);
  return animalVerify.residents.every((resident) => resident.age > age);
}

function employeeByName(employeeName) {
  // seu código aqui
  const employeeObj = data.employees.filter((employee) =>
    employee.firstName === employeeName || employee.lastName === employeeName);
  const toObject = employeeObj.reduce((obj, item) => Object.assign(obj, item), {});
  return toObject;
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

// function isManager(id) {
//   // seu código aqui
// }

// function addEmployee(id, firstName, lastName, managers, responsibleFor) {
//   // seu código aqui
// }

// function animalCount(species) {
//   // seu código aqui
// }

// function entryCalculator(entrants) {
//   // seu código aqui
// }

// function animalMap(options) {
//   // seu código aqui
// }

// function schedule(dayName) {
//   // seu código aqui
// }

// function oldestFromFirstSpecies(id) {
//   // seu código aqui
// }

// function increasePrices(percentage) {
//   // seu código aqui
// }

// function employeeCoverage(idOrName) {
//   // seu código aqui
// }

module.exports = {
  // entryCalculator,
  // schedule,
  // animalCount,
  // animalMap,
  animalsByIds,
  employeeByName,
  // employeeCoverage,
  // addEmployee,
  // isManager,
  animalsOlderThan,
  // oldestFromFirstSpecies,
  // increasePrices,
  createEmployee,
};

// Conteúdo utilizado para consulta na resolução de alguns exercícios.:
// https://stackoverflow.com/questions/19874555/how-do-i-convert-array-of-objects-into-one-object-in-javascript
