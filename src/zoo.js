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
  // seu código aqui - ta ok
  return data.animals.filter((specie) => ids.some((id) => id === specie.id) === true);
}

function animalsOlderThan(animal, age) {
  // seu código aqui - ok
  return data.animals.find((element) => element.name === animal)
    .residents.every((animals) => animals.age >= age);
}

function employeeByName(employeeName) {
  // seu código aqui - ok

  if (employeeName === undefined) return {};
  if (employeeName) {
    return data.employees.find((employee) => employeeName === employee
      .firstName || employeeName === employee
      .lastName);
  }
}

const obj1 = {
  id: '7ed1c9bb-8570-44f6-b718-0666b869573a',
  firstName: 'John',
  lastName: 'Doe',
};
const obj2 = {
  managers: [
    'c5b83cb3-a451-49e2-ac45-ff3f54fbe7e1',
    '9e7d4524-363c-416a-8759-8aa7e50c0992'
  ],
  responsibleFor: [
    '0938aa23-f153-4937-9f88-4858b24d6bce',
    '89be95b3-47e4-4c5b-b687-1fabf2afa274',
    'bb2a76d8-5fe3-4d03-84b7-dba9cfc048b5'
  ]
};
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
console.log(createEmployee(obj1, obj2));

function isManager(id) {
  // seu código aqui - ta ok
  return data.employees.some((employee) => employee.managers.includes(id));
}

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
  //  entryCalculator,
  //  schedule,
  //  animalCount,
  //  animalMap,
  animalsByIds,
  employeeByName,
  //   employeeCoverage,
  //  addEmployee,
  isManager,
  animalsOlderThan,
  // oldestFromFirstSpecies,
  // increasePrices,
  createEmployee,
};
