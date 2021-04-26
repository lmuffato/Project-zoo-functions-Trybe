// const data = require('./data');
const { animals, employees } = require('./data'); // object destructuring

function animalsByIds(...ids) { // rest
  if (!ids) { // ! = negação
    return [];
  }
  return animals.filter(({ id }) => ids.some((a) => id === a));
}

function animalsOlderThan(animal, idade) {
  return animals
    .find(({ name }) => name === animal)
    .residents.every(({ age }) => age >= idade);
}

function employeeByName(employeeName) {
  if (!employeeName) {
    return {};
  }
  return employees.find((empregado) => (
    (empregado.firstName === employeeName || empregado.lastName === employeeName)));
}
// seu código aqui
function createEmployee({ id, firstName, lastName }, { managers, responsibleFor }) {
  // const ident = personalInfo.id;
  // const primeiroNome = personalInfo.firstName;
  // const ultimoNome = personalInfo.lastName;
  // const gerentes = associatedWith.managers;
  // const responsavel = associatedWith.responsibleFor;
  return {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
}

function isManager(id) {
  return employees.some(((funcionario) => funcionario.managers.includes(id)));
}

// Source: consulta ao repositório do Alex Silveira = https://github.com/tryber/sd-010-a-project-zoo-functions/pull/139/commits

function addEmployee(id, firstName, lastName, [...managers] = [], [...responsibleFor] = []) {
  return employees.push({ id, firstName, lastName, managers, responsibleFor });
}

// Source: consulta ao repositório do Alex Silveira = https://github.com/tryber/sd-010-a-project-zoo-functions/pull/139/commits

function animalCount(species) {
  if (species === undefined) { // sem parâmetros
    const allSpecies = {}; // retorna um objeto
    animals.forEach((animal) => { 
      allSpecies[animal.name] = animal.residents.length; // com animais e suas quantidades
    });
    return allSpecies;
  }
  const especie = animals.find((animal) => (species === animal.name)); // com o nome de uma espécie
  return especie.residents.length; // retorna apenas a quantidade
}

// Consulta ao repositório: https://github.com/tryber/sd-010-a-project-zoo-functions/pull/137/commits

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
