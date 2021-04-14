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

const { animals, employees, hours, prices } = data;

function animalsByIds(...ids) {
  return animals.filter(({ id }) => ids.includes(id));
}
// console.log(animalsByIds('0938aa23-f153-4937-9f88-4858b24d6bce', 'e8481c1d-42ea-4610-8e11-1752cfc05a46'));

function animalsOlderThan(animal, ageMin) {
  return animals.find((bicho) => bicho.name === animal).residents
    .every(({ age }) => age >= ageMin);
}
// console.log(animalsOlderThan('otters', 7));

function employeeByName(employeeName) {
  if (employeeName === undefined) return {};
  return employees.find((name) =>
    name.firstName === employeeName || name.lastName === employeeName);
}
// console.log(employeeByName('Emery'));

function createEmployee(personalInfo1, associatedWith1) {
  return { ...personalInfo1, ...associatedWith1 };
}

// console.log(createEmployee(personalInfo, associatedWith));

function isManager(idEmployee) {
  return employees.some(({ managers }) => managers.includes(idEmployee));
}

// console.log(isManager('c5b83cb3-a451-49e2-ac45-ff3f54fbe7e1'));

function addEmployee(id, firstName, lastName, [...managers] = [], [...responsibleFor] = []) {
  employees.push({ id, firstName, lastName, managers, responsibleFor });
  return employees;
}

// console.log(addEmployee('4141da1c-a6ed-4cf7-90c4-99c657ba4ef3', 'Jane', 'Doe'));

function animalCount(species) {
  if (species === undefined) {
    return animals.reduce((acc, animal) =>
      Object.assign(acc, { [animal.name]: animal.residents.length }), {});
  }
  return animals.find((animal) => animal.name === species).residents.length;
}

// console.log(animalCount());

function entryCalculator(entrants = 0) {
  const valuesEntrants = Object.keys(entrants);
  return valuesEntrants.reduce((acc, actual) => acc + entrants[actual] * prices[actual], 0);
}

// console.log(entryCalculator({}));

/* function animalMap(options) {
  // seu código aqui
} */

const returnObject = (par) => ({ [par[0]]:
  par[0] === 'Monday' ? 'CLOSED' : `Open from ${par[1].open}am until ${par[1].close - 12}pm` });

function schedule(dayName) {
  const hoursDays = Object.entries(hours);
  if (dayName === undefined) {
    return hoursDays.reduce((acc, act) => Object.assign(acc, returnObject(act)), {});
  }
  return hoursDays.map((list) => returnObject(list)).find((element) => element[dayName]);
}

// console.log(schedule('Tuesday'));

/* function oldestFromFirstSpecies(id) {
  // seu código aqui
} */

/* function increasePrices(percentage) {
  // seu código aqui
} */

/* function employeeCoverage(idOrName) {
  // seu código aqui
} */

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  /* animalMap, */
  animalsByIds,
  employeeByName,
  /* employeeCoverage, */
  addEmployee,
  isManager,
  animalsOlderThan,
  /* oldestFromFirstSpecies,
  increasePrices, */
  createEmployee,
};
