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
// const { hours } = require('./data');

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
  if (objetoFuncionario.managers.length === 1 || objetoFuncionario.managers.length === 0) {
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

// function schedule(dayName) {
//   const dias = Object.entries(hours).map((item) => `${item[0]}: Open from ${item[1].open}am until ${item[1].close}pm`);

//   if (dayName === undefined) {
//     return dias;
//   }

//   const dia = Object.entries(hours).find((item) => item[0] === dayName);
//   return `${dia[0]}: Open from ${dia[1].open}am until ${dia[1].close}pm`;
// }

// function oldestFromFirstSpecies(id) {
//   const objFuncionario = employees.find((item) => item.id === id);
//   const arrayAnimais = objFuncionario.responsibleFor;

//   const objAnimais = animals.filter((item) => item.id === id);

//   const maiorIdade = animals.every((residente) => residente.age < );
//   return idadeMinima;
// }

function increasePrices(percentage) {
  const { Adult, Child, Senior } = prices;
  const porcetagem = (1 + (percentage / 100));
  prices.Adult = Math.round((Adult * porcetagem) * 100) / 100;
  prices.Child = Math.round((Child * porcetagem) * 100) / 100;
  prices.Senior = Math.round((Senior * porcetagem) * 100) / 100;
}
// como arredondar 2 casas decimais https://metring.com.br/arredondar-numero-em-javascript
// fiz o caulculo de porcentagem a partir desse site https://www.estrategiaconcursos.com.br/blog/como-calcular-porcentagem/#:~:text=Exemplo%3A%20Uma%20mercadoria%20custava%20R,o%20valor%20final%20da%20mercadoria.&text=A%20taxa%20de%20aumento%20%C3%A9,%2C30%20%3D%201%2C30.

// function employeeCoverage(idOrName) {
//   // caso não tenha parametro
//   const objAnimaisFuncionario = employees.reduce((acc, item) => {
//     acc[`${item.firstName} ${item.lastName}`] = item.responsibleFor; // adiciono uma chave e um valor ao objeto
//     return acc;
//   }, {});

//   if (idOrName === undefined) {
//     return objAnimaisFuncionario;
//   }

//   // caso não tenha parametro
//   const funcionario = employees
//     .find((item) => item.firstName === idOrName || item.lastName === idOrName || item.id === idOrName);

//   return { [`${funcionario.firstName} ${funcionario.lastName}`]: funcionario.responsibleFor };
// }

module.exports = {
  entryCalculator,
  // schedule,
  animalCount,
  // animalMap,
  animalsByIds,
  employeeByName,
  // employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  // oldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
