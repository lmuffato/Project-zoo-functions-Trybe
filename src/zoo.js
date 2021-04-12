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

const { animals, employees, prices } = require('./data');
// const data = require('./data');

// REQUISITO 1
function animalsByIds(...ids) {
  return animals.filter((animal) => ids.includes(animal.id));
} // realizado em conjunto (Deh, Nathi, Djaniza, Thalita e Heloisa)

// REQUISITO 2
function animalsOlderThan(animal, age) {
  return animals.find((elem) => elem.name === animal).residents.every((res) => res.age >= age);
} // auxilio e explicação do colega Wanderson

// REQUISITO 3
function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return employees
    .find((employee) => employee.firstName === employeeName || employee.lastName === employeeName);
} // realizado em conjunto (Deh, Nathi, Djaniza, Thalita e Heloisa)

// REQUISITO 4
function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return ({ id, firstName, lastName, managers, responsibleFor });
}

// REQUISITO 5
function isManager(id) {
  return employees.some((employee) => employee.managers.some((employee2) => employee2 === id));
} // auxilio e explicação do colega Wanderson erealizado em conjunto (Deh, Nathi, Djaniza, Thalita e Heloisa)

// REQUISITO 6
function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const addNewEmp = { id, firstName, lastName, managers, responsibleFor };
  return employees.push(addNewEmp);
}

// REQUISITO 7
function animalCount(species) {
  const objtoAnimal = animals.reduce((acc, item) => {
    acc[item.name] = item.residents.length;
    return acc;
  }, {});

  if (!species) {
    return objtoAnimal;
  }

  const objEspecies = animals.find((item) => item.name === species);
  const ArrayEspecies = objEspecies.residents.length;
  return ArrayEspecies;
} // Estudado e realizado em grupo com as meninas do Mulheres Tribo A.

// REQUISITO 8
function entryCalculator(entrants) {
  if (entrants === undefined || entrants === {}) {
    return 0;
  }
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  const adultsPrice = Adult * prices.Adult;
  const childsPrice = Child * prices.Child;
  const seniorsPrice = Senior * prices.Senior;
  return parseFloat((seniorsPrice + adultsPrice + childsPrice).toFixed(2));
} // Estudado e realizado em grupo com as meninas do Mulheres Tribo A.

// REQUISITO 9
// function animalMap(options) {
//   // seu código aqui
// }

// REQUISITO 10
// const hourszoo = (open, close) => (
//   open === 0 && close === 0 ? 'CLOSE' : `Open from ${open}am until ${close - 12}pm`);

// function schedule(dayName) {

// }

// REQUISITO 11
function oldestFromFirstSpecies(id) {
  const findEmployee = employees.find((employee) => employee.id === id).responsibleFor[0];
  const findAnimal = animals.find((animal) => animal.id === findEmployee);
  const oldAge = findAnimal.residents.reduce((acc, item) => (acc > item.age) ? acc : item.age);
  const { name, sex, age } = findAnimal.residents.find((resident) => resident.age === oldAge);

  return [name, sex, age];
}

// REQUISITO 12
function increasePrices(percentage) {
  const increase = (1 + (percentage / 100));
  const price = Object.keys(prices);
  price.forEach((key) => {
    prices[key] = (Math.round(prices[key] * increase * 100) / 100);
  });
} // Estudado e realizado em grupo com as meninas do Mulheres Tribo A.

// REQUISITO 13
// function employeeCoverage(idOrName) {
//   if (!idOrName) {
//   return
// }
// }

module.exports = {
//   animalMap,
//  employeeCoverage,
// schedule,
  entryCalculator,
  animalCount,
  addEmployee,
  isManager,
  animalsOlderThan,
  animalsByIds,
  employeeByName,
  createEmployee,
  increasePrices,
  oldestFromFirstSpecies,
};
