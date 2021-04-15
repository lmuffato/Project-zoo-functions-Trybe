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

function animalsByIds(...ids) {
  return data.animals.filter(({ id }) => ids.includes(id));
}

function animalsOlderThan(animal, age) {
  const especies = data.animals.find((especie) => especie.name === animal);
  return especies.residents.every((idd) => idd.age > age);
}

// Código implementado com base no código de Nilson Ribeiro
function employeeByName(employeeName) {
  if (!employeeName) return {};
  return data.employees.find(({ firstName, lastName }) => firstName === employeeName
  || lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return newEmployee;
}

function isManager(id) {
  return data.employees.some((employee) => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  data.employees.push(newEmployee);
}

function animalCount(species) {
  if (species === undefined) {
    return data.animals.reduce((acc, curAnimal) => {
      acc[curAnimal.name] = curAnimal.residents.length;
      return acc;
    }, {});
  }
  return data.animals.find(({ name }) => name === species).residents.length;
}

function entryCalculator(entrants) {
  if (typeof entrants === 'undefined' || entrants === {}) return 0;
  const { Adult = 0, Senior = 0, Child = 0 } = entrants;
  const { Adult: numberAdult, Senior: numberSenior, Child: numberChild } = data.prices;
  return (numberAdult * Adult) + (numberSenior * Senior) + (numberChild * Child);
}

// function animalMap(options) {
//   // seu código aqui
// }
// requisito 10 resolvido com ajuda do estudante Adelino Junior
function schedule(dayName) {
  const days = Object.keys(data.hours);
  const date = {};
  days.forEach((day) => {
    const { open, close } = data.hours[day];
    if (open === 0 && close === 0) {
      date[day] = 'CLOSED';
    } else {
      date[day] = `Open from ${open}am until ${close - 12}pm`;
    }
  });
  if (!dayName) return date;
  return { [dayName]: date[dayName] };
}

function oldestFromFirstSpecies(id) {
  const employee = data.employees.find((person) => person.id === id).responsibleFor[0];
  const animalBuscado = data.animals.find((animal) => animal.id === employee);
  const { residents } = animalBuscado;
  const oldAnimal = residents.sort((a, b) => b.age - a.age)[0];
  const { name, sex, age } = oldAnimal;

  return [name, sex, age];
}
function increasePrices(percentage) {
  const increase = (1 + (percentage / 100));
  const ObjKey = Object.keys(data.prices);
  ObjKey.forEach((key) => {
    data.prices[key] = (Math.round(data.prices[key] * increase * 100) / 100);
  });
}

// function employeeCoverage(idOrName) {
//   // seu código aqui
// }

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  // animalMap,
  animalsByIds,
  employeeByName,
  // employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  oldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
