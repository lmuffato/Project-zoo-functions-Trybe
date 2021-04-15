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
  if (typeof (ids) === 'undefined') {
    const array = [];
    return array;
  }
  return animals.filter((animal) => ids.includes(animal.id));
}

function animalsOlderThan(animal, agen) {
  // seu código aqui
  return animals.find((anim) => anim.name === animal).residents.every(({ age }) => age > agen);
}

function employeeByName(employeeName) {
  if (!employeeName) return {};
  return data.employees.find((employee) => {
    employee.firstName === employeeName || employee.lastName === employeeName
  });
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return data.employees.find((people) => people.id === id).managers.length <= 1;
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers: managers || [],
    responsibleFor: responsibleFor || [],
  };
  employees.push(newEmployee);
}

function animalCount(species) {
  // seu código aqui
  if (species === undefined) {
    const obj = animals.reduce((ani, animal) => {
      const result = { ...ani };
      result[animal.name] = animal.residents.length;
      return result;
    }, {});
    return obj;
  }
  return animals.find((animal) => animal.name === species).residents.length;
}

function entryCalculator(entrants) {
  // seu código aqui
  if (entrants === undefined) return 0;
  const { Adult, Senior, Child } = data.prices;
  const { Adult: qnt1 = 0 } = entrants;
  const { Senior: qnt2 = 0 } = entrants;
  const { Child: qnt3 = 0 } = entrants;
  return Adult * qnt1 + Senior * qnt2 + Child * qnt3;
}

// function animalMap(options) {
// seu código aqui
// }

function schedule(dayName) {
  const week = {};
  Object.keys(data.hours).forEach((dia) => {
    const close = data.hours[dia].close - 12;
    const { open } = data.hours[dia];
    if (dia === 'Monday') {
      week[dia] = 'CLOSED';
    } else {
      week[dia] = `Open from ${open}am until ${close}pm`;
    }
  });
  if (dayName === undefined) return week;
  return { [dayName]: week[dayName] };
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
  const buscaFuncionario = employees.find((employee) => employee.id === id).responsibleFor[0];
  const buscaAnimal = animals.find((animal) => animal.id === buscaFuncionario).residents;
  const resultado = buscaAnimal.sort((a, b) => b.age - a.age)[0];
  return [resultado.name, resultado.sex, resultado.age];
}

function increasePrices(percentage) {
  // seu código aqui
  const prices = data;
  const percent = (1 + (percentage / 100));
  const keys = Object.keys(prices);
  keys.forEach((key) => {
    prices[key] = (Math.round(prices[key] * percent * 100) / 100);
  });
}

// function employeeCoverage(idOrName) {
// seu código aqui
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
