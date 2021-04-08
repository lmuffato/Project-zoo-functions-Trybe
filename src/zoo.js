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

// function isManager(id) {
//   // seu código aqui
// }

// function addEmployee(id, firstName, lastName, managers, responsibleFor) {
//   // seu código aqui
// }

// function animalCount(species) {
//   // seu código aqui
// }

// function entryCalculator(entrants) {
//   // seu código aqui
// }

// function animalMap(options) {
//   // seu código aqui
// }

// function schedule(dayName) {
//   // seu código aqui
// }

// function oldestFromFirstSpecies(id) {
//   // seu código aqui
// }

// function increasePrices(percentage) {
//   // seu código aqui
// }

// function employeeCoverage(idOrName) {
//   // seu código aqui
// }

module.exports = {
  // entryCalculator,
  // schedule,
  // animalCount,
  // animalMap,
  animalsByIds,
  employeeByName,
  // employeeCoverage,
  // addEmployee,
  // isManager,
  animalsOlderThan,
  // oldestFromFirstSpecies,
  // increasePrices,
  createEmployee,
};
