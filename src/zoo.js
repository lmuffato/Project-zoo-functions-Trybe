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
  // seu código aqui
  if (ids.length === 0) {
    return [];
  }
  return animals
    .filter((animal) => ids
      .some((id) => animal.id === id));
}

function animalsOlderThan(animalName, age) {
  // seu código aqui
  return animals
    .find((animal) => animal.name === animalName).residents
    .every((animal) => animal.age >= age);
}

function employeeByName(employeeName) {
  // seu código aqui
  if (employeeName === undefined) return {};
  return employees
    .find((employee) => employee.firstName === employeeName || employee.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
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
  // seu código aqui
  return employees
    .some(({ managers }) => managers.indexOf(id) !== -1);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  return employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species = false) {
  // seu código aqui
  const obj = {};
  if (species === false) {
    animals.forEach((animal) => {
      const residentsNumber = animal.residents.length;
      obj[animal.name] = residentsNumber;
    });
  } else {
    return animals.find((animal) => animal.name === species).residents.length;
  }
  return obj;
}

function entryCalculator(entrants) {
  // seu código aqui
  if (entrants === undefined) return 0;
  if (entrants === {}) return 0;
  const { Adult = 0, Senior = 0, Child = 0 } = entrants;
  const resultado = (Adult * prices.Adult) + (Senior * prices.Senior) + (Child * prices.Child);
  return resultado;
}
// console.log(entryCalculator());
// function animalMap(options) {
//   // seu código aqui
// }

function schedule(dayName) {
  // seu código aqui
  const obj = {};
  const daysOfWeek = Object.keys(hours);
  if (dayName === undefined) {
    daysOfWeek.forEach((dayOfWeek) => {
      const { open } = hours[dayOfWeek];
      const { close } = hours[dayOfWeek];
      obj[dayOfWeek] = `Open from ${open}am until ${close - 12}pm`;
      if (dayOfWeek === 'Monday') obj[dayOfWeek] = 'CLOSED';
    });
    return obj;
  }
  const dayX = daysOfWeek
    .find((day) => day === dayName);
  obj[dayX] = `Open from ${hours[dayX].open}am until ${hours[dayX].close - 12}pm`;
  if (dayX === 'Monday') obj[dayX] = 'CLOSED';
  return obj;
}
// console.log(schedule('Friday'));

// function oldestFromFirstSpecies(id) {
//   // seu código aqui
// }

// function increasePrices(percentage) {
//   // seu código aqui
// }

function employeeCoverage(idOrName) {
  // seu código aqui
  const obj = {};
  if (idOrName === undefined) {
    employees.forEach(({ firstName, lastName, responsibleFor }) => {
      const fullName = `${firstName} ${lastName}`;
      const idsAnimals = (responsibleFor.map((x) => animals
        .find((animal) => animal.id === x).name));
      obj[fullName] = idsAnimals;
    });
  } else {
    const ifHaveId = employees.find(({ firstName, lastName, id }) => firstName === idOrName
      || lastName === idOrName || id === idOrName);
    const fullName = `${ifHaveId.firstName} ${ifHaveId.lastName}`;
    const idAnimals = ifHaveId.responsibleFor.map((x) => animals
      .find((animal) => animal.id === x).name);
    obj[fullName] = idAnimals;
  }
  return obj;
}
// console.log(employeeCoverage());
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
  // increasePrices,
  createEmployee,
};
