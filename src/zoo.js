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

const { animals, employees, prices, hours } = data;

/* Requisito 1 */
function animalsByIds(...identificação) {
  return animals.filter(({ id }) => identificação.includes(id));
}
/* Requisito 2 */
function animalsOlderThan(animal, idadeMinima) {
  return animals.find((elemento) => elemento.name === animal).residents
    .every(({ age }) => age >= idadeMinima);
}
/* Requisito 3 */
function employeeByName(employeeName) {
  if (employeeName === undefined) return {};
  return employees.find((name) =>
    name.firstName === employeeName || name.lastName === employeeName);
}
/* Requisito 4 */
function createEmployee(pessoaInfo, associatedWithh) {
  return { ...pessoaInfo, ...associatedWithh };
}
/* Requisito 5 */
const isManager = ((pessoaADM) => employees.some(({ managers }) => managers.includes(pessoaADM)));

/* Requisito 6 */
function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const novofun = { id, firstName, lastName, managers, responsibleFor };
  return employees.push(novofun);
}
/* Requisito 7 - Obtive ajuda do Anderson Silva amigo da turma 10. */
function animalCount(species) {
  if (species === undefined) {
    return animals.reduce((acc, animal) =>
      Object.assign(acc, { [animal.name]: animal.residents.length }), {});
  }
  return animals.find((animal) => animal.name === species).residents.length;
}

console.log(animalCount());

/* Requisito 8 - Obtive ajuda do Anderson Silva amigo da turma 10. */
const entryCalculator = ((entrants = 0) => {
  const newArrOfCategories = Object.keys(entrants);
  return newArrOfCategories.reduce((acc, categories) =>
    acc + entrants[categories] * prices[categories], 0);
});

/* function animalMap(options) {
  // seu código aqui
} */

/* Requisito 10 - Obtive ajuda do Anderson Silva amigo da turma 10. */
const horary = (all) => ({ [all[0]]: all[0] === 'Monday' ? 'CLOSED'
  : `Open from ${all[1].open}am until ${all[1].close - 12}pm` });

function schedule(dayName) {
  const daysHour = Object.entries(hours);
  return dayName === undefined ? daysHour.reduce((acc, curr) =>
    Object.assign(acc, horary(curr)), {}) : daysHour.map((each) => horary(each))
    .find((onlyOne) => onlyOne[dayName]);
}

function oldestFromFirstSpecies(identificacao) {
  const identficaAnimal = employees.find((func) => func.id === identificacao).responsibleFor[0];
  const animal = animals.find(({ id }) => id === identficaAnimal).residents
    .reduce((idadeAcc, idadeCurr) => ((idadeAcc.age > idadeCurr.age) ? idadeAcc : idadeCurr));
  return Object.values(animal);
}
/* Requisito 12 utilizei o codigo do colega de turma Mathues Martins para melhor
  entendimento pois minha logica estava complicada de explicar pois dei muitas
  até obter o mesmo resultado. */
function increasePrices(percentage) {
  Object.keys(prices).forEach((idade) => {
    prices[idade] = (Math.round(prices[idade] * (1 + percentage / 100) * 100) / 100);
  });
}

const encontraBicho = (...entrada) => (
  entrada.map((id) => animals.find((bicho) => bicho.id === id))
    .map((grupo) => grupo.name));

const encontraEmployee = (pessoa) => {
  const nomeFull = `${pessoa.firstName} ${pessoa.lastName}`;
  return { [nomeFull]: encontraBicho(...pessoa.responsibleFor) };
};

function employeeCoverage(idOrName) {
  if (idOrName === undefined) {
    return employees.reduce((acc, curr) => Object.assign(acc, encontraEmployee(curr)), {});
  }
  const zelador = employees.find((pess) => pess.id === idOrName
  || pess.firstName === idOrName
  || pess.lastName === idOrName);
  return { ...encontraEmployee(zelador) };
}

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
