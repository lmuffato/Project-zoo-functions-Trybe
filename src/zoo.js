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
  const { animals } = data;
  return animals.filter(({ id }) => ids.includes(id));
}

// console.log(animalsByIds('0938aa23-f153-4937-9f88-4858b24d6bce',
//   'e8481c1d-42ea-4610-8e11-1752cfc05a46'));
// console.log(animalsByIds('0938aa23-f153-4937-9f88-4858b24d6bce'));
// console.log(animalsByIds());
// console.log(data.animals[0].id);
// console.log(data.animals);

function animalsOlderThan(animal, age) {
  const { animals } = data;
  return animals.find(({ name }) => name === animal).residents.every(({ age: agersAnimals }) =>
    agersAnimals >= age);
}
// console.log(data.animals[0].name);
// console.log(data.animals[0].residents[0].age);
// console.log(animalsOlderThan('penguins', 10));
// console.log(animalsOlderThan('otters', 7));

function employeeByName(employeeName) {
  const { employees } = data;
  return (!employeeName) ? {} : employees.find(({ firstName, lastName }) =>
    firstName === employeeName || lastName === employeeName);
}
// console.log(data.employees[0].firstName);
// console.log(data.employees[0].lastName);
// console.log(employeeByName('Emery'));
// console.log(employeeByName('Wishart'));
// console.log(employeeByName());

function createEmployee(personalInfo, associatedWith) {
  return Object.assign(personalInfo, associatedWith);
}

// console.log(createEmployee(personalInfo, associatedWith));
// console.log(data.employees[0]);

function isManager(id) {
  const { employees } = data;
  return employees.some(({ managers }) => managers.includes(id));
}
// console.log(isManager('c5b83cb3-a451-49e2-ac45-ff3f54fbe7e1'));
// console.log(isManager('0e7b460e-acf4-4e17-bcb3-ee472265db83'));

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const { employees } = data;
  const employee = createEmployee({ id, firstName, lastName }, { managers, responsibleFor });
  employees.push(employee);
}
// addEmployee('123', 'Anderson', 'Nascimento');
// console.log(data.employees);

function animalCount(species) {
  const { animals } = data;
  if (!species) {
    return animals.reduce((acc, { name, residents }) => {
      acc[name] = residents.length;
      return acc;
    }, {});
  }
  return animals.find(({ name }) => name === species).residents.length;
}
// console.log(animalCount('lions'));
// console.log(animalCount('snakes'));
// console.log(animalCount());

function entryCalculator(entrants) {
  if (!entrants || Object.keys(entrants).length === 0) return 0;
  const { prices } = data;
  return Object.entries(entrants).map(([key, value]) => prices[key] * value)
    .reduce((acc, totalPrice) => acc + totalPrice);
}
// console.log(entryCalculator(1));
// console.log(entryCalculator({ Child: 1, Senior: 1 }));
// console.log(entryCalculator());
// console.log(entryCalculator({}));

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
  entryCalculator,
  // schedule,
  animalCount,
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
