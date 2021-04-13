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

// function schedule(dayName) {
//   // seu código aqui
// }

function oldestFromFirstSpecies(id) {
  const buscaFuncionario = employees.find((employee) => employee.id === id).responsibleFor[0];
  const buscaAnimal = animals.find((animal) => animal.id === buscaFuncionario).residents;
  const resultado = buscaAnimal.sort((a, b) => b.age - a.age)[0];
  return [resultado.name, resultado.sex, resultado.age];
}

// function increasePrices(percentage) {
//   // seu código aqui
// }

// function employeeCoverage(idOrName) {
//   // seu código aqui
// }

// employeeCoverage();

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
  oldestFromFirstSpecies,
  // increasePrices,
  createEmployee,
};
