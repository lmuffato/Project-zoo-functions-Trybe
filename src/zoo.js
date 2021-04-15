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

const data = require('./data');

const { animals, employees } = data;

function animalsByIds(...ids) {
  const animalsArray = animals.filter((animal) => ids.includes(animal.id));
  return animalsArray;
}

function animalsOlderThan(species, age) {
  const animalsAge = animals.find((animal) => animal.name === species);
  return animalsAge.residents.every((animal) => animal.age >= age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  const searchEmployee = employees.find((employee) => employee.firstName === employeeName
    || employee.lastName === employeeName);
  return searchEmployee;
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
  return employees.some((employeeObj) => employeeObj.managers.some((employeeId) =>
    employeeId === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {
  if (species === undefined) {
    const animalObj = {};
    animals.forEach(({ name, residents }) => {
      animalObj[name] = residents.length;
    });
    return animalObj;
  }
  return animals.find((value) => species === value.name).residents.length;
}

console.log(animalCount('lions'));

// Requisito resolvido com a ajuda eterna e maravilhosa do Murilo Gonçalves <3

// return animals.find((animal) => species === animal.name).residents.length;

// Daria pra usar template literals? NÃO, POIS RETORNA STRING E O QUE O REQUISITO SOLICITA É O RETORNO DE UM OBJETO
// `${animalObj[name]}: ${animalObj.residents.length}`;

// Por que aqui só volta array? Como mudar isso? É por causa do map? MAP RETORNA ARRAY
// return animals.map((animalObj) => ({[animalObj.name]: animalObj.residents.length}));

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
