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

function animalsOlderThan(animal, age) {
  // seu código aqui
  const especie = data.animals.find((bixo) => bixo.name === animal);
  return especie.residents.every((idade) => idade.age >= age);
}

function employeeByName(employeeName) {
  // seu código aqui
  /* 'Sem parâmetros, retorna um objeto vazio', */
  if (!employeeName) return {};
  /* 'Quando provido o primeiro nome do funcionário, retorna o objeto do funcionário', */
  /* 'Quando provido o último nome do funcionário, retorna o objeto do funcionário' */
  return data.employees.find(({ firstName, lastName }) =>
    firstName === employeeName || lastName === employeeName);
}

const createEmployee = (personalInfo,
  associatedWith) => ({ ...personalInfo, ...associatedWith });/* ;{
  // seu código aqui
  return (personalInfo, associatedWith) => ({ ...personalInfo, ...associatedWith });
  /* Cria um novo colaborador a partir de objetos contendo
  informações pessoais, gerentes e animais gerenciados */
/* const { id, firstName, lastName } = personalInfo;
const { managers, responsibleFor } = associatedWith;
const employee = {
  id,
  firstName,
  lastName,
  managers,
  responsibleFor,
};
return employee; 
} */

function isManager(id) {
  // seu código aqui
  /* 'Testa se o id passado é de um gerente' */
  return data.employees.some(({ managers }) => managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  const employee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  data.employees.push(employee);
}

function animalCount(species) {
  // seu código aqui
  if (species === undefined) {
    return data.animals.reduce((acc, curr) => {
      acc[curr.name] = curr.residents.length;
      return acc;
    }, {});
  }
  return data.animals.find(({ name }) => name === species).residents.length;
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
