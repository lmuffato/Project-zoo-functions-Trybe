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

const { employees } = require('./data');
const data = require('./data');

const { animals } = data;

function animalsByIds(...ids) {
  // seu código aqui
  const animalArray = animals.filter((animal) => ids.includes(animal.id));
  return animalArray;
}

// function animalsOlderThan(animalName, ageAnimal) {
//   // seu código aqui
//   // const { residents } = animals;
//   // const { age } = residents;
//   const ageCheck = animals.filter((animal) => animal.name === animalName);
//   return ageCheck; // .some(() => ageAnimal >= age);
// }

// console.log(animalsOlderThan('otters', 7));
// console.log(animals.residents);

function employeeByName(employeeName) {
  // seu código aqui
  if (employeeName === undefined) {
    const emptyObject = {};
    return emptyObject;
  }
  return employees.find((employe) => employe.firstName === employeeName
  || employe.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  const newEmployee = { ...personalInfo, ...associatedWith };
  return newEmployee;
}

// function isManager(id) {
//   // seu código aqui
//   // const { managers } = employees;
//   const personCheck = employees.find((employ) => employ.id === id);
//   return personCheck.managers.some((person) => person !== []);
// }

// console.log(isManager('0e7b460e-acf4-4e17-bcb3-ee472265db83'));

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  // return [
  //   ...employees,
  //   newEmployee,
  // ];
  return employees.push(newEmployee);
}

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
  addEmployee,
  // isManager,
  // animalsOlderThan,
  // oldestFromFirstSpecies,
  // increasePrices,
  createEmployee,
};
