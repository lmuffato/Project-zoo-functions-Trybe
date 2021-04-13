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
const { animals, employees, hours, prices } = require('./data');

// Requisito 1
function animalsByIds(...ids) {
  // seu código aqui
  if (!ids) {
    return [];
  }
  const animalsId = data.animals.filter((animal, index) => animal.id === ids[index]);
  return animalsId;
}

// Requisito 2
function animalsOlderThan(name, idade) {
  // seu código aqui
  const especie = data.animals.find((animal) => animal.name === name);
  const idadeMinima = especie.residents.every((resident) => idade <= resident.age);
  return idadeMinima;
}

// Requisito 3
function employeeByName(employeeName) {
  // seu código aqui

  if (!employeeName) {
    return {};
  }
  const findName = data.employees
    .find((employee) => employeeName === employee.firstName || employeeName === employee.lastName);
  return findName;
}
// Requisito 4
function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  const expected = {
    ...personalInfo,
    ...associatedWith,
  };

  return expected;
}

// Requisito 5
function isManager(idColab) {
  // seu código aqui
  const verifyId = data.employees.some((employee) => employee.managers.includes(idColab));
  return verifyId;
}

// Requisito 6
function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  const Employee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };

  data.employees.push(Employee);

  return data.employees;
}

// Requisito 7
function animalCount(species) {
  if (!species) {
    const fullAnimals = data.animals.reduce((acumulador, item) => {
      const key = acumulador;
      key[item.name] = item.residents.length;
      return acumulador;
    }, {});
    return fullAnimals;
  }

  const findAnimal = data.animals.reduce((acc, animal) => {
    let key = acc;
    if (animal.name === species) {
      key = animal.residents.length;
    }
    return key;
  }, {});
  return findAnimal;
}

// Requisito 8
function entryCalculator(entrants) {
  // seu código aqui
  if (!entrants || entrants === {}) return 0;
  const { Adult = 0, Senior = 0, Child = 0 } = entrants;
  const { Adult: Adulto, Senior: Idoso, Child: Crianca } = data.prices;
  const total = ((Adult * Adulto) + (Senior * Idoso) + (Child * Crianca));
  return total;
}

// Requisito 9
// function animalMap(options) {
//   // seu código aqui
// }

// Requisito 10
const getFullDays = () => {
  const dias = Object.keys(hours);

  const days = dias.reduce((acc, dia) => {
    const { open, close } = hours[dia];
    const key = acc;

    if (open !== 0 && close !== 0) {
      key[dia] = `Open from ${open}am until ${close - 12}pm`;
    } else {
      key[dia] = 'CLOSED';
    }
    return acc;
  }, {});

  return days;
};

function schedule(dayName) {
  if (!dayName) {
    return getFullDays();
  }

  const { open, close } = hours[dayName];

  if (dayName === 'Monday') {
    return { [dayName]: 'CLOSED' };
  }

  return { [dayName]: `Open from ${open}am until ${close - 12}pm` };
}

// Requisito 11
function oldestFromFirstSpecies(idEmploy) {
  // seu código aqui
  const getEmployee = employees.find(({ id }) => id === idEmploy);
  const getResponsibleId = getEmployee.responsibleFor[0];
  const getAnimals = animals.find(({ id }) => id === getResponsibleId);

  const { residents } = getAnimals;
  const { name, sex, age } = residents.sort((a, b) => b.age - a.age)[0];
  return [name, sex, age];
}

// Requisito 12
// Requisito feito com ajuda do código do Sérgio Martins
// Link: https://github.com/tryber/sd-010-a-project-zoo-functions/blob/dd64e46b9e1e9f050a862e548dfed64b94af0393/src/zoo.js
function increasePrices(percentage) {
  // seu código aqui
  const { Adult, Senior, Child } = prices;

  const percentual = (price) => (Math.round(price * percentage) + price * 100) / 100;

  const novoIngresso = Object.assign(prices, {
    Adult: percentual(Adult),
    Senior: percentual(Senior),
    Child: percentual(Child),
  });

  return novoIngresso;
}

// Requisito 13
function fullCoverage() {
  const obj = {};

  employees.forEach((employee) => {
    const name = `${employee.firstName} ${employee.lastName}`;
    const getResponsible = employee.responsibleFor.map((specie) => animals
      .find((animal) => animal.id === specie).name);
    obj[name] = getResponsible;
    return obj;
  });

  return obj;
}

function OneCoverage(idOrName) {
  const obj = {};

  const getEmployee = employees
    .find((employee) => employee.firstName === idOrName || employee.lastName === idOrName
    || employee.id === idOrName);

  const getResponsible = getEmployee
    .responsibleFor.map((specie) => animals
      .find((animal) => animal.id === specie).name);

  const nome = `${getEmployee.firstName} ${getEmployee.lastName}`;
  obj[nome] = getResponsible;

  return obj;
}

function employeeCoverage(idOrName) {
  // seu código aqui
  if (!idOrName) return fullCoverage();
  return OneCoverage(idOrName);
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
  oldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
