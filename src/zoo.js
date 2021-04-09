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

// const data = require('./data');
const { animals, employees } = require('./data');

function animalsByIds(...ids) {
  return animals.filter((animal) => ids.some((id) => animal.id === id));
}

function animalsOlderThan(animalName, age) {
  // const animalWithName = animals.find((animal) => animal.name.includes(animalName)); // capturando objeto que possui animal.name passado por parametro.
  // const { residents } = animalWithName; // capturando array de residentes.
  // const answer = residents.every((elem) => elem.age >= age); // verificando se todas as expressões (elem.agr >= age) retornam true.
  // return answer; // retornando valor final.
  // --------------- tentativa otimização -----------
  const answer = animals.find((animal) => animal.name.includes(animalName))
    .residents.every((elem) => elem.age >= age);
  return answer;
}

// console.log(animalsOlderThan('lions'));

function employeeByName(employeeName) {
  const objectWithName = employees
    .find((employee) => employee.firstName === employeeName || employee.lastName === employeeName);
  if (!objectWithName) {
    return {};
  }
  return objectWithName;
}

// function createEmployee(personalInfo, associatedWith) {
//   // seu código aqui
// }

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
  // createEmployee,
};
