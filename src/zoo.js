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

/* ------------------ Requisito 1 ------------------- */
// Ajuda de Renzo Sevilha - Turma 10 - Tribo A
function animalsByIds(...ids) {
  return animals.filter(({ id }) => ids.includes(id));
}
// console.log(animalsByIds('0938aa23-f153-4937-9f88-4858b24d6bce', 'e8481c1d-42ea-4610-8e11-1752cfc05a46'));

/* ------------------- Requisito 2 ------------------ */
function animalsOlderThan(animal, ageMin) {
  return animals.find((bicho) => bicho.name === animal).residents
    .every(({ age }) => age >= ageMin);
}
// console.log(animalsOlderThan('otters', 7));

/* ------------------- Requisito 3 ------------------- */
// Ajuda de Renzo Sevilha - Turma 10 - Tribo A na estruturação da condicional
function employeeByName(employeeName) {
  if (employeeName === undefined) return {};
  return employees.find((name) =>
    name.firstName === employeeName || name.lastName === employeeName);
}
// console.log(employeeByName('Emery'));

/* ------------------------- Requisito 4 ------------------------- */
function createEmployee(personalInfo1, associatedWith1) {
  return { ...personalInfo1, ...associatedWith1 };
}

// console.log(createEmployee(personalInfo, associatedWith));

/* ------------------------ Requisito 5 ------------------------- */
function isManager(idEmployee) {
  return employees.some(({ managers }) => managers.includes(idEmployee));
}

// console.log(isManager('c5b83cb3-a451-49e2-ac45-ff3f54fbe7e1'));

/* ------------------------- Requisito 6 ----------------------- */
function addEmployee(id, firstName, lastName, [...managers] = [], [...responsibleFor] = []) {
  employees.push({ id, firstName, lastName, managers, responsibleFor });
  return employees;
}

// console.log(addEmployee('4141da1c-a6ed-4cf7-90c4-99c657ba4ef3', 'Jane', 'Doe'));

/* -------------------------- Requisito 7 ---------------------- */
// Ajuda de Sérgio Martins - Turma 10 - Tribo A na lógica sobre o uso do Object.assign
function animalCount(species) {
  if (species === undefined) {
    return animals.reduce((acc, animal) =>
      Object.assign(acc, { [animal.name]: animal.residents.length }), {});
  }
  return animals.find((animal) => animal.name === species).residents.length;
}

// console.log(animalCount());

/* -------------------------------- Requisito 8 ------------------------- */
// Ajuda de Renzo Sevilha - Turma 10 - Tribo A na implementação do requisito
function entryCalculator(entrants = 0) {
  const valuesEntrants = Object.keys(entrants);
  return valuesEntrants.reduce((acc, actual) => acc + entrants[actual] * prices[actual], 0);
}

// console.log(entryCalculator({}));

/* ----------------------- Requisito 9 -------------------------- */
/* function animalMap(options) {
  // seu código aqui
} */

/* ----------------------- Requisito 10 -------------------------- */
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

/* ---------------------------- Requsito 11 ------------------------ */
function oldestFromFirstSpecies(id1) {
  const idAnimal = employees.find((employee) => employee.id === id1).responsibleFor[0];
  const oldAnimal = animals.find(({ id }) => id === idAnimal).residents
    .reduce((acc, actual) => ((acc.age > actual.age) ? acc : actual));
  return Object.values(oldAnimal);
}

// console.log(oldestFromFirstSpecies('4b40a139-d4dc-4f09-822d-ec25e819a5ad'));

/* ------------------------ Requisito 12 ---------------------- */
const calcIncrease = (element, percent) => (parseFloat((element
    + element * percent))
);

function increasePrices(percentage) {
  const percents = percentage / 100;
  prices.Adult = Math.round(calcIncrease(prices.Adult, percents) * 100) / 100;
  prices.Senior = Math.round(calcIncrease(prices.Senior, percents) * 100) / 100;
  prices.Child = Math.round(calcIncrease(prices.Child, percents) * 100) / 100;
}
/* console.log(increasePrices(50));
console.log(increasePrices(30)); */

/* ----------------------------- Requisito 13 ------------------------ */
// Ajuda de André Jacques - Turma 10 - Tribo A na lógica de consulta aos animais
const consultAnimalsById = (...arr) => (
  arr.map((id) => animals.find((animal) => animal.id === id)).map((specie) => specie.name)
);

const returnEmployee = (par) => {
  const fullName = `${par.firstName} ${par.lastName}`;
  return { [fullName]: consultAnimalsById(...par.responsibleFor) };
};

function employeeCoverage(idOrName) {
  if (idOrName === undefined) {
    return employees.reduce((acc, act) => Object.assign(acc, returnEmployee(act)), {});
  }
  const findEmployee = employees.find((element) => element.id === idOrName
    || element.firstName === idOrName || element.lastName === idOrName);
  return { ...returnEmployee(findEmployee) };
}

// console.log(employeeCoverage());

// console.log(consultAnimalsById('01422318-ca2d-46b8-b66c-3e9e188244ed', '533bebf3-6bbe-41d8-9cdf-46f7d13b62ae'));

// console.log(employeeCoverage('4b40a139-d4dc-4f09-822d-ec25e819a5ad'));

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  /* animalMap, */
  animalsByIds,
  employeeByName,
  employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  oldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
