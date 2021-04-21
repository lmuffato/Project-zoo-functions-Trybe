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

const arr = (array) => {
  const result = [];
  array.forEach((element) => {
    result.push(animals.filter(({ id }) => id === element)[0]);
  });
  return result;
};

const animalsByIds = (...ids) => (ids ? arr(ids) : []);

// const animalsOlderThan = (animal, age) => {
//   let count = 0;
//   animals
//     .filter(({ name, residents }) => {
//       residents
//         .forEach(({ age: newAge }) => console.log(`${count += 1}: ${newAge > age}`));
//     });
// };

const animalsOlderThan = (animal, age) => {
  const selectedAnimal = animals.filter(({ name }) => name === animal);
  selectedAnimal.filter(({ residents }) => console.log(residents
    .every(({ age: newAge }) => newAge > age)));
};

animalsOlderThan('lions', 10);

// function employeeByName(employeeName) {
//   // seu código aqui
// }

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
  // employeeByName,
  // employeeCoverage,
  // addEmployee,
  // isManager,
  // animalsOlderThan,
  // oldestFromFirstSpecies,
  // increasePrices,
  // createEmployee,
};
