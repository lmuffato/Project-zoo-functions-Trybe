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

// Requisito 1

function animalsByIds(...ids) {
  const searchById = animals.filter((animal) => ids.some((id) => id === animal.id) === true);
  return searchById;
}

// Requisito 2

function animalsOlderThan(animal, age) {
  const animalParametro = animals.find(({ name }) => name === animal);
  const idadeMinima = animalParametro.residents.every((name) => name.age >= age);
  return idadeMinima;
}

// Requisito 3

function employeeByName(employeeName) {
  const funcionario = employees
    .find((pessoa) => pessoa.lastName === employeeName || pessoa.firstName === employeeName);
  if (funcionario === undefined) return {};
  return funcionario;
}

// Requisito 4

function createEmployee(personalInfo, associatedWith) {
  const newColaboration = {
    ...personalInfo,
    ...associatedWith,
  };
  return newColaboration;
}

// Requisito 5

function isManager(id) {
  return employees.some((colaboration) => colaboration.managers
    .some((item) => item === id) === true);
}

// Requisito 6

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

// Requisito 7

function animalCount(species) {
  const searchSpecie = animals.find((animal) => animal.name === species);
  if (searchSpecie !== undefined) {
    return searchSpecie.residents.length;
  }
  const quantAnimais = {};

  animals.forEach((item) => { quantAnimais[item.name] = item.residents.length; });
  return quantAnimais;
}

// Requisito 8

function entryCalculator(entrants) {
  if (entrants === undefined) return 0;
  const valueEntrants = Object.keys(entrants);
  return valueEntrants.reduce((acc, curr) => acc + (entrants[curr] * prices[curr]), 0);
}

// Requisito 9

// function animalMap(options) {
//   const localizacao = animals.map((animal) => animal.location);

//   return localizacao;
// }

console.log(animalMap());

// Requisito 10

const operatingHours = (open, close) =>
  (open === 0 && close === 0
    ? 'CLOSED' : `Open from ${open}am until ${close - 12}pm`);

function schedule(dayName) {
  const diasSemanas = Object.keys(hours);

  // const horario = diasSemanas
  //   .reduce((acc, curr) => { acc[curr] = operatingHours(hours[curr].open, hours[curr].close); }, {});
  const horario = {};
  diasSemanas
    .forEach((dia) => { horario[dia] = operatingHours(hours[dia].open, hours[dia].close); });

  if (dayName === undefined) return horario;
  return { [dayName]: horario[dayName] };
}

// Requisito 11

function oldestFromFirstSpecies(id) {
  const funcionario = employees.find((item) => item.id === id).responsibleFor[0];
  const animalBuscado = animals.find((item) => item.id === funcionario);
  const { residents } = animalBuscado;
  const oldAnimal = residents.sort((a, b) => b.age - a.age)[0];
  const { name, sex, age } = oldAnimal;

  return [name, sex, age];
}

// Requisito 12

function increasePrices(percentage) {
  const keysPrice = Object.keys(prices);
  keysPrice.forEach((key) => {
    const numero = parseFloat(((prices[key] * percentage) / 100 + prices[key] + 0.001).toFixed(3));
    const priceAtt = parseFloat(numero.toFixed(2));
    prices[key] = priceAtt;
  });
  return prices;
}

// Requisito 13

const searchAnimal = (idAnimal) => animals.find((animal) => animal.id === idAnimal);

const searchIdLastFirstName = (param, obj) => {
  const { firstName, lastName } = employees
    .find((func) => func.id === param
      || func.firstName === param
      || func.lastName === param);
  const fullName = `${firstName} ${lastName}`;
  return { [fullName]: obj[fullName] };
};

function employeeCoverage(idOrName) {
  const objFunc = {};
  employees.forEach(({ firstName, lastName, responsibleFor }) => {
    const namesAnimal = responsibleFor.map((idAnimal) => {
      const { name } = searchAnimal(idAnimal);
      return name;
    });
    objFunc[`${firstName} ${lastName}`] = namesAnimal;
  });
  if (!idOrName) return objFunc;
  return searchIdLastFirstName(idOrName, objFunc);
}

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  // animalMap,
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
