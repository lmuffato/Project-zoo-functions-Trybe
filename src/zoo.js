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
const { animals, employees, prices, hours } = require('./data');
// const data = require('./data');

function animalsByIds(...ids) {
  return animals.filter((animal) => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  const especies = animals.find((item) => item.name === animal);
  return especies.residents.every((itemResidente) => itemResidente.age > age);
}

function employeeByName(employeeName = null) {
  if (employeeName === null) {
    return {};
  }
  return employees.find((i) => i.firstName === employeeName || i.lastName === employeeName);
}
// console.log(employeeByName(''));

function createEmployee(personalInfo, associatedWith) {
  const colaborador = {
    id: personalInfo.id,
    firstName: personalInfo.firstName,
    lastName: personalInfo.lastName,
    managers: associatedWith.managers,
    responsibleFor: associatedWith.responsibleFor,
  };
  return colaborador;
}

function isManager(id) {
  return employees.some(({ managers }) => managers.includes(id));
}
// console.log(isManager('stephanieId'));

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  return employees.push(createEmployee({ id, firstName, lastName }, { managers, responsibleFor }));
}

function animalCount(species = null) {
  if (species === null) {
    const espec = {};
    animals.forEach((element) => {
      espec[element.name] = element.residents.length;
    });
    return espec;
  }
  return animals.find((i) => i.name === species).residents.length;
}
// console.log(animalCount());

function entryCalculator(entrants = {}) {
  if (entrants === {}) {
    return 0;
  }
  return Object.keys(entrants).reduce((Ac, Corren) => Ac + (prices[Corren] * entrants[Corren]), 0);
}

// function animalMap(options) {
//   // seu código aqui
// }

function schedule(dayName = undefined) {
  const diaSemana = {};
  Object.keys(hours).forEach((element) => {
    if (hours[element].open === hours[element].close) {
      diaSemana[element] = 'CLOSED';
    } else {
      diaSemana[element] = `Open from ${hours[element].open}m until ${hours[element].close}pm`;
    }
  });
  if (dayName === undefined) {
    return diaSemana;
  }
  return diaSemana[dayName];
}
console.log(schedule('Monday'));
// function oldestFromFirstSpecies(id) {
// seu código aqui
// }
// function increasePrices(percentage) {
//   // seu código aqui
// }

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
  // oldestFromFirstSpecies,
  // increasePrices,
  createEmployee,
};
