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
  // seu código aqui
  // procurando is e retornando o id ou vazio
  return (ids !== []) ? ids.map((id) => data.animals.find((animal) => animal.id === id)) : ids;
}

function animalsOlderThan(animal, ageParameter) {
  // seu código aqui
  //procurando a espécie
  const animalspecies = data.animals.find(({name}) => name === animal)
  //comparando
  return animalspecies.residents.every(({age}) => age > ageParameter);
}

function employeeByName(employeeName) {
  // seu código aqui
  //procurando empregado
  const employee = data.employees.find(({firstName, lastName}) => firstName === employeeName || lastName === employeeName);
  // retornando objeto do empregado ou vazio
  return employee !== undefined ? employee : {};
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  // dando spread no conteúdo
  return { ...personalInfo, ...associatedWith}
}

function isManager(id) {
  // seu código aqui
  // procurando as tags manager nos employees
  return data.employees.some(({ managers }) => managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
  
}

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
  entryCalculator,
  schedule,
  animalCount,
  animalMap,
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
