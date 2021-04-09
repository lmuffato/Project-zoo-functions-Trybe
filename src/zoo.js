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

function animalsByIds(...listOfIdsToSearch) {
  // This guard clause is not necessary, but imo it makes the code prettier
  if (listOfIdsToSearch.length === 0) return [];
  const { animals } = data;
  const animalsList = [];
  listOfIdsToSearch.forEach((idToSearchFor) => {
    animalsList.push(animals.find(({ id }) => id === idToSearchFor));
  });
  return animalsList;
}

function animalsOlderThan(animalName, ageToCheck) {
  const { animals } = data;
  const animalMatch = animals.find(({ name }) => name === animalName);
  return animalMatch.residents.every(({ age }) => age >= ageToCheck);
}

function employeeByName(employeeName) {
  if (typeof employeeName === 'undefined') return ({});
  const { employees } = data;
  return employees.find(({ firstName, lastName }) => firstName === employeeName
    || lastName === employeeName);
}

const createEmployee = (personalInfo, associatedWith) => ({ ...personalInfo, ...associatedWith });

function isManager(idToSearch) {
  const { employees } = data;
  return employees.some(({ managers }) => managers.includes(idToSearch));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const { employees } = data;
  const newEmployee = { id, firstName, lastName, managers, responsibleFor };
  employees.push(newEmployee);
}

function animalCount(speciesNameToSearch) {
  const { animals } = data;
  if (typeof speciesNameToSearch === 'string') {
    return animals.find(({ name }) => name === speciesNameToSearch).residents.length;
  }
  // https://medium.com/@vmarchesin/using-array-prototype-reduce-in-objects-using-javascript-dfcdae538fc8
  return animals.reduce((acc, { name, residents }) => ({ ...acc, [name]: residents.length }), {});
}

function entryCalculator(entrants) {
  if (typeof entrants === 'undefined') return 0;
  if (Object.keys(entrants).length === 0) return 0;
  const { prices } = data;
  const entrantsEntries = Object.entries(entrants);
  return entrantsEntries.reduce((acc, cur) => acc + prices[cur[0]] * cur[1], 0);
}
/* NE: [
  { lions: [] },
  { giraffes: [] }
], */
// NE: ['lions', 'giraffes'],
function animalMap(options) {
  // 'Sem parâmetros, retorna animais categorizados por localização'
  // 'Com a opção `includeNames: true` especificada, retorna nomes de animais'
  // 'Com a opção `sorted: true` especificada, retorna nomes de animais ordenados'
  // 'Com a opção `sex: \'female\'` ou `sex: \'male\'` especificada, retorna somente nomes de animais macho/fêmea'
  // 'Com a opção `sex: \'female\'` ou `sex: \'male\'` especificada e a opção `sort: true` especificada, retorna somente nomes de animais macho/fêmea com os nomes dos animais ordenados'
  // 'Só retorna informações ordenadas e com sexo se a opção `includeNames: true` for especificada'
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
