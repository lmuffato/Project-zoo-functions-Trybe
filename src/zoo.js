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
// os requisitos foram feitos colaborativamente com as colegas  , Heloisa , Thalia Cecillier, Débora Passos, Djaniza e Bia Zidioti, Ana Ventura, Marília,

const { animals, prices, hours } = require('./data');
const { employees } = require('./data');
// const data = require('./data');

function animalsByIds(...ids) {
  return animals.filter((animal) => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  return animals.find((animale) => animale.name === animal)
    .residents.every((res) => res.age >= age);
}

function employeeByName(employeeName) {
  if (!employeeName) {
    return {};
  }
  return employees.find((employee) =>
    employee.firstName === employeeName || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers = [], responsibleFor = [] } = associatedWith;
  return {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
}

function isManager(id) {
  return employees.some((employe) => employe.managers
    .some((item) => item === id) === true);
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

function animalCount(species) {
  const quantityOFAnimals = animals.reduce((acc, animales) => {
    acc[animales.name] = animales.residents.length;
    return acc;
  }, {});

  if (!species) {
    return quantityOFAnimals;
  }
  const quantityOfResidents = animals.find((animales) => animales.name === species);
  const arrayOfResidents = quantityOfResidents.residents.length;
  return arrayOfResidents;
}

function entryCalculator(entrants) {
  if (entrants === undefined || entrants === {}) {
    return 0;
  }
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  const adultsPrice = Adult * prices.Adult;
  const childPrice = Child * prices.Child;
  const seniorPrice = Senior * prices.Senior;
  return parseFloat((adultsPrice + seniorPrice + childPrice).toFixed(2));
}

// function animalMap(options) {
// seu código aqui
// }

// a função abaixo foi entendida e feita com explicações do zezé , o colega Carlos sá !!!
function schedule(dayName) {
  const days = Object.keys(hours);
  const schedules = {};
  days.forEach((day, index) => {
    const opening = hours[day].open;
    const closure = hours[day].close - 12;
    if (index === 6) {
      schedules[day] = 'CLOSED';
    } else {
      schedules[day] = `Open from ${opening}am until ${closure}pm`;
    }
  });
  if (dayName === undefined || dayName === {}) {
    return schedules;
  }
  return { [dayName]: schedules[dayName] };
}

function oldestFromFirstSpecies(id) {
  const findEmployee = employees.find((employee) => employee.id === id).responsibleFor[0];
  const firtsAnimal = animals.find((animal) => animal.id === findEmployee);
  const oldAniml = firtsAnimal.residents.reduce((acc, item) => ((acc > item.age) ? acc : item.age));
  const { name, sex, age } = firtsAnimal.residents.find((resident) => resident.age === oldAniml);
  return [name, sex, age];
}

// a função abaixo foi entendida com ajuda do Zezé e a colega Debora Passos;
function increasePrices(percentage) {
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
