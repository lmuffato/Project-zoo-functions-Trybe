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
  const animais = data.animals;// ou const { animais } = data;
  return animais.filter((animal) => ids.some((id) => id === animal.id));
}

function animalsOlderThan(animal, age) {
  const { animals } = data;
  return animals.find((animalZoo) => animalZoo.name === animal)
    .residents.every((resident) => resident.age >= age);
}

function employeeByName(employeeName) {
  const { employees } = data;
  if (!employeeName) {
    return {};
  }
  return employees.find((name) =>
    name.firstName === employeeName || name.lastName === employeeName);
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
  const { employees } = data;
  return employees.some(({ managers }) => managers.indexOf(id) !== -1);// se existe em cada index o id
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const { employees } = data;
  employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
  return employees;
}

function animalCount(species) {
  const { animals } = data;
  if (!species) {
    const animaisPopulacao = {};
    animals.forEach(({ name, residents }) => {
      animaisPopulacao[name] = residents.length;// para cada 'name/chave' recebe o valor/quantidade de 'residents/index'
    });
    return animaisPopulacao;
  }
  return animals.find((animal) => animal.name === species).residents.length;
}

function entryCalculator(entrants) {
  const { prices } = data;
  if (!entrants) {
    return 0;
  }
  return Object.keys(entrants)
    .reduce((acc, current) =>
      acc + (entrants[current] * prices[current]), 0);// acc = 0; entrants[current] = quantidadePessoasEntram , prices[current] = presoEntrada
}

/* function animalMap(options) {
  // seu código aqui
} */

function schedule(dayName) {
  const { hours } = data;
  const dias = Object.keys(hours);
  const agendaSemanal = {};
  dias.forEach((dia, index) => {
    const abertura = hours[dia].open;
    const fechamento = hours[dia].close - 12;
    if (index === 6) {
      agendaSemanal[dia] = 'CLOSED';
    } else {
      agendaSemanal[dia] = `Open from ${abertura}am until ${fechamento}pm`
    }
  });
  if (!dayName) return agendaSemanal;
  return { [dayName]: agendaSemanal[dayName] };
}

/* function oldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
  // seu código aqui
}

function employeeCoverage(idOrName) {
  // seu código aqui
} */

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
  // oldestFromFirstSpecies,
  // increasePrices,
  createEmployee,
};
