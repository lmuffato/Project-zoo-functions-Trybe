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

const { animals, employees } = require('./data');

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
  let residentsList;
  selectedAnimal.forEach(({ residents }) => {
    residentsList = residents;
  });
  return residentsList.every(({ age: newAge }) => newAge > age);
};

// animalsOlderThan('lions', 1);

const retorno = (employeeName) => employees
  .find(({ firstName, lastName }) => employeeName === firstName || employeeName === lastName);

const employeeByName = (employeeName) => (employeeName ? retorno(employeeName) : {});

// console.log(employeeByName('Nelson'));

const createEmployee = (personalInfo, associatedWith) => ({ ...personalInfo, ...associatedWith });
// console.log(createEmployee({oi: "tudo bem"}, {i:['oioi'], o:['aiai']}));

const isManager = (id) => employees.some(({ managers }) => managers
  .find((element) => element === id));

// isManager('0e7b460e-acf4-4e17-bcb3-ee472265db83');

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees[employees.length] = { id, firstName, lastName, managers, responsibleFor };
}

// addEmployee(1, 2, 3);
// console.log(employees);

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
  isManager,
  animalsOlderThan,
  // oldestFromFirstSpecies,
  // increasePrices,
  createEmployee,
};
