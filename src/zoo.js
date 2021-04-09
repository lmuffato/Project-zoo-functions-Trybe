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

function animalsByIds(...ids) {
  return animals.filter((animal) => ids.includes(animal.id));
} // realizado em conjunto (Deh, Nathi, Djaniza, Thalita e Heloisa)

function animalsOlderThan(animal, age) {
  return animals.find((elem) => elem.name === animal).residents.every((res) => res.age >= age);
} // auxilio e explicação do colega Wanderson

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return employees
    .find((employee) => employee.firstName === employeeName || employee.lastName === employeeName);
} // realizado em conjunto (Deh, Nathi, Djaniza, Thalita e Heloisa)

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return ({ id, firstName, lastName, managers, responsibleFor });
}

function isManager(id) {
  return employees.some((employee) => employee.managers.some((employee2) => employee2 === id));
} // auxilio e explicação do colega Wanderson erealizado em conjunto (Deh, Nathi, Djaniza, Thalita e Heloisa)

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const addNewEmp = { id, firstName, lastName, managers, responsibleFor };
  return employees.push(addNewEmp);
}

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
//   if (!idOrName) {
//   return
// }
// }

module.exports = {
//   schedule,
//   animalMap,
//  employeeCoverage,
  entryCalculator,
  animalCount,
  addEmployee,
  isManager,
  animalsOlderThan,
  animalsByIds,
  employeeByName,
  createEmployee,
//   oldestFromFirstSpecies,
//   increasePrices,
};
