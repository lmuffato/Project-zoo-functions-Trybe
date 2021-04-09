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

const { hours } = require('./data');
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
  /* 'Retorna 0 se nenhum argumento for passado' */
  /* 'Retorna 0 se um objeto vazio for passado' */
  if (typeof entrants === 'undefined' || entrants === {}) return 0;
  const { Adult = 0, Senior = 0, Child = 0 } = entrants;
  const { Adult: guy, Senior: idoso, Child: crianca } = data.prices;
  /* Retorna o preço total a ser cobrado dado o número de adultos, crianças e idosos */
  return (guy * Adult) + (idoso * Senior) + (crianca * Child);
}

/* function animalMap(options) {
  // seu código aqui
} */

const getScheduleDay = (day) => {
  const openTime = hours[day].open;
  const closingTime = hours[day].close;
  if (openTime === 0 && closingTime === 0) return 'CLOSED';
  return `Open from ${openTime}am until ${closingTime - 12}pm`;
};

function schedule(dayName) {
  // seu código aqui
  const result = {};
  const days = Object.keys(hours);
  if (dayName === undefined) {
    days.forEach((day) => {
      result[day] = getScheduleDay(day);
    });
  } else {
    result[dayName] = getScheduleDay(dayName);
  }
  return result;
}

/* function oldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
  // seu código aqui
}

function employeeCoverage(idOrName) {
  // seu código aqui
} */

module.exports = {
  entryCalculator,
  schedule,
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
