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
  // seu código aqui - ta ok
  return data.employees.some((employee) => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui - ta ok
  const employeeNew = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  data.employees.push(employeeNew);
}

function animalCount(species) {
  // seu código aqui
  if (species === undefined) {
    return data.animals.reduce((acc, curr) => {
      acc[curr.name] = curr.residents.length;
      return acc;
    }, {});
  }

  if (species !== undefined) {
    return data.animals.find((animal) => animal.name === species).residents.length;
  }
}
console.log(animalCount());

// function entryCalculator(entrants) {
//   if (entrants === undefined || entrants === ) return 0;

// }
// console.log(entryCalculator({}));

// function animalMap(options) {
//   // seu código aqui
// }

// function schedule(dayName) {
//   // seu código aqui
// }

// function oldestFromFirstSpecies(id) {
//   // seu código aqui
//   const employee = data.employees.find((ele) => ele.id === id);
//   const idSpecie = employee.responsibleFor[0];
//   data.animals.reduce((acc, curr) => {
//     curr.
//   }, [])
//   return idSpecie;
// }
// console.log(oldestFromFirstSpecies('c5b83cb3-a451-49e2-ac45-ff3f54fbe7e1'));
// function increasePrices(percentage) {
//   // seu código aqui
//   const {adutl, child, senior} = data.prices
//   data.prices
// }

// function employeeCoverage(idOrName) {
//   // seu código aqui
// }

module.exports = {
  // entryCalculator,
  //  schedule,
  animalCount,
  //  animalMap,
  animalsByIds,
  employeeByName,
  //   employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  // oldestFromFirstSpecies,
  // increasePrices,
  createEmployee,
};
