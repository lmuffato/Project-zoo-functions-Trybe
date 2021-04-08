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
  return data.animals.filter(({ id }) => ids.includes(id));
}

function animalsOlderThan(animalSelect, ageSelect) {
  return data.animals
    .find(({ name }) => name === animalSelect)
    .residents
    .every(({ age }) => age >= ageSelect);
}

function employeeByName(nome) {
  if (!nome) return {};
  const i = data.employees;
  return i.find(({ firstName, lastName }) => firstName === nome || lastName === nome);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return data.employees
    .some((item) => item.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // [managers, responsibleFor].forEach(element => {
  //   if (element === '' || element === undefined) {
  //     element = [];
  //   }
  // });
  // data.employees.push({
  //   id,
  //   firstName,
  //   lastName,
  //   managers,
  //   responsibleFor,
  // });
}

console.log(addEmployee('123', 'Ednaldo', 'Pereira', [], []));

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
  // entryCalculator,
  // schedule,
  // animalCount,
  // animalMap,
  animalsByIds,
  employeeByName,
  // employeeCoverage,
  // addEmployee,
  isManager,
  animalsOlderThan,
  // oldestFromFirstSpecies,
  // increasePrices,
  createEmployee,
};
