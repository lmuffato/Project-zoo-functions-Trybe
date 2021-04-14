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
const { employees } = require('./data');
const { prices } = require('./data');
const { hours } = require('./data');
// const data = require('./data');

function animalsByIds(...ids) {
  return animals.filter((animal) => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  return animals.find((animale) => animale.name === animal)
    .residents.every((residente) => residente.age >= age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return employees.find((item) =>
    item.firstName === employeeName || item.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return {
    ...personalInfo,
    ...associatedWith,
  };
}

function isManager(id) {
  return employees.some((employee) => employee.managers.some((name) => name === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return employees.push(newEmployee);
}

function animalCount(species) { // referência usada em grupo explicada pela Beatriz Barbosa
  // caso não tenha parametro
  const obejtoAnimal = animals.reduce((acc, item) => {
    acc[item.name] = item.residents.length; // adiciono uma chave e um valor ao objeto
    return acc;
  }, {});
  if (!species) {
    return obejtoAnimal;
  }
  // caso  tenha parametro
  const objetoEspecies = animals.find((item) => item.name === species);
  const ArrayEspecies = objetoEspecies.residents.length;
  return ArrayEspecies;
}

/* function animalCount(species) {
  if (!species) {
  const animalObj = animals.reduce((acc, animal) => {
  acc[animal.name] = animal.residents.length; return acc;
  }, {});
  return animalObj;
  }
  return animals.find((animal) => animal.name === species).residents.length;
  }  */

function entryCalculator(entrants) {
  if (entrants === undefined || entrants === {}) {
    return 0;
  }
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  const adultPrice = Adult * prices.Adult;
  const childPrice = Child * prices.Child;
  const seniorPrice = Senior * prices.Senior;
  return parseFloat((adultPrice + childPrice + seniorPrice).toFixed(2));
}

/* function animalMap(options) {
  // seu código aqui
} */

// Exercicio realizado por inspiração da Heloisa Hackenhaar - Obrigada Heloísa pelas aulas S2
function schedule(dayName) {
  const allSchedule = {};
  const daysOfWeek = Object.keys(hours);
  daysOfWeek.forEach((day) => {
    if (day === 'Monday') {
      allSchedule[day] = 'CLOSED';
    } else {
      allSchedule[day] = `Open from ${hours[day].open}am until ${(hours[day].close) - 12}pm`;
    }
  });
  if (!dayName) {
    return allSchedule;
  }
  return { [dayName]: allSchedule[dayName] };
}

function oldestFromFirstSpecies(id) {
  const soughtId = employees.find((employee) => employee.id === id); 
  const speciesId = soughtId.responsibleFor.find((res) => res); 
  const discoverAnimal = animals.find((animal) => animal.id === speciesId); 
  const oldest = discoverAnimal.residents.reduce((firstAnimal, animal) => {
    if (firstAnimal.age > animal.age) return firstAnimal;
    return animal;
  });
  const { name, sex, age } = oldest;
  return [name, sex, age];
}

function increasePrices(percentage) {
  const { Adult, Child, Senior } = prices;
  const porcetagem = (1 + (percentage / 100));
  prices.Adult = Math.round((Adult * porcetagem) * 100) / 100;
  prices.Child = Math.round((Child * porcetagem) * 100) / 100;
  prices.Senior = Math.round((Senior * porcetagem) * 100) / 100;
}

/* function employeeCoverage(idOrName) {
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
  oldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
