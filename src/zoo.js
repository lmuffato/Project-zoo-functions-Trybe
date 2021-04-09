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

const { animals } = require('./data');
const { employees } = require('./data');
const { prices } = require('./data');
const { hours } = require('./data');

// const data = require('./data');

function animalsByIds(...ids) {
  if (ids === undefined) {
    return [];
  }

  const animaisEspecies = [];
  animals.forEach((animal) => {
    ids.forEach((id) => {
      if (id === animal.id) {
        animaisEspecies.push(animal);
      }
    });
  });

  return animaisEspecies;
}

function animalsOlderThan(animal, age) {
  const objetoAnimal = animals.find((item) => item.name === animal);
  const residentes = objetoAnimal.residents;
  const idadeMinima = residentes.every((residente) => residente.age > age);
  return idadeMinima;
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  const objetoFuncionario = employees
    .find((item) => item.firstName === employeeName || item.lastName === employeeName);
  return objetoFuncionario;
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
}

function isManager(id) {
  const objetoFuncionario = employees.find((item) => item.id === id);
  if (objetoFuncionario.managers === []) {
    return true;
  }

  return false;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
// coloco managers = [], pois esses dois parametros precisam ser arrays
  employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {
  // caso não tenha parametro
  const obejtoAnimal = animals.reduce((acc, item) => {
    acc[item.name] = item.residents.length; // adiciono uma chave e um valor ao objeto
    return acc;
  }, {});

  if (!species) {
    return obejtoAnimal;
  }
  // caso  tenha parametro
  const objetoEspecies = animals.find((item) => item.name === species);
  const ArrayEspecies = objetoEspecies.residents.length;
  return ArrayEspecies;
}

function entryCalculator(entrants) {
  if (entrants === undefined || Object.entries(entrants).length === 0) {
    return 0;
  }

  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  // coloco o object destructuring, para se cado o entrants não tiver umas dessas chaves/valores eu msm atribuo.

  const adulto = prices.Adult * Adult;
  const idoso = prices.Senior * Senior;
  const crianças = prices.Child * Child;
  return adulto + idoso + crianças;
}

// function animalMap(options) {
//   // seu código aqui
// }

function schedule(dayName) {
  if (dayName === undefined) {
  // const todosDias = Object.entries(hours).map((item) => `${item[0]}: Open from ${item[1]}am until ${item[2]}pm`);
  }

  const dia = hours.find((item) => item === dayName);
  return dia;
}

// function oldestFromFirstSpecies(id) {
//   // seu código aqui
// }

// function increasePrices(percentage) {
//   // seu código aqui
// }

function employeeCoverage(idOrName) {
  const objAnimaisFuncionario = employees.reduce((acc, item) => {
    acc[item.firstName] = item.rresponsibleFor; // adiciono uma chave e um valor ao objeto
    return acc;
  }, {});

  if (idOrName === undefined) {
    return objAnimaisFuncionario;
  }

  // const funcionario = employees
  //   .find((item) => item.firstName === idOrName || item.lastName === idOrName || item.id === idOrName);

  // return { funcionario["firstName"]: funcionario["responsibleFor"]};

  return {};
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
  // oldestFromFirstSpecies,
  // increasePrices,
  createEmployee,
};
