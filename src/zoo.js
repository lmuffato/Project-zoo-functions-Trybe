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
const { hours } = require('./data');

function animalsByIds(...ids) {
  return data.animals.filter(({ id }) => ids.includes(id));
}
animalsByIds();

// requisito feito com a ajuda de Murilo Gonçalves, Lucas Pedroso e Nilson Ribeiro

function animalsOlderThan(animal, age) {
  const especie = data.animals.find((item) => item.name === animal);
  return especie.residents.every((animalAge) => animalAge.age > age);
}

// requisito feito com lucas Muniz e Rafael Medeiros

function employeeByName(employeeName) {
  if (employeeName === undefined) return {};
  return data.employees.find(({ firstName, lastName }) =>
    firstName === employeeName || lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  const newEmployee = {
    id: personalInfo.id,
    firstName: personalInfo.firstName,
    lastName: personalInfo.lastName,
    managers: associatedWith.managers,
    responsibleFor: associatedWith.responsibleFor,
  };
  return newEmployee;
}

function isManager(id) {
  return data.employees.some(({ managers }) => managers.includes(id));
}

// requisito feito com a ajuda de Thiago Souza e Rafael Medeiros

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const employee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  data.employees.push(employee);
}

function animalCount(species) {
  let animalsAmount = 0;

  if (!species) {
    const animals = {};
    data.animals.forEach((animal) => {
      animals[animal.name] = animal.residents.length;
    });

    return animals;
  }

  data.animals.forEach((animal) => {
    if (animal.name === species) {
      animalsAmount = animal.residents.length;
    }
  });

  return animalsAmount;
}

function entryCalculator(entrants) {
  if (typeof entrants === 'undefined' || entrants === {}) return 0;
  const { Adult = 0, Senior = 0, Child = 0 } = entrants;
  const { Adult: adulto, Senior: idosos, Child: criança } = data.prices;
  return (adulto * Adult) + (idosos * Senior) + (criança * Child);
}

// function animalMap(options) {
//   // seu código aqui
// }

const getScheduleHours = (day) => {
  const opemTime = hours[day].open;
  const closingTime = hours[day].close;
  if (opemTime === 0 && closingTime === 0) return 'CLOSED';
  return `Open from ${opemTime}am until ${closingTime - 12}pm`;
};

function schedule(dayHours) {
  const result = {};
  const days = Object.keys(hours);

  if (dayHours === undefined) {
    days.forEach((day) => { result[day] = getScheduleHours(day); });
  } else {
    result[dayHours] = getScheduleHours(dayHours);
  }
  return result;
}

function oldestFromFirstSpecies(id) {
  const employee = data.employees.find((employeeItem) => employeeItem.id === id);

  const animalSpecie = employee.responsibleFor[0];

  const animals = data.animals.find((animal) => animal.id === animalSpecie);

  const animal = animals.residents.reduce((acc, current) => {
    if (current.age > acc.age) {
      return current;
    }

    return acc;
  });

  const { name, sex, age } = animal;

  return [name, sex, age];
}

// function increasePrices(percentage) {
//   // seu código aqui
// }

// function employeeCoverage(idOrName) {
// seu código aqui
// }

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  //   animalMap,
  animalsByIds,
  employeeByName,
  //  employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  oldestFromFirstSpecies,
  //  increasePrices,
  createEmployee,
};
