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
// const data = require('./data');

function animalsByIds(...ids) {
  // seu código aqui
  let selectedAnimals = [];
  ids.forEach((id) => {
    selectedAnimals = [...selectedAnimals, ...animals.filter((animal) => {
      if (animal.id === id) return true;
      return false;
    })];
  });
  return selectedAnimals;
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  // Busca os animais a partir do nome de uma especie recebida por parametro
  // find() / every ()
  const animalBySpecies = animals.find(({ name }) => name === animal);

  // verificar idades
  // verificar se todos os animais daquela especie tem uma idade minima que foi recebida por parametro
  // forEach() / every() => retorna um booleano
  return animalBySpecies.residents.every((resident) => resident.age >= age);
}

// function employeeByName(employeeName) {
//   // seu código aqui
// }

// function createEmployee(personalInfo, associatedWith) {
//   // seu código aqui
// }

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
  // employeeByName,
  // employeeCoverage,
  // addEmployee,
  // isManager,
  animalsOlderThan,
  // oldestFromFirstSpecies,
  // increasePrices,
  // createEmployee,
};
