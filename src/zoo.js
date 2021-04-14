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

const { animals, employees, hours, prices } = require('./data');
// const data = require('./data');

// found about .includes at https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
// Projeto desenvolvido com ajuda das colegas Nathalia Zebral, Debora Passos, Heloisa Hackenhaar, Djaniza Vasques, Bia Zidioti,
// Maria Luiza, Marilia, Carol Bitencourt, Priscila Scapin, Beatriz Barbosa, Ana Ventura, Pollyana, Wanderson Sales

function animalsByIds(...ids) {
  return animals.filter((animal) => ids.includes(animal.id));
}

function animalsOlderThan(animal, age) {
  return animals.find((elAnimal) => elAnimal.name === animal)
    .residents.every((resident) => (resident.age >= age));
}

function employeeByName(employeeName) {
  if (!employeeName) {
    return {};
  }
  return employees.find((employee) =>
    employee.firstName === employeeName || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.some((employee) => employee.managers.some((name) => name === id));
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
  if (!species) {
    const animalObj = animals.reduce((acc, animal) => {
      acc[animal.name] = animal.residents.length; return acc;
    }, {});
    return animalObj;
  }
  return animals.find((animal) => animal.name === species).residents.length;
}

function entryCalculator(entrants) {
  if (entrants === undefined || entrants === {}) {
    return 0;
  }
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  const adultsPrice = Adult * prices.Adult;
  const childsPrice = Child * prices.Child;
  const seniorsPrice = Senior * prices.Senior;
  return parseFloat((seniorsPrice + adultsPrice + childsPrice).toFixed(2));
}

// function animalMap(options) {
//   // seu código aqui
// }

function schedule(dayName) {
  const weekSchedule = {};
  const weekDays = Object.keys(hours);

  weekDays.forEach((day) => {
    if (day === 'Monday') {
      weekSchedule[day] = 'CLOSED';
    } else {
      weekSchedule[day] = `Open from ${hours[day].open}am until ${(hours[day].close) - 12}pm`;
    }
  });
  if (!dayName) {
    return weekSchedule;
  }
  return {
    [dayName]: weekSchedule[dayName],
  };
}

// function oldestFromFirstSpecies(id) {
//   // seu código aqui
// }

function increasePrices(percentage) {
  const percent = (1 + (percentage / 100));
  const keys = Object.keys(prices);
  keys.forEach((key) => {
    prices[key] = (Math.round(prices[key] * percent * 100) / 100);
  });
}

function employeeCoverage(idOrName) {
  const getEmployee = employees.find((employee) =>
    idOrName === employee.lastName || idOrName === employee.firstName || idOrName === employee.id);
  const getAnimalName = (animalId) => animals.find(({ id }) => id === animalId).name;
  const animalsResponsibleFor = {};
  if (!idOrName) {
    employees.forEach(({ firstName, lastName, responsibleFor }) => {
      animalsResponsibleFor[`${firstName} ${lastName}`] = responsibleFor.map(getAnimalName);
    });
    return animalsResponsibleFor;
  }
  const fullName = `${getEmployee.firstName} ${getEmployee.lastName}`;
  animalsResponsibleFor[fullName] = getEmployee.responsibleFor.map(getAnimalName);
  return animalsResponsibleFor;
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
  // oldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
