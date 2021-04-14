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

const { animals, employees } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  return animals.filter((animal) => ids.includes(animal.id));
}

function animalsOlderThan(animal, idade) {
  return animals.find((aa) => aa.name === animal).residents
    .every(({ age }) => age > idade);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }

  return data.employees
    .find((aa) => aa.firstName === employeeName || aa.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return data.employees.find((people) => people.id === id).managers.length <= 1;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return data.employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {
  if (species === undefined) {
    const obj = animals.reduce((acc, animal) => {
      const result = { ...acc };
      result[animal.name] = animal.residents.length;
      return result;
    }, {});
    return obj;
  }
  return animals.find((animal) => animal.name === species).residents.length;
}

// feito com auxilio de: Iago Ferreira, Lucas Pedroso, Murilo Gonsalves e Rafael Medeiros
function entryCalculator(entrants) {
  if (entrants === undefined) return 0;
  const { Adult, Senior, Child } = data.prices;
  const { Adult: qnt1 = 0 } = entrants;
  const { Senior: qnt2 = 0 } = entrants;
  const { Child: qnt3 = 0 } = entrants;
  return Adult * qnt1 + Senior * qnt2 + Child * qnt3;
}

// function animalMap(options) {
//   // seu código aqui
// }

// feito com auxilio do max rudim, ajudou muito na lógica
function schedule(dayName) {
  const semana = {};
  Object.keys(data.hours).forEach((dia) => {
    const close = data.hours[dia].close - 12;
    const { open } = data.hours[dia];
    if (dia === 'Monday') {
      semana[dia] = 'CLOSED';
    } else {
      semana[dia] = `Open from ${open}am until ${close}pm`;
    }
  });
  if (dayName === undefined) return semana;
  return { [dayName]: semana[dayName] };
}
console.log(schedule('Monday'));

// // feito com auxilio de: Iago Ferreira, Lucas Pedroso, Murilo Gonsalves e Rafael Medeiros
function oldestFromFirstSpecies(id) {
  const buscaFuncionario = employees.find((employee) => employee.id === id).responsibleFor[0];
  const buscaAnimal = animals.find((animal) => animal.id === buscaFuncionario).residents;
  const resultado = buscaAnimal.sort((a, b) => b.age - a.age)[0];
  return [resultado.name, resultado.sex, resultado.age];
}

// pesquisadas em https://medium.com/swlh/how-to-round-to-a-certain-number-of-decimal-places-in-javascript-ed74c471c1b8
function increasePrices(percentage) {
  const porcentagem = (percentage / 100);
  const { prices } = data;
  const { Adult, Senior, Child } = prices;
  prices.Adult = Math.round((Adult + (Adult * porcentagem)) * 100) / 100;
  prices.Senior = Math.round((Senior + (Senior * porcentagem)) * 100) / 100;
  prices.Child = Math.round((Child + (Child * porcentagem)) * 100) / 100;
  return prices;
}

// function employeeCoverage(idOrName) {
//   // seu código aqui
// }

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
  oldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
