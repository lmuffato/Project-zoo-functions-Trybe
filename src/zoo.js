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
const { animals, employees, prices } = require('./data');
// const data = require('./data');

function animalsByIds(...ids) {
  // seu código aqui
  if (ids.length === 0) return [];
  return animals
    .filter((animal, index) => animal.id === ids[index]);
}

function animalsOlderThan(animal, age) {
// seu código aqui
  return animals
    .find((specie) => specie.name === animal).residents
    .every((specie) => specie.age >= age);
}

function employeeByName(employeeName) {
// seu código aqui
  if (employeeName === undefined) return {};
  return employees
    .find((employee) => employee.firstName === employeeName || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
// seu código aqui
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
// seu código aqui
  return employees
    .some((employee) => employee.managers.includes(id));
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
  employees.push(employee);
}

function animalCount(species) {
// seu código aqui
// Referência: nome de usuário GitHub: LucasCAndre (https://github.com/tryber/sd-010-a-project-zoo-functions/pull/39/files)
  if (species === undefined) {
    const obj = {}; // object em que será retornado os elementos caso o parâmetro species esteja vazio
    animals.forEach((element) => { // iteração passando por cada animal(element) no array animals
      obj[element.name] = element.residents.length; // adiciona ao objeto uma chave referente a cada animal encontrado
    }); // às chaves acima, é atribuído value igual à quantidade de residentes
    return obj; // retorna o objeto contendo nome do animal + quantidade de residentes
  }
  return animals.find((animal) => animal.name === species).residents.length; // compara o parâmetro com os resultados do find e retorna apenas a quantidade de elementos em residents
}

function entryCalculator(entrants) {
// seu código aqui
  if (entrants === undefined) return 0;
  const { Adult = 0, Senior = 0, Child = 0 } = entrants;
  const totalAdultPrices = Adult * prices.Adult;
  const totalSeniorPrices = Senior * prices.Senior;
  const totalChildPrices = Child * prices.Child;
  const totalValue = totalAdultPrices + totalSeniorPrices + totalChildPrices;
  return totalValue;
}

// function animalMap(options) {
// seu código aqui
// }

// function schedule(dayName) {
// seu código aqui
// }

// function oldestFromFirstSpecies(id) {
// seu código aqui
// }

// function increasePrices(percentage) {
// seu código aqui
// }

// function employeeCoverage(idOrName) {
// seu código aqui
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
  // increasePrices,
  createEmployee,
};
