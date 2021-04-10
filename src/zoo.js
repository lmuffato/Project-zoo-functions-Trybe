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

const { animals, employees, hours, prices } = require('./data');
// const data = require('./data');

function animalsByIds(...ids) {
  return animals.filter((animal) => ids.includes(animal.id));
}

function animalsOlderThan(animal, animalAge) {
  const resp = animals.find((anim) => anim.name === animal);
  return resp.residents.every((residentAge) => residentAge.age > animalAge);
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  return employees.find(({ firstName, lastName }) =>
    firstName === employeeName || lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.some((anyManager) => anyManager.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const employee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  employees.push(employee);
}

function animalCount(species) {
  if (species === undefined) {
    return animals.reduce((total, current) => {
      total[current.name] = current.residents.length;
      return total;
    }, {});
  }
  return animals.find(({ name }) => name === species).residents.length;
}

// function entryCalculator(entrants) {
//   const {Adult, Senior, Child} = prices;
//   if (!entrants || entrants.length === 0) return 0;
//   let price1 = prices.filter(({ Adult }) => Adult * 49.99);
//   let price2 = prices.filter(({ Senior }) => Senior * 24.99);
//   let price3 = prices.filter(({ Child }) => Child * 20.99);
//   return (price1 + price2 + price3);
//   // passar par de valor para arrays aparte, multiplicar o numero pelo preço e somar ao total
// }

// function animalMap(options) {
//   // seu código aqui
// }

// function schedule(dayName) {
//   // if (!dayName) return hours;
//   console.log(`${key}: 'Open from ${}am until ${}pm' ` {hours.key}
// }

// function oldestFromFirstSpecies(id) {
// identifica responsibleFor do funcionario 
// na tabela animals identifica o id correspondente
// e pesquisa nos residents o age máximo e o sexo
// }

// function increasePrices(percentage) {
// pega tabela prices e traz os valores de volta 
// price += price * percentage /100
// }

// function employeeCoverage(idOrName) {
// se vazio, traz employees;
// pesquisa id, firstName e lastName e traz responsibleFor
// }

module.exports = {
  // entryCalculator,
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
